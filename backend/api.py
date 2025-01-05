import os

from flask import Flask, request, send_from_directory
from flask_cors import CORS
from datetime import datetime
from functools import wraps

from .schemas import TransactionCreate, StatsCreate, Wallet
from .db import (
    db_create_transaction,
    db_read_transactions,
    db_get_stats,
    db_update_cash_denomination,
    db_get_cash_denominations,
    db_create_stats
)

# Use dist folder for the frontend (built frontend)
app = Flask(__name__, static_folder=f"../frontend/dist", static_url_path="")
CORS(app)


# Serve React static files
@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def serve_react(path):
    if path != "" and os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)
    # If path doesn't exist, serve index.html
    return send_from_directory(app.static_folder, "index.html")

@app.post("/api/transactions")
def create_transaction():
    newTransaction: dict = request.get_json()

    # Verify required fields
    if not (
            newTransaction.get("num_notes") and 
            newTransaction.get("denomination") and
            newTransaction.get("description") and
            newTransaction.get("direction")
        ):
        return {"error": "Request is missing required fields"}, 400
    
    # Verify field types
    if not (
            isinstance(newTransaction.get("num_notes"), int) and 
            isinstance(newTransaction.get("denomination"), int) and
            isinstance(newTransaction.get("description"), str) and
            isinstance(newTransaction.get("direction"), int)
        ):
        return {"error": "Request contains invalid fields"}, 400

    time = datetime.now()

    # Create transaction
    transaction = TransactionCreate(
        num_notes=newTransaction.get("num_notes"),
        denomination=newTransaction.get("denomination"),
        description=newTransaction.get("description"),
        direction=newTransaction.get("direction"),
        time=time
    )

    db_create_transaction(transaction)

    # Get most recent stats, update details, and add new stats record
    try:
        stats = db_get_stats(limit=1)[0]
    except IndexError:
        stats = (0, 0, 0, 0)

    amount: int = newTransaction.get("denomination") * newTransaction.get("num_notes")
    if newTransaction.get("direction") == 1:        # Income
        new_stats = StatsCreate(
            balance=stats[1] + amount,
            total_spent=stats[2],
            total_collected=stats[3] + amount,
            time=time
        )

    elif newTransaction.get("direction") == 2:      # Expense
        new_stats = StatsCreate(
            balance=stats[1] - amount,
            total_spent=stats[2] + amount,
            total_collected=stats[3],
            time=time
        )

    else:
        return {"error": "Invalid direction"}, 400
    
    # Update cash in wallet
    db_update_cash_denomination(newTransaction.get("denomination"), newTransaction.get("num_notes") * (1 if newTransaction.get("direction") == 1 else -1))

    db_create_stats(new_stats)

    return {"error": None, "message": "Transaction created successfully"}, 201


@app.get("/api/transactions")
def get_transactions():
    end_limit = request.args.get("limit")
    limit = -1

    if end_limit:
        try:
            limit = int(end_limit)
            if limit < 0:
                raise ValueError

        except ValueError:
            return {"error": "Invalid limit value", "message": "Limit must be a positive integer"}, 400
    
    transactions = db_read_transactions(limit)
    
    # Format transactions into JSON
    formatted_transactions = []
    for transaction in transactions:
        formatted_transaction = {
            "id": transaction[0],
            "num_notes": transaction[1],
            "denomination": transaction[2],
            "time": transaction[3],
            "description": transaction[4],
            "direction": transaction[5]
        }
        formatted_transactions.append(formatted_transaction)

    # Return formatted transactions
    if limit == -1:
        return {"error": None, "message": "Success", "data": formatted_transactions}, 200

    return transactions, 200


@app.get("/api/stats")
def get_stats():
    end_limit = request.args.get("limit")
    limit = -1

    if end_limit:
        try:
            limit = int(end_limit)
            if limit < 0:
                raise ValueError

        except ValueError:
            return {"error": "Invalid limit value", "message": "Limit must be a positive integer"}, 400

    stats = db_get_stats(limit=limit)

    # Format stats into JSON
    formatted_stats = []
    for stat in stats:
        formatted_stat = {
            "id": stat[0],
            "balance": stat[1],
            "total_spent": stat[2],
            "total_collected": stat[3],
            "time": stat[4]
        }
        formatted_stats.append(formatted_stat)

    return {"error": None, "message": "Success", "data": formatted_stats}, 200

@app.get("/api/cash")
def get_cash():
    return {"error": None, "message": "Success", "data": db_get_cash_denominations()}, 200

if __name__ == "__main__":
    app.run(debug=True)