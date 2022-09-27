import Users from "./users";

let emailList = Users.map(el => el.email.toLowerCase())
function validateEmail(email){
    return !!email.match(
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
    );
}

function validatePass(pass){
    return !!pass.match(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
    );
}

function createUserObject(name, email, pass, gender, role){
    return {email, pass, name, role, gender};
}


function checkIfEmailExists(email){
    return emailList.includes(email.toLowerCase())
}

export {validateEmail, validatePass, createUserObject, checkIfEmailExists}