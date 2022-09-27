function setLoginStatus(login) {
    console.log(login)
    localStorage.setItem("login", JSON.stringify({ login }));
}

function getLoginStatus() {
    return JSON.parse(localStorage.getItem("login")) || {login: false};
}

function setLoggedUserData(data) {
    localStorage.setItem("loggedUser", JSON.stringify(data));
}

function getLoggedUserData() {
    console.log(JSON.parse(localStorage.getItem("loggedUser") || '[{"role": "none"}]'))
    return JSON.parse(localStorage.getItem("loggedUser") || '[{"role": "none"}]');
}

let obj = {setLoginStatus, getLoggedUserData, setLoggedUserData, getLoginStatus};
export default obj;