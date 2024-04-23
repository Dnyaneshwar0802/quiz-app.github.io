const success = () => {
    window.location.replace("studentloginsuccess.html");
}
const btn = document.getElementById("btn");
let fn = document.getElementById("fname");
let ln = document.getElementById("lname")
let email = document.getElementById("email");
let username = document.getElementById("username");
let password = document.getElementById("password");
let nn = document.querySelector("#neww");
class Student {
    constructor(firstname, lastname, email, username, password, percentage) {
        this.firstname = firstname,
            this.lastname = lastname,
            this.email = email,
            this.username = username,
            this.password = password
    }

}
btn.addEventListener("click", (e) => {
    e.preventDefault();
    let inputFname = fn.value;
    let inputLname = ln.value;
    let inputEmail = email.value;
    let inputUserName = username.value;
    let inputPassword = password.value;
    if (inputFname !== "" && inputLname !== "" && inputEmail !== "" && inputUserName !== "" && inputPassword !== "") {


        let student = new Student(inputFname, inputLname, inputEmail, inputUserName, inputPassword);

        let response = fetch("https://mcq-quiz-app-env.eba-p3jh63gy.eu-north-1.elasticbeanstalk.com/studentRestController/saveData", {
            method: "POST",
            headers: {
                'auth': 'headers',
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(student)
        })
        response.then((response) => {
            let result = response.status;
            if (result === 200) {
                success();
            } else {
                nn.textContent = ` !! Either username OR Email Already Used !! `;
            }
        })
    } else {
        nn.textContent = ` !! EMPTY FIELDS NOT ALLOWED !! `
    }
})
