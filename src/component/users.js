let Users = localStorage.getItem("userlist");

if (Users == null) {
    localStorage.setItem(
        "userlist",
        JSON.stringify([
            {
                email: "manita@noveltytechnology.com",
                pass: "123321123aA#",
                role: "admin",
                name: "Manita Shakya",
                gender: "female",
            },
            {
                email: "user@noveltytechnology.com",
                pass: "Yetanotherpass1#",
                role: "employee",
                name: "John Doe",
                gender: "male",
            },
        ])
    );
    Users = localStorage.getItem("userlist");
}

Users = JSON.parse(Users)

function addUser(userObj){
    Users.push(userObj);
    localStorage.setItem("userlist", JSON.stringify(Users));
}

function deleteUser(email){
    Users = Users.filter(user => user.email.toLowerCase() !== email.toLowerCase())
    localStorage.setItem("userlist", JSON.stringify(Users))
}

export {addUser, deleteUser};
export default Users;
