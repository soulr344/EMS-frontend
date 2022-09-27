import { Bar, Line } from "react-chartjs-2";
// eslint-disable-next-line
import Chart from "chart.js/auto";

function Card(props) {
    return (
        <div
            className={
                " bg-white p-8 rounded-xl ml-0 m-8 shadow " +
                props.className
            }
        >
            {props.children}
        </div>
    );
}

function MainDash() {
    let data = {
        labels: ["Q1", "Q2", "Q3", "Q4"],
        datasets: [
            {
                label: "Financial Report for 2022",
                data: [53, 42, 88, 69],
                backgroundColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(75, 192, 192, 1)",
                ],
            },
        ],
    };

    return (
        <>
            <div className="flex">
                <Card className="w-1/3 flex-1 hover:scale-105 transition-transform">
                    <h1 className="text-2xl font-bold">Summary</h1>
                    <div className="grid grid-cols-2 mt-5">
                        <span className="text-xl font-medium">Projects Completed:</span><span className="text-center">21</span>
                        <span className="text-xl font-medium">Ongoing Projects:</span><span className="text-center">9</span>
                        <span className="text-xl font-medium">Employees on Leave:</span><span className="text-center">2</span>
                        <span className="text-xl font-medium mt-10">Remarks:</span><span className="text-center mt-10">Nice Job!</span>
                    </div>
                </Card>
                <Card className="w-1/3 flex-1 hover:scale-105 transition-transform">
                    <Line data={data}></Line>
                </Card>
            </div>
            <div className="">
                <Card className>
                    <Bar data={data}></Bar>
                </Card>
            </div>
            <div className=" h-full"></div>
        </>
    );
}

export default MainDash;
