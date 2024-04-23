const username = document.getElementById("user");
const password = document.getElementById("pass");
const btn = document.getElementById("login");
const attach = document.getElementById("attach");
let newElement = document.createElement("h3");
class Login {
    constructor(username, password) {
        this.username = username,
            this.password = password
    }
}
btn.addEventListener("click", (e) => {
    e.preventDefault();
    let user = username.value;
    let pass = password.value;
    if (user !== "" && pass !== "") {

        let login = new Login(user, pass);
        let response = fetch(`http://mcq-quiz-app-env.eba-p3jh63gy.eu-north-1.elasticbeanstalk.com/studentRestController/sendData/${user}/${pass}`)
        response.then((response) => {

            return response.json();
        }).then((res) => {
            console.log(res);
            if (res === null) {
                newElement.textContent = "";
                attach.appendChild(newElement);
                newElement.textContent = "!! INVALID USENAME OR PASSWORD !!";
                attach.appendChild(newElement);
                sessionStorage.setItem("userName", user);
                sessionStorage.setItem("password", pass);
            } else {
                newElement.textContent = " ";
                sessionStorage.setItem("username", user);
                sessionStorage.setItem("password", pass);
                attach.appendChild(newElement);
                window.location.replace("afterlogin.html");

            }
        })
    }


})