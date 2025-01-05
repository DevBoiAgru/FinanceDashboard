import sqlite3
from .schemas import TransactionCreate, StatsCreate, Wallet

# Initialise the database
db_conn = sqlite3.connect("app.db")

denominations = [1, 2, 5, 10, 20, 50, 100, 200, 500]

# Create data structre if it don't exist
with db_conn:
    db = db_conn.cursor()
    db.execute("CREATE TABLE IF NOT EXISTS transactions (id INTEGER PRIMARY KEY AUTOINCREMENT, num_notes INTEGER, denomination INTEGER, time DATETIME, description TEXT, direction INTEGER)")
    db.execute("CREATE TABLE IF NOT EXISTS stats (id INTEGER PRIMARY KEY AUTOINCREMENT, balance INTEGER, total_spent INTEGER, total_collected INTEGER, time DATETIME)")
    db.execute("CREATE TABLE IF NOT EXISTS cash_denominations (denomination INTEGER PRIMARY KEY, count INTEGER)")
    
    # Set default cash denominations
    for denomination in denominations:
        db.execute("INSERT OR IGNORE INTO cash_denominations (denomination, count) VALUES (?, ?)", (denomination, 0))

db_conn.commit()


# Transactions
def db_create_transaction(transaction: TransactionCreate) -> None:
    """
    Create a new transaction in the database.

    Args:
        transaction (TransactionCreate): The new transaction to be created.
    """
    db_conn = sqlite3.connect("app.db")
    db = db_conn.cursor()
    db.execute("INSERT INTO transactions (num_notes, denomination, time, description, direction) VALUES (?, ?, ?, ?, ?)", (transaction.num_notes, transaction.denomination, transaction.time, transaction.description, transaction.direction))
    db_conn.commit()
    db_conn.close()

def db_read_transactions(limit: int = -1) -> list:
    """
    Read all transactions from the database.

    Args:
        limit (int, optional): The number of transactions to limit the output to. Defaults to -1.

    Returns:
        list: A list of tuples, each tuple representing a transaction.
    """
    db_conn = sqlite3.connect("app.db")
    db = db_conn.cursor()
    data = []
    if limit == -1:
        data = db.execute("SELECT * FROM transactions ORDER BY id DESC").fetchall()
    else:
        data = db.execute("SELECT * FROM transactions LIMIT ? ORDER BY id DESC", (limit,)).fetchall()
    db_conn.close()
    return data

def db_update_transaction(transaction_id: int, updated_transaction: TransactionCreate) -> None:
    """
    Update an existing transaction in the database.

    Args:
        transaction_id (int): The id of the transaction to be updated.
        updated_transaction (TransactionCreate): The updated transaction.
    """
    db_conn = sqlite3.connect("app.db")
    db = db_conn.cursor()
    db.execute("UPDATE transactions SET num_notes = ?, denomination = ?, description = ?, direction = ? WHERE id = ?", (updated_transaction.num_notes, updated_transaction.denomination, updated_transaction.description, updated_transaction.direction, transaction_id))
    db_conn.commit()
    db_conn.close()

def db_delete_transaction(transaction_id: int) -> None:
    """
    Delete a transaction from the database.

    Args:
        transaction_id (int): The id of the transaction to be deleted.
    """
    db_conn = sqlite3.connect("app.db")
    db = db_conn.cursor()
    db.execute("DELETE FROM transactions WHERE id = ?", (transaction_id,))
    db_conn.commit()
    db_conn.close()

# Stats
def db_get_stats(limit: int = -1) -> list:
    """
    Read all stats from the database.

    Args:
        limit (int, optional): The number of stats to limit the output to. Defaults to -1.

    Returns:
        list: A list of tuples, each tuple representing a stat.
    """
    db_conn = sqlite3.connect("app.db")
    db = db_conn.cursor()
    data = []
    if limit == -1:
        data = db.execute("SELECT * FROM stats").fetchall()
    elif limit == 1:
        # Return last stat
        data = db.execute("SELECT * FROM stats ORDER BY id DESC LIMIT 1").fetchall()
    else:
        data = db.execute("SELECT * FROM stats").fetchmany(limit)
    db_conn.close()
    return data

def db_create_stats(stats: StatsCreate) -> None:
    """
    Create a new stat in the database.

    Args:
        stats (StatsCreate): The new stat to be created.
    """
    db_conn = sqlite3.connect("app.db")
    db = db_conn.cursor()
    db.execute("INSERT INTO stats (balance, total_spent, total_collected, time) VALUES (?, ?, ?, ?)", (stats.balance, stats.total_spent, stats.total_collected, stats.time))
    db_conn.commit()
    db_conn.close()

def db_update_stats(stats: StatsCreate) -> None:
    """
    Update an existing stat in the database.

    Args:
        stats (StatsCreate): The updated stat.
    """
    db_conn = sqlite3.connect("app.db")
    db = db_conn.cursor()
    db.execute("UPDATE stats SET balance = ?, total_spent = ?, total_collected = ?, time = ? WHERE id = 1", (stats.balance, stats.total_spent, stats.total_collected, stats.time))
    db_conn.commit()
    db_conn.close()

# Cash denominations
def db_get_cash_denominations() -> list:
    """
    Read all cash denominations from the database.

    Returns:
        Wallet: An object containing the current cash denominations.
    """
    db_conn = sqlite3.connect("app.db")
    db = db_conn.cursor()
    data = db.execute("SELECT * FROM cash_denominations").fetchall()
    db_conn.close()
    # Convert the data into a Wallet object
    data = Wallet(
        five_hundred=data[8][1],
        two_hundred=data[7][1],
        hundred=data[6][1],
        fifty=data[5][1],
        twenty=data[4][1],
        ten=data[3][1],
        two=data[2][1],
        five=data[1][1],
        one=data[0][1]
    )
    return data.as_dict()

def db_update_cash_denomination(denomination: int, num_notes: int) -> None:
    """
    Increase / decreases the count of a cash denomination in the database.

    Args:
        denomination (int): The denomination to be increased (negative to decrease).
        num_notes (int): The number of notes to add (negative to subtract).
    """
    db_conn = sqlite3.connect("app.db")
    db = db_conn.cursor()
    db.execute("UPDATE cash_denominations SET count = count + ? WHERE denomination = ?", (num_notes, denomination))
    db_conn.commit()
    db_conn.close()
