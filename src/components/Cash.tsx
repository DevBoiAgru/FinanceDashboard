import { useEffect, useState } from "react";
import { BackendData, Cash as CashType } from "../types/backend";

interface CashProps {
    backend_url: string;
}

function Cash(props: CashProps) {
    const [notes, setNotes] = useState({} as CashType);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await fetch(`${props.backend_url}/cash`);
                const data: BackendData = await response.json();
                setNotes(data.data);
            } catch (error) {
                console.error("Failed to fetch stats:", error);
            }
        };

        fetchStats();
    }, []);

    return (
        <>
            <h2 className="mt-1 mb-4 text-align-left fs-1 fw-bold w-100 text-uppercase text-white">
                Cash
            </h2>
            <div className="container mt-5 rounded">
                <table className="table table-dark rounded">
                    <thead>
                        <tr>
                            <th scope="col">Denomination</th>
                            <th scope="col">Frequency</th>
                            <th scope="col">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>500</td>
                            <td>{notes.five_hundred}</td>
                            <td>{notes.five_hundred * 500}</td>
                        </tr>
                        <tr>
                            <td>200</td>
                            <td>{notes.two_hundred}</td>
                            <td>{notes.two_hundred * 200}</td>
                        </tr>
                        <tr>
                            <td>100</td>
                            <td>{notes.hundred}</td>
                            <td>{notes.hundred * 100}</td>
                        </tr>
                        <tr>
                            <td>50</td>
                            <td>{notes.fifty}</td>
                            <td>{notes.fifty * 50}</td>
                        </tr>
                        <tr>
                            <td>20</td>
                            <td>{notes.twenty}</td>
                            <td>{notes.twenty * 20}</td>
                        </tr>
                        <tr>
                            <td>10</td>
                            <td>{notes.ten}</td>
                            <td>{notes.ten * 10}</td>
                        </tr>
                        <tr>
                            <td>5</td>
                            <td>{notes.five}</td>
                            <td>{notes.five * 5}</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>{notes.two}</td>
                            <td>{notes.two * 2}</td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>{notes.one}</td>
                            <td>{notes.one * 1}</td>
                        </tr>
                        <tr>
                            <td className="fw-bold fs-5">Total</td>
                            <td></td>
                            <td className="fw-bold fs-5" colSpan={2}>
                                {notes.five_hundred * 500 +
                                    notes.two_hundred * 200 +
                                    notes.hundred * 100 +
                                    notes.fifty * 50 +
                                    notes.twenty * 20 +
                                    notes.ten * 10 +
                                    notes.five * 5 +
                                    notes.two * 2 +
                                    notes.one * 1}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default Cash;
