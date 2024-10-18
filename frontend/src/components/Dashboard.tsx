import DataPill from "./DataPills";
import LineChart from "./LineChart";
import { useEffect, useState } from "react";
import { Stat, BackendData } from "../types/backend";

interface DashboardProps {
    backend_url: string;
}

function formatDate(timestamp: string): string {
    const date = new Date(timestamp);
    const day = String(date.getDate()).padStart(2, "0"); // Ensure 2-digit format
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    return `${day}/${month}`;
}

function Dashboard(props: DashboardProps) {
    const [stats, setStats] = useState({
        total_collected: 0,
        total_spent: 0,
        balance: 0,
        all_stats: [] as Array<Stat>,
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await fetch(`${props.backend_url}/stats`);
                const data: BackendData = await response.json();
                if (data.data.length === 0) {
                    // No data, do nothing
                    return;
                }
                setStats({
                    total_collected:
                        data.data[data.data.length - 1].total_collected,
                    total_spent: data.data[data.data.length - 1].total_spent,
                    balance: data.data[data.data.length - 1].balance,
                    all_stats: data.data,
                }); // Set the fetched stats in state
            } catch (error) {
                console.error("Failed to fetch stats:", error);
            }
        };

        fetchStats();
    }, []);

    return (
        <>
            <h2 className="mt-1 mb-4 text-align-left fs-1 fw-bold w-100 text-uppercase text-white">
                Dashboard
            </h2>
            <div className="container mt-5">
                <div className="row justify-content-between">
                    <DataPill>
                        <i className="bi bi-arrow-down me-2" /> Total Income: ₹
                        {stats.total_collected}
                    </DataPill>
                    <DataPill>
                        <i className="bi bi-piggy-bank me-2" /> Balance: ₹
                        {stats.balance}
                    </DataPill>
                    <DataPill>
                        <i className="bi bi-arrow-up me-2" /> Total Expense: ₹
                        {stats.total_spent}
                    </DataPill>
                </div>
            </div>

            <div className="container mt-5 bg-dark border rounded p-4">
                <LineChart
                    name="Balance"
                    ylabel="Money"
                    labels={stats.all_stats.map((v) => formatDate(v.time))}
                    data={stats.all_stats.map((v) => v.balance)}
                    options={undefined}
                />
            </div>
        </>
    );
}

export default Dashboard;
