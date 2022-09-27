import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./component/dashboard/dashboard.js";
import Login from "./component/login/login.js";
import loginHandler from "./component/loginHandler";

export default function App() {
    console.log(loginHandler);
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/dashboard/" element={<Dashboard />}></Route>
                <Route path="/dashboard/:page" element={<Dashboard />}></Route>
                <Route path="/" element={<Navigate to="/login" />}></Route>
            </Routes>
        </BrowserRouter>
    );
}
