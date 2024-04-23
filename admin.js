let heading = document.querySelector(".text");
let loginBtn = document.getElementById("login");

let adminUser = document.getElementById("user");
let adminPass = document.getElementById("pass");

let adminLogin = () => {
    username = adminUser.value;
    password = adminPass.value;
    if (username === "" || password === "") {
        heading.innerHTML = "";
        heading.innerHTML = "!! NULL NOT ALLOWED !!";
    } else
    if (username !== "Admin" || password !== "Admin") {
        heading.innerHTML = "";
        heading.innerHTML = "!! INVALID ADMIN !!";
    } else
    if (username === "Admin" && password === "Admin") {
        console.log("You are ADMIN");
        sessionStorage.setItem("username", "Admin");
        sessionStorage.setItem("password", "Admin");
        window.location.replace("afterAdminLogin.html");
    } else {
        heading.innerHTML = "";
        heading.innerHTML = "!! SOMETHING WRONG !!";
    }
}

loginBtn.addEventListener("click", (e) => {
    e.preventDefault();
    adminLogin();
})