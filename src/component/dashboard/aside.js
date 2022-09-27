import { Link, useNavigate } from "react-router-dom";
import loginHandler from "../loginHandler";
import { ReactComponent as Male } from "./icons/male.svg";
import { ReactComponent as Female } from "./icons/female.svg";

export default function Aside(props) {
    let navigate = useNavigate();

    let selectedClass = {
        Home: "text-gray-400 hover:bg-gray-700",
        Users: "text-gray-400 hover:bg-gray-700",
    };
    selectedClass[props.selected] = "text-gray-200 bg-gray-700";

    if (props.userData[0].role === "employee") {
        selectedClass.Users += " cursor-not-allowed";
    }

    console.log(selectedClass);
    function logOut() {
        loginHandler.setLoginStatus(false);
        loginHandler.setLoggedUserData([{ role: "none" }]);

        navigate("/login");
    }

    return (
        <aside className="shadow w-1/5 min-w-[20rem] h-[calc(100vh-4rem)] bg-gray-800 rounded-xl sticky top-8">
            <div className="overflow-y-auto py-4 px-5 rounded">
                {props.userData[0].gender === "false" ? (
                    <Male className=" mx-auto my-8" />
                ) : (
                    <Female className=" mx-auto my-8" />
                )}
                <span className=" w-fit text-white font-bold mx-auto block mb-10 capitalize">
                    {props.userData[0].name}
                </span>
                <ul className="space-y-2">
                    <li>
                        <Link
                            to="/dashboard/"
                            className={
                                "flex items-center p-2 text-base font-normal rounded-lg " +
                                selectedClass.Home
                            }
                        >
                            <svg
                                aria-hidden="true"
                                className="w-6 h-6 text-gray-500 transition duration-75  group-hover:text-gray-100 "
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                                <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
                            </svg>
                            <span className="ml-3">Dashboard</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            to={
                                props.userData[0].role !== "employee"
                                    ? "/dashboard/users"
                                    : ""
                            }
                            className={
                                "flex items-center p-2 text-base font-normal rounded-lg " +
                                selectedClass.Users
                            }
                        >
                            <svg
                                aria-hidden="true"
                                className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75  group-hover:text-gray-900 "
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                    clipRule="evenodd"
                                ></path>
                            </svg>
                            <span className="flex-1 ml-3 whitespace-nowrap">
                                Users
                            </span>
                        </Link>
                    </li>
                    <li className="border-t-2 border-gray-600">
                        <a
                            onClick={logOut}
                            href="#"
                            className="flex items-center p-2 text-base font-normal text-gray-400 rounded-lg hover:bg-gray-700 "
                        >
                            <svg
                                aria-hidden="true"
                                className="rotate-180 flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75  group-hover:text-gray-900 "
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                                    clipRule="evenodd"
                                ></path>
                            </svg>
                            <span className="flex-1 ml-3 whitespace-nowrap">
                                Sign Out
                            </span>
                        </a>
                    </li>
                </ul>
            </div>
        </aside>
    );
}
