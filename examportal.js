// sessionStorage.setItem("username", "db");
// sessionStorage.setItem("password", "123");
// sessionStorage.setItem("id", "1")
let user = sessionStorage.getItem("username");
let pass = sessionStorage.getItem("password");
let id = sessionStorage.getItem("id");
const showinfo = document.getElementById("showinfo");
const headDiv = document.getElementById("headDiv");
const mainDivHolder = document.querySelector(".mainDivHolder");
let details = document.createElement("div");
let form = document.createElement("form");
form.setAttribute("id", "myForm");
details.setAttribute("id", "details");
let correctAnswers = [];
let userInputAnswers = [];
let count = 0;
class UserData {
    constructor(examStatus) {
        this.examStatus = examStatus;
    }
}
let passFailAPI = (id, result) => {
    console.log("INSIDE FETCH");
    console.log(result);
    console.log(id);
    let data = new UserData(result);
    const response1 = fetch(`hhttp://mcq-quiz-app-env.eba-p3jh63gy.eu-north-1.elasticbeanstalk.com/studentRestController/updateData/${id}`, {
        method: "PUT",
        headers: {
            'auth': 'headers',
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    });
}

if (id > 0) {
    let response = fetch(`http://mcq-quiz-app-env.eba-p3jh63gy.eu-north-1.elasticbeanstalk.com/studentRestController/sendData/${user}/${pass}`);
    response.then((response) => {
        return response.json();
    }).then((res) => {
        if (res !== null) {
            headDiv.innerHTML = `Welcome ${res.firstname} ${res.lastname}`;
            mainDivHolder.innerHTML = `<div class="innerDiv"><span>Instruction:-</span>
        <p> 1) All Question mandatory</p>
        <p> 2) 1 Question=1 Mark</p>
        <p> 3) To pass exam need 5 or 5+ Correct Answer </p>
        </div>
        `;
            let response = fetch(`http://mcq-quiz-app-env.eba-p3jh63gy.eu-north-1.elasticbeanstalk.com/examRestController/seeAllQuestions`);
            response.then((response) => {
                return response.json();
            }).then((res) => {
                let len = res.length;
                if (len === 10) {
                    details.innerHTML = "";
                    for (let i = 0; i < 10; i++) {
                        correctAnswers.push(res[i].answer);
                        //<form id="myForm"></form
                        let queDiv = document.createElement("div");
                        queDiv.innerHTML = `<p>Question no:-${res[i].qid}</p>
                        <label for="question${res[i].qid}" id="question${res[i].qid}">${res[i].qid})${res[i].question}</label>
                        <p>Options:-</p>
                        <p>
                        <input class="inptans" required  type="radio" name="question${res[i].qid}" value="1">${res[i].option1}   </input><br>
                        </p>
                        <p>
                        <input class="inptans" type="radio" name="question${res[i].qid}" value="2">${res[i].option2}  </input><br>
                        </p>
                        <p>
                        <input class="inptans" type="radio" name="question${res[i].qid}" value="3">${res[i].option3}   </input><br>
                        </p>
                        <p>
                        <input class="inptans" type="radio" name="question${res[i].qid}" value="4">${res[i].option4}   </input><br>
                        </p>
                        <hr>
                        `;
                        form.append(queDiv);
                    }
                    let btn = document.createElement("button");
                    btn.setAttribute("type", "submit");
                    btn.setAttribute("id", "submitBtn");
                    btn.textContent = "Submit";

                    form.append(btn);
                    details.append(form)
                    showinfo.append(details);
                    btn.addEventListener("click", (e) => {
                        // e.preventDefault();
                        console.log(correctAnswers);
                        for (let i = 1; i < 11; i++) {
                            let x = i - 1;

                            let temp = document.querySelector(`input[name="question${i}"]:checked`);
                            let userAnswer = temp.value;

                            userInputAnswers[x] = parseInt(userAnswer);

                        }
                        if (userInputAnswers.length === 10) {
                            for (let y = 0; y < 10; y++) {
                                if (userInputAnswers[y] == correctAnswers[y]) {
                                    count = count + 1;
                                }
                            }
                        }
                        e.preventDefault();
                        let id = sessionStorage.getItem("id")
                        if (count > 4) {
                            passFailAPI(id, "Pass")
                            details.innerHTML = "";
                            details.innerHTML = `<h2>You PASSED EXAM</h2>
                            <p class="afterExamP">For HOME page</p>
                            <button id="homeBtn">Home Page</button>
                            <br>
                            <p class="afterExamP">For LOGIN page</p>
                            <button id="loginBtn">SIGN IN</button>
                            `;
                            showinfo.append(details);
                            showinfo.append(details);
                            let homeBtn = document.getElementById("homeBtn");
                            let loginBtn = document.getElementById("loginBtn");
                            console.log(homeBtn);
                            console.log(loginBtn);
                            homeBtn.addEventListener("click", () => {
                                sessionStorage.clear();
                                window.location.replace("index.html");
                            })
                            loginBtn.addEventListener("click", () => {
                                sessionStorage.clear();
                                window.location.replace("signin.html");
                            })
                        } else {
                            passFailAPI(id, "Fail")
                            details.innerHTML = "";
                            details.innerHTML = `<h2 >Your Score is NOT ENOUGH to Qualify EXAM </h2>
                            <p class="afterExamP">For HOME page</p>
                            <button id="homeBtn">Home Page</button>
                            <br>
                            <p class="afterExamP" >For LOGIN page</p>
                            <button id="loginBtn">Home Page</button>
                            `;
                            showinfo.append(details);
                            let homeBtn = document.getElementById("homeBtn");
                            let loginBtn = document.getElementById("loginBtn");
                            console.log(homeBtn);
                            console.log(loginBtn);
                            homeBtn.addEventListener("click", () => {
                                sessionStorage.clear();
                                window.location.replace("index.html");
                            })
                            loginBtn.addEventListener("click", () => {
                                sessionStorage.clear();
                                window.location.replace("signin.html");
                            })
                        }
                        console.log(userInputAnswers);
                        console.log(count);

                    })

                } else {
                    details.innerHTML = "";
                    details.innerHTML = `<h2>NOT ENOUGH QUESTION CONTACT ADMIN</h2>`;
                    showinfo.append(details);
                }
            })
        }
    })
}