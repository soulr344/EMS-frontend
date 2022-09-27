import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import loginHandler from "../loginHandler";
import Aside from "./aside";
import MainDash from "./maindash";
import UserDisplay from "./users";

function Dashboard() {
    let loggedUserData = loginHandler.getLoggedUserData();

    console.log(loggedUserData)
    let navigate = useNavigate();
    useEffect(() => {
        if (!loginHandler.getLoginStatus().login || loggedUserData === {}) {
            navigate("/login");
        }
        if (page === "Users" && loggedUserData[0].role === "employee"){
            navigate("/dashboard")
        }
        // eslint-disable-next-line
    }, []);

    const params = useParams();
    let page = params["page"] || "Home";
    page = page.charAt(0).toUpperCase() + page.slice(1)

    if (["Users", "Home"].indexOf(page) === -1){
        page = "404 - Not Found"
    }

    document.title = "Dashboard - " + page;

    return (
        <div className=" max-w-[1600px] mx-auto h-full px-4 py-8 flex">
            <Aside userData={loggedUserData} selected={page}/>
            <main className="p-8 h-full w-full ml-4">
                <h1 className="text-3xl font-semibold text-white capitalize">{loggedUserData[0].role} Dashboard - {page}</h1>
                {
                    (page === "Users") ?
                    <UserDisplay /> :
                    <MainDash/>
                }
            </main>
        </div>
    );
}

export default Dashboard;
