import { ListGroup } from "react-bootstrap";
import LogoSVG from "./Logo";

interface SidebarProps {
    page: string;
    updatePage: (page: string) => void;
}

function Sidebar(props: SidebarProps) {
    return (
        <div
            className="bg-dark text-white p-3 vh-100 position-fixed"
            style={{ width: "280px" }}
        >
            <div className="d-flex justify-content-center mb-4 mt-3">
                <LogoSVG />
            </div>
            <ListGroup variant="flush">
                <ListGroup.Item
                    className={
                        props.page === "Dashboard"
                            ? "mt-2 ease-0-1 bg-dark text-white active fs-6 fw-bold"
                            : "mt-2 ease-0-1 bg-dark text-white"
                    }
                    onClick={() => props.updatePage("Dashboard")}
                >
                    <i className="bi bi-speedometer2 me-2" /> Dashboard
                </ListGroup.Item>
                <ListGroup.Item
                    className={
                        props.page === "Transactions"
                            ? "mt-2 ease-0-1 bg-dark text-white active fs-6 fw-bold"
                            : "mt-2 ease-0-1 bg-dark text-white"
                    }
                    onClick={() => props.updatePage("Transactions")}
                >
                    <i className="bi bi-currency-rupee me-2" /> Transactions
                </ListGroup.Item>
                <ListGroup.Item
                    className={
                        props.page === "Cash"
                            ? "mt-2 ease-0-1 bg-dark text-white active fs-6 fw-bold"
                            : "mt-2 ease-0-1 bg-dark text-white"
                    }
                    onClick={() => props.updatePage("Cash")}
                >
                    <i className="bi bi-cash me-2" /> Cash
                </ListGroup.Item>
            </ListGroup>
        </div>
    );
}

export default Sidebar;
