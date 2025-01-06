import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import Cash from "./components/Cash";
import Transactions from "./components/Transactions";
import { useState } from "react";
import { BACKEND_URL } from "./config";

function App() {
    var [currentPage, setCurrentPage] = useState("Dashboard");

    return (
        <>
            <Sidebar
                page={currentPage}
                updatePage={setCurrentPage}
                backend_url={BACKEND_URL}
            />
            <main
                className="container-fluid p-5"
                style={{ marginLeft: "280px" }}
            >
                {currentPage === "Dashboard" && (
                    <Dashboard backend_url={BACKEND_URL} />
                )}
                {currentPage === "Transactions" && (
                    <Transactions backend_url={BACKEND_URL} />
                )}
                {currentPage === "Cash" && <Cash backend_url={BACKEND_URL} />}
            </main>
        </>
    );
}

export default App;
