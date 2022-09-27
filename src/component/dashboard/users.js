import React, { useRef, useState } from "react";
import {
    checkIfEmailExists,
    createUserObject,
    validateEmail,
    validatePass,
} from "../auxFunctions";
import Users, { addUser, deleteUser } from "../users";
import Modal from "./modal";

export default function UserDisplay() {
    function alphaSort(usersArr, dsc = false) {
        let arr = usersArr.sort(function (a, b) {
            return a.name.localeCompare(b.name);
        });
        if (dsc) return arr.reverse();
        return arr;
    }

    function rolesSort(usersArr, emp = false) {
        if (!emp)
            return usersArr
                .filter((user) => user.role === "admin")
                .concat(usersArr.filter((user) => user.role !== "admin"));
        return usersArr
            .filter((user) => user.role !== "admin")
            .concat(usersArr.filter((user) => user.role === "admin"));
    }

    function genderSort(usersArr, fem = false) {
        if (!fem)
            return usersArr
                .filter((user) => user.gender === "male")
                .concat(usersArr.filter((user) => user.gender !== "male"));
        return usersArr
            .filter((user) => user.gender !== "male")
            .concat(usersArr.filter((user) => user.gender === "male"));
    }

    let [users, setUsers] = useState(alphaSort(Users));
    let modalRef = React.createRef();

    function sortUsers(e) {
        let val = e.target.value;

        switch (val) {
            case "name-asc":
                users = alphaSort(users);
                break;
            case "name-dsc":
                users = alphaSort(users, true);
                break;
            case "roles-adm":
                users = rolesSort(users);
                break;
            case "roles-emp":
                users = rolesSort(users, true);
                break;
            case "gender-mal":
                users = genderSort(users);
                break;
            case "gender-fem":
                users = genderSort(users, true);
                break;
            default:
                break;
        }

        setUsers([...users]);
    }

    function filterTable(e) {
        // didnt feel like debouncing is required
        let val = e.target.value.toLowerCase();

        setUsers([
            ...Users.filter((user) =>
                JSON.stringify(user).toLowerCase().includes(val)
            ),
        ]);
    }

    // Modal refs
    let emailRef = useRef();
    let hiddenEmailRef = useRef();
    let passRef = useRef();
    let nameRef = useRef();
    let genderRef = useRef();
    let roleRef = useRef();

    let [errorMsg, setErrMsg] = useState(["", ""]);
    let [disabled, setDisabled] = useState(true);

    let [modalTitle, setModalTitle] = useState("Add");

    function evalDisabled() {
        setTimeout(() => {
            setDisabled(
                !validateEmail(emailRef.current.value) ||
                    !validatePass(passRef.current.value) ||
                    nameRef.current.value.length < 5
            );
        }, 100);
    }

    return (
        <div>
            <div
                id="filer-settings"
                className="flex justify-between items-baseline"
            >
                <div>
                    <input
                        onInput={filterTable}
                        placeholder="Filter"
                        className="px-4 py-2 rounded mr-8"
                    />
                    <label htmlFor="sort" className="text-lg text-white mr-4">
                        Sort:
                    </label>
                    <select
                        id="sort"
                        className="rounded-lg bg-white px-4 py-2 mt-8"
                        defaultValue={"name-asc"}
                        onChange={sortUsers}
                    >
                        <option value="name-asc">Name Ascending</option>
                        <option value="name-dsc">Name Descending</option>
                        <option value="roles-adm">Roles (Admin)</option>
                        <option value="roles-emp">Roles (Employee)</option>
                        <option value="gender-mal">Gender (Male)</option>
                        <option value="gender-fem">Gender (Female)</option>
                    </select>
                </div>
                <button
                    className="text-sm h-min bg-blue-600 px-4 py-2 rounded text-white"
                    data-modal-toggle="defaultModal"
                    onClick={() => {
                        setModalTitle("Add");
                        modalRef.current.classList.toggle("hidden");
                        emailRef.current.value = "";
                        passRef.current.value = "";
                        nameRef.current.value = "";
                        hiddenEmailRef.current.value = "";
                    }}
                >
                    Add User
                </button>
            </div>
            <table className="w-full max-h-full overflow-auto mt-9 text-xl text-black rounded-lg">
                <thead>
                    <tr className=" text-center font-semibold">
                        <td>ID</td>
                        <td>Name</td>
                        <td>Role</td>
                        <td>Email</td>
                        <td>Gender</td>
                        <td>Actions</td>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => {
                        return (
                            <tr
                                key={index}
                                className={index % 2 === 0 ? "bg-gray-300" : ""}
                            >
                                <td>{index + 1}</td>
                                <td className="capitalize">{user.name}</td>
                                <td className="capitalize">{user.role}</td>
                                <td>{user.email}</td>
                                <td className="capitalize">{user.gender}</td>
                                <td>
                                    <input
                                        type="button"
                                        value="Edit"
                                        className={`text-sm h-min bg-amber-500 hover:bg-amber-600 transition-colors px-4 py-2 rounded text-white`}
                                        onClick={(e) => {
                                            setModalTitle("Edit");
                                            modalRef.current.classList.toggle(
                                                "hidden"
                                            );

                                            emailRef.current.value = user.email;
                                            passRef.current.value = user.pass;
                                            nameRef.current.value = user.name;
                                            genderRef.current.value =
                                                user.gender;
                                            roleRef.current.value = user.role;
                                            hiddenEmailRef.current.value =
                                                user.email;
                                        }}
                                    />
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <Modal forwadedRef={modalRef}>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();

                        let userObj = createUserObject(
                            nameRef.current.value,
                            emailRef.current.value,
                            passRef.current.value,
                            genderRef.current.value,
                            roleRef.current.value
                        );

                        if (
                            checkIfEmailExists(emailRef.current.value) &&
                            modalTitle === "Add"
                        ) {
                            setErrMsg([
                                "Another user with same email exists!",
                                errorMsg[1],
                            ]);
                            return;
                        } else if (
                            modalTitle === "Edit" &&
                            checkIfEmailExists(hiddenEmailRef.current.value)
                        ) {
                            deleteUser(hiddenEmailRef.current.value);
                        }
                        addUser(userObj);
                        window.location.reload(true);
                    }}
                >
                    <h1 className="text-2xl font-bold mb-4">
                        {modalTitle} User
                    </h1>
                    <div className="grid grid-cols-[100px_1fr] justify-between items-center pb-4">
                        <label htmlFor="name">Full Name:</label>
                        <input
                            id="name"
                            ref={nameRef}
                            className="block w-full mt-2 px-4 py-2 rounded-lg border border-gray-600"
                            placeholder="Full Name"
                            onInput={() => {
                                evalDisabled();
                            }}
                        />
                        <label htmlFor="email">Email:</label>
                        <input type="hidden" ref={hiddenEmailRef} />
                        <span>
                            <input
                                id="email"
                                ref={emailRef}
                                className="block w-full mt-2 px-4 py-2 rounded-lg border border-gray-600"
                                placeholder="Email"
                                onInput={(e) => {
                                    if (!validateEmail(e.target.value)) {
                                        setErrMsg([
                                            "Please Enter a valid Email.",
                                            errorMsg[1],
                                        ]);
                                    } else {
                                        setErrMsg(["", errorMsg[1]]);
                                    }

                                    evalDisabled();
                                }}
                            />
                            <span className="text-red-500 text-xs italic">
                                {errorMsg[0]}
                            </span>
                        </span>
                        <label htmlFor="pass">Password:</label>
                        <span>
                            <input
                                id="pass"
                                ref={passRef}
                                className="block w-full mt-2 px-4 py-2 rounded-lg border border-gray-600"
                                placeholder="Password"
                                type="password"
                                onInput={(e) => {
                                    if (!validatePass(e.target.value)) {
                                        setErrMsg([
                                            errorMsg[0],
                                            "Password Must include at least 1 uppercase, 1 lowercase, 1 number and a symbol!",
                                        ]);
                                    } else {
                                        setErrMsg([errorMsg[0], ""]);
                                    }
                                    evalDisabled();
                                }}
                            />
                            <span className="text-red-500 text-xs italic">
                                {errorMsg[1]}
                            </span>
                        </span>
                        <label htmlFor="gender">Gender:</label>
                        <select
                            ref={genderRef}
                            id="gender"
                            className="block w-full mt-2 px-4 py-2 rounded-lg border border-gray-600 bg-white"
                            defaultValue={"male"}
                            onChange={evalDisabled}
                        >
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                        <label htmlFor="role">Role:</label>
                        <select
                            ref={roleRef}
                            id="role"
                            className="block w-full mt-2 px-4 py-2 rounded-lg border border-gray-600 bg-white"
                            defaultValue={"employee"}
                            onChange={evalDisabled}
                        >
                            <option value="admin">Admin</option>
                            <option value="employee">Employee</option>
                        </select>
                    </div>
                    <div className="hidden bg-blue-500 bg-slate-500"></div>
                    {modalTitle === "Edit" && (
                        <input
                            type="button"
                            value="Delete User"
                            className={`float-left mt-4 text-sm h-min bg-red-600 px-4 py-2 rounded text-white`}
                            onClick={() => {
                                deleteUser(hiddenEmailRef.current.value);
                                window.location.reload(true);
                            }}
                        />
                    )}
                    <input
                        type="submit"
                        value={modalTitle + " User"}
                        disabled={disabled}
                        className={`float-right mt-4 text-sm h-min bg-${
                            disabled
                                ? "slate-500 cursor-not-allowed"
                                : "blue-500"
                        } px-4 py-2 rounded text-white`}
                    />
                </form>
            </Modal>
        </div>
    );
}
