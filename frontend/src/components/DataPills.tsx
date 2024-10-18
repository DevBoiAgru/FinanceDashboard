interface DataPillProps {
    children: React.ReactNode;
}

function DataPill(props: DataPillProps) {
    return (
        <div
            className="col-3 bg-dark w-25 text-center d-flex align-items-center justify-content-center border rounded-pill fs-5"
            style={{ height: 75 }}
        >
            {props.children}
        </div>
    );
}
export default DataPill;
