import { useEffect, useState } from "react";
import { BackendData, Transaction } from "../types/backend";
import TransactionForm from "./TransactionForm";
import { CURRENCY_SYMBOL } from "../config";

interface TransactionsProps {
    backend_url: string;
}

async function sendTransaction(transaction: Transaction, backend_url: string) {
    try {
        const response = await fetch(`${backend_url}/transactions`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(transaction),
        });

        if (response.ok) {
            window.location.reload();
        } else {
            console.error("Failed to add transaction");
        }
    } catch (error) {
        console.error("Error:", error);
    }
}

function Transactions(props: TransactionsProps) {
    const [transactions, setTransactions] = useState<BackendData>({
        error: "",
        message: "",
        data: [] as Transaction[],
    });

    // Fetch transactions from backend
    useEffect(() => {
        async function fetchTransactions() {
            try {
                const response = await fetch(
                    `${props.backend_url}/transactions`
                );
                const data: BackendData = await response.json();
                setTransactions(data);
            } catch (error) {
                console.error("Error fetching transactions:", error);
            }
        }

        fetchTransactions();
    }, []);

    return (
        <>
            <h2 className="mt-1 mb-4 text-align-left fs-1 fw-bold w-100 text-uppercase text-white">
                Transactions
            </h2>

            <div className="container mt-4 rounded">
                <TransactionForm
                    onSubmit={sendTransaction}
                    backend_url={props.backend_url}
                />

                <table className="table table-striped table-bordered mt-4">
                    <thead className="thead-dark">
                        <tr>
                            <th>ID</th>
                            <th>Description</th>
                            <th>Amount</th>
                            <th>Transaction Type</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.data.map((transaction: Transaction) => (
                            <tr key={transaction.id}>
                                <td>{transaction.id}</td>
                                <td>{transaction.description}</td>
                                <td>
                                    {CURRENCY_SYMBOL}
                                    {transaction.denomination *
                                        transaction.num_notes}
                                </td>
                                <td>
                                    {transaction.direction === 1
                                        ? "🟢 Incoming"
                                        : "🔴 Outgoing"}
                                </td>
                                <td>{transaction.time}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default Transactions;
