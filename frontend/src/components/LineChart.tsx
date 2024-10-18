import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

interface LineChartProps {
    name: string;
    labels: string[];
    ylabel: string;
    data: number[];
    options: any;
}

const LineChart = (props: LineChartProps) => {
    const data = {
        labels: props.labels,
        datasets: [
            {
                label: props.ylabel,
                data: props.data,
                fill: false,
                borderColor: "rgb(192, 192, 192)",
                tension: 0.1, // Controls curve smoothness (0 = straight lines, 1 = very curvy)
            },
        ],
    };

    const options = {
        // responsive: true,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: true,
                text: props.name,
            },
        },
    };

    return <Line data={data} options={options} height={150} width={500} />;
};

export default LineChart;
