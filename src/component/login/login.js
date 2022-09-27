import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Users from "../users";
import loginHandler from "../loginHandler";
import { validateEmail, validatePass } from "../auxFunctions";

function Login({ changeLoginState, setLoggedUserData, ...props }) {
    let navigate = useNavigate();
    useEffect(() => {
        if (loginHandler.getLoginStatus().login) {
            navigate("/dashboard");
        }
        document.title = "Login";
        // eslint-disable-next-line
    }, []);
    let [errorMsgs, setErrorMsgs] = useState([
        "Invalid Email",
        "Password Must include at least 1 uppercase, 1 lowercase, 1 number and a symbol!",
    ]);
    let emailRef = useRef();
    let passRef = useRef();
    let emailErr = useRef();
    let passErr = useRef();

    const handleLogin = (e) => {
        e.preventDefault();

        // validation
        let email = emailRef.current.value;
        let pass = passRef.current.value;

        let emailMatch = validateEmail(email);
        let passMatch = validatePass(pass);

        emailErr.current.classList.toggle("hidden", emailMatch);
        passErr.current.classList.toggle("hidden", passMatch);

        console.log(emailMatch, passMatch)

        if (!(passMatch && emailMatch)) return;

        let selectedUser = Users.filter((user) => user.email === email);
        if (selectedUser.length === 0) {
            setErrorMsgs(["No user with given email found!", errorMsgs[1]]);
            emailErr.current.classList.remove("hidden");
            return;
        }

        if (selectedUser[0].pass === pass) {
            loginHandler.setLoginStatus(true);
            loginHandler.setLoggedUserData(selectedUser);
            navigate("/dashboard");
        } else {
            console.log("JEEZ")
            setErrorMsgs([errorMsgs[0], "Invalid Password"]);
            passErr.current.classList.toggle("hidden", false);
            console.log(errorMsgs)
        }
    };

    return (
        <div className="w-full h-[100vh] grid place-items-center bg-gray-900">
            <form
                name="login"
                onSubmit={handleLogin}
                className="bg-white w-4/12 max-w-[28rem] rounded-md px-8 pt-6 pb-8 ml-auto mr-auto shadow"
            >
                <h1 className="block font-bold pb-4 text-3xl">Login</h1>
                <div className="mb-4">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="username"
                    >
                        Email
                    </label>
                    <input
                        className="shadow appearance-none focus:border-blue-600 border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="username"
                        type="text"
                        placeholder="Email"
                        ref={emailRef}
                    />
                    <span
                        ref={emailErr}
                        className="text-red-500 text-xs italic hidden"
                    >
                        {errorMsgs[0]}
                    </span>
                </div>
                <div className="mb-4">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="password"
                    >
                        Password
                    </label>
                    <input
                        className="shadow appearance-none focus:border-blue-600 border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="password"
                        type="password"
                        placeholder="Password"
                        ref={passRef}
                    />

                    <span
                        ref={passErr}
                        className="text-red-500 text-xs italic hidden"
                    >
                        {errorMsgs[1]}
                    </span>
                </div>
                <div className="mb-4">
                    <input
                        className=" bg-blue-600 pt-2 pb-2 pr-4 pl-4 text-white hover:bg-blue-800 rounded-sm cursor-pointer w-full"
                        id="submit"
                        type="submit"
                    />
                </div>
                <div className="">
                    <Link
                        to="/forgot"
                        className=" w-fit ml-auto mr-auto text-blue-700 text-center block"
                    >
                        Forgot Password?
                    </Link>
                </div>
            </form>
        </div>
    );
}

export default Login;
