import React, { useState } from "react";
import { Transaction } from "../types/backend";

interface TransactionFormProps {
    onSubmit: (transaction: Transaction, backend_url: string) => void;
    backend_url: string;
}

function TransactionForm(props: TransactionFormProps) {
    const [formData, setFormData] = useState({
        num_notes: "0",
        description: "",
        direction: "1",
        denomination: 100,
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === "denomination" ? parseInt(value) : value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Construct the transaction object to send as JSON
        const transaction: Transaction = {
            ...formData,
            num_notes: parseInt(formData.num_notes),
            direction: parseInt(formData.direction),
        };

        props.onSubmit(transaction, props.backend_url); // Call the parent onSubmit function

        setFormData({
            num_notes: "0",
            description: "",
            direction: "1",
            denomination: 100,
        });
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="container mt-5 p-4 border rounded bg-dark"
        >
            <h3 className="mb-4">Add New Transaction</h3>

            <div className="mb-3 d-flex gap-3 align-items-center">
                <label htmlFor="num_notes" className="form-label">
                    No. of notes
                </label>
                <input
                    type="number"
                    className="form-control"
                    id="num_notes"
                    name="num_notes"
                    value={formData.num_notes}
                    onChange={handleChange}
                    placeholder="Enter amount"
                    required
                />
            </div>

            <div className="mb-3 d-flex gap-1">
                <input
                    type="text"
                    className="form-control"
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Enter description"
                    autoComplete="off"
                    required
                />
                <select
                    id="direction"
                    name="direction"
                    className="form-select w-25"
                    value={formData.direction}
                    onChange={handleChange}
                >
                    <option value="1">Income</option>
                    <option value="2">Expense</option>
                </select>
            </div>

            <div className="mb-3 d-flex gap-2 align-items-center">
                <label htmlFor="denomination" className="form-label">
                    Denomination
                </label>
                <select
                    id="denomination"
                    name="denomination"
                    className="form-select"
                    value={formData.denomination}
                    onChange={handleChange}
                >
                    <option value={500}>500</option>
                    <option value={200}>200</option>
                    <option value={100}>100</option>
                    <option value={50}>50</option>
                    <option value={20}>20</option>
                    <option value={10}>10</option>
                    <option value={5}>5</option>
                    <option value={2}>2</option>
                    <option value={1}>1</option>
                </select>
            </div>

            <button type="submit" className="btn btn-primary w-100">
                Add Transaction
            </button>
        </form>
    );
}

export default TransactionForm;
