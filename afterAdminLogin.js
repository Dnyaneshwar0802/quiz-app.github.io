//STEP -1 done all good
//59 62 65 function comment out
//VARIABLES NEEDED START
//console.log(sessionStorage);
//sessionStorage.setItem("username", "Admin");
//sessionStorage.setItem("password", "Admin");
let user = sessionStorage.getItem("username");
let pass = sessionStorage.getItem("password");
let crudDiv = document.getElementById("crud");
const showinfo = document.getElementById("showinfo");
const headDiv = document.getElementById("headDiv");
const mainDivHolder = document.querySelector(".mainDivHolder");
let details = document.createElement("div");
details.setAttribute("id", "details");
const warning = document.createElement("span");
warning.setAttribute("id", "warn");

class QuestionAnswer {
    constructor(question, option1, option2, option3, option4, answer) {
        this.question = question;
        this.option1 = option1;
        this.option2 = option2;
        this.option3 = option3;
        this.option4 = option4;
        this.answer = answer;
    }
}

//console.log(user);
//console.log(pass);
//VARIABLES NEEDED END
//STEP-4
//SHOWING ALL QUESTION-START
function viewAllQuestion() {
    details.innerHTML = "";
    details.innerHTML = `<p> ALL QUESTIONS :- </p>`
    let response = fetch("hhttp://mcq-quiz-app-env.eba-p3jh63gy.eu-north-1.elasticbeanstalk.com/examRestController/seeAllQuestions");
    response.then((res) => {
        console.log(res.status); //200
        return res.json();
    }).then((response) => {
        console.log(response.length);
        if (response.length === 0) {
            let queStore = document.createElement("div");
            queStore.setAttribute("class", "allQue")
            queStore.innerHTML = "";
            queStore.innerHTML = `<p> !! NO QUESTION FOUND ADD QUESTIONS !!</p>`;
            details.append(queStore);
        } else {
            response.forEach(element => {
                let queStore = document.createElement("div");
                queStore.setAttribute("class", "allQue")
                queStore.innerHTML = "";
                queStore.innerHTML = `
            <hr>
            <span>Question id=${element.qid}</span>
            <br>
            <span>Question =${element.question}</span>
            <br>
            <span>Option-1 =${element.option1}</span>
            <br>
            <span>Option-2 =${element.option2}</span>
            <br>
            <span>Option-3 =${element.option3}</span>
            <br>
            <span>Option-4 =${element.option4}</span>
            <br>
            <span>Answer =${element.answer}</span>
            <br>
            <hr>
            `;
                details.append(queStore);

            });
        }
    })
    showinfo.append(details);
}
//SHOWING ALL QUESTION -END
//STEP-6
//ViEW ALL STUDENTS-start
//LAST STEP-
//UPDATE DELETE QUESTION-start
function deleteQuestion(id) {
    let response = fetch(`http://mcq-quiz-app-env.eba-p3jh63gy.eu-north-1.elasticbeanstalk.com/examRestController/deleteQuestion/${id}`, {
        method: "DELETE",
        headers: {
            'auth': 'headers',
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });
}


function updateDeleteQuestions() {
    details.innerHTML = "";
    details.innerHTML = `<p>  ENTER Q.no To DELETE QUESTION </p>
    <input class="inpt"type="number" id="deleteInput" required/>
    <br>
    <button class="allBtn"id="deleteBtn" >DELETE</button>
    <p>  ENTER Q.no To UPDATE QUESTION </p>
    <input class="inpt"type="number" id="updateInput" required/>
    <br>
    <button class="allBtn"id="updateBtn" >UPDATE</button>
    `;
    showinfo.append(details);


    let deleteBtn = document.getElementById("deleteBtn");
    let updateBtn = document.getElementById("updateBtn");
    deleteBtn.addEventListener("click", () => {
        let deleteQid = document.getElementById("deleteInput").value;
        deleteQuestion(deleteQid);
        details.innerHTML = "";
        details.innerHTML = `<p> !! QUESTION DELETED SUCCESSFULLY !!</p>`;
        showinfo.append(details);
    })
    updateBtn.addEventListener("click", () => {
        let updateQid = document.getElementById("updateInput").value;
        if (updateQid === "") {
            updateQid = 0;
        }
        let response = fetch(`http://mcq-quiz-app-env.eba-p3jh63gy.eu-north-1.elasticbeanstalk.com/examRestController/getSingleQue/${updateQid}`);
        response.then((response) => {
            return response.json();

        }).then((res) => {
            if (res != null) {
                details.innerHTML = "";
                details.innerHTML = `<p id="updateWarn">EDIT QUESTION</p>
                <hr>
                <h3>Question id=${res.qid}</h3>
                <br>
                <span>Question=</span>
                <textarea id="inptQue" rows="2" cols="80"  id="que">${res.question}</textarea>
                <br>
                <span>Option-1=</span>
                <textarea id="inptOP1" rows="2" cols="80"  id="que">${res.option1}</textarea>
                <br>
                <span>Option-2=</span>
                <textarea id="inptOP2" rows="2" cols="80"  id="que">${res.option2}</textarea>
                <br>
                <span>Option-3=</span>
                <textarea id="inptOP3" rows="2" cols="80"  id="que">${res.option3}</textarea>
                <br>
                <span>Option-4=</span>
                <textarea id="inptOP4" rows="2" cols="80"  id="que">${res.option4}</textarea>
                <br>
                <span>ANSER ONLY 1-4 RANGE=</span>
                <input id="inptAns" type="number" value="${res.answer}"></input>
                <br>
                <button class="allBtn" id="upBtn">UPDATE</button>
                <hr>`;
                showinfo.append(details);
                let updateWarn = document.getElementById("updateWarn");
                let inpQue = document.getElementById("inptQue");
                let inptOP1 = document.getElementById("inptOP1");
                let inptOP2 = document.getElementById("inptOP2");
                let inptOP3 = document.getElementById("inptOP3");
                let inptOP4 = document.getElementById("inptOP4");
                let inpAns = document.getElementById("inptAns");
                let upBtn = document.getElementById("upBtn");
                upBtn.addEventListener("click", () => {
                    let question = inpQue.value.replace("\n", "");
                    let option1 = inptOP1.value.replace("\n", "");
                    let option2 = inptOP2.value.replace("\n", "");
                    let option3 = inptOP3.value.replace("\n", "");
                    let option4 = inptOP4.value.replace("\n", "");
                    let answer = inpAns.value;
                    if (answer > 0 && answer < 5) {
                        if (question == "" || option1 == "" || option2 == "" || option3 == "" || option4 == "") {
                            updateWarn.innerText = " !! NULL QUESTION OR ANSWER NOT ALLOWED !! "

                        } else {
                            console.log(option1);
                            let questionAnswer = new QuestionAnswer(question, option1, option2, option3, option4, answer);
                            console.log(questionAnswer);
                            console.log(res.qid);
                            let response = fetch(`http://mcq-quiz-app-env.eba-p3jh63gy.eu-north-1.elasticbeanstalk.com/examRestController/updateSingleQue/${res.qid}`, {
                                method: "PUT",
                                headers: {
                                    'auth': 'headers',
                                    'Accept': 'application/json',
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(questionAnswer)
                            }).then((res) => {
                                let stats = res.status;
                                console.log(stats);
                                if (stats === 200) {
                                    details.innerHTML = "";
                                    details.innerHTML = `<p> !! QUESTION UPDATED SUCCESSFULLY !!</p>`;
                                    showinfo.append(details);
                                } else {
                                    details.innerHTML = "";
                                    details.innerHTML = `<p> !! SOMETHING WENT WRONG !!</p>`;
                                    showinfo.append(details);
                                }
                            })
                        }
                        // constructor(question, option1, option2, option3, option4, answer)
                    } else {
                        updateWarn.innerText = "ANSWER ALLOWED 1-4 ONLY  ";
                    }
                })

            } else {
                details.innerHTML = "";
                details.innerHTML = `<p> !! QUESTION NOT FOUND !!</p>`;
                showinfo.append(details);
            }
        })
    })
}
////UPDATE DELETE QUESTION-end

function allStudentData() {
    details.innerHTML = "";
    details.innerHTML = `<p> ALL Register Students :- </p>`
    let response = fetch("http://mcq-quiz-app-env.eba-p3jh63gy.eu-north-1.elasticbeanstalk.com/studentRestController/allStudents");
    response.then((res) => {
        console.log(res.status);
        return res.json();
    }).then((response) => {
        console.log(response.length);
        if (response.length === 0) {
            let queStore = document.createElement("div");
            queStore.setAttribute("class", "allQue")
            queStore.innerHTML = "";
            queStore.innerHTML = `<p> !! NO STUDENT FOUND !!</p>`;
            details.append(queStore);
        } else {
            response.forEach(element => {
                let queStore = document.createElement("div");
                queStore.setAttribute("class", "allQue")
                queStore.innerHTML = "";
                queStore.innerHTML = `
            <hr>
            <span>Registration ID=${element.id}</span>
            <br>
            <span>firstname =${element.firstname}</span>
            <br>
            <span>lastname =${element.lastname}</span>
            <br>
            <span>email =${element.email}</span>
            <br>
            <span>username =${element.username}</span>
            <br>
            <span>examStatus =${element.examStatus}</span>
            <br>
            <hr>
            `;
                details.append(queStore);
            });
        }
    })
    showinfo.append(details);
}

function PassFailStudents(result) {
    details.innerHTML = "";
    details.innerHTML = `<p> ALL Register Students :- </p>`
    let response = fetch(`http://mcq-quiz-app-env.eba-p3jh63gy.eu-north-1.elasticbeanstalk.com/studentRestController/passFailStd/${result}`);
    response.then((res) => {
        console.log(res.status);
        return res.json();
    }).then((response) => {
        console.log(response.length);
        if (response.length === 0) {
            let queStore = document.createElement("div");
            queStore.setAttribute("class", "allQue")
            queStore.innerHTML = "";
            queStore.innerHTML = `<p> !! NO STUDENT FOUND !!</p>`;
            details.append(queStore);
        } else {
            response.forEach(element => {
                let queStore = document.createElement("div");
                queStore.setAttribute("class", "allQue")
                queStore.innerHTML = "";
                queStore.innerHTML = `
            <hr>
            <span>Registration ID=${element.id}</span>
            <br>
            <span>firstname =${element.firstname}</span>
            <br>
            <span>lastname =${element.lastname}</span>
            <br>
            <span>email =${element.email}</span>
            <br>
            <span>username =${element.username}</span>
            <br>
            <span>examStatus =${element.examStatus}</span>
            <br>
            <hr>
            `;
                details.append(queStore);
            });
        }
    })
    showinfo.append(details);
}

function viewAllStudents() {
    details.innerHTML = "";
    details.innerHTML = `<p>SEE ALL REGISTER STUDENT </p>
    <button class="allBtn" id="allStd">ALL</button>
    <p>SEE ONLY STUDENT WHO PASS EXAM</p>
    <button class="allBtn" id="pass">PASS</button>
    <p>SEE ONLY STUDENT WHO FAIL EXAM</p>
    <button class="allBtn" id="fail">FAIL</button>
    <p>SEE ONLY STUDENT WHO NOT ATTEMPTED EXAM</p>
    <button class="allBtn" id="notAtmpt">NOT ATTEMPTED</button>
    `;
    showinfo.append(details);
    const allStudent = document.getElementById("allStd");
    const passStudent = document.getElementById("pass");
    const failStudent = document.getElementById("fail")
    const notAtmptedStudent = document.getElementById("notAtmpt")
    allStudent.addEventListener("click", () => {
        allStudentData();
    })
    passStudent.addEventListener("click", () => {
        PassFailStudents("Pass");
    })
    failStudent.addEventListener("click", () => {
        PassFailStudents("Fail");
    })
    notAtmptedStudent.addEventListener("click", () => {
        PassFailStudents("NOT ATTEMPTED")
    })
}
//VIEW ALL STUDENTS-end
//STEP-5 
//ADD NEW QUESTION-start
function addNewQuestion() {
    details.innerHTML = "";
    details.innerHTML = `<p> ADD NEW QUESTIONS :- </p>`
    let response = fetch("http://mcq-quiz-app-env.eba-p3jh63gy.eu-north-1.elasticbeanstalk.com/examRestController/seeAllQuestions");
    response.then((res) => {
        return res.json();
    }).then((response) => {
        console.log(response.length);
        if (response.length > 9) {
            let queStore = document.createElement("div");
            queStore.setAttribute("class", "allQue")
            queStore.innerHTML = "";
            queStore.innerHTML = `<p> !! YOU CANNOT ADD MORE THAN 10 QUESTION DELETE QUESTION TO ADD MORE !!</p>`;
            details.append(queStore);
        } else {
            let queStore = document.createElement("div");
            queStore.setAttribute("class", "allQue")
            queStore.innerHTML = "";
            queStore.innerHTML = `<p> !! WANT TO ADD QUESTIONS !!</p>
            <button class="allBtn" id = "yes" > YES</button>
            <button  class="allBtn" id = "no" > NO </button>
            `;
            details.append(queStore);
            let yes = document.getElementById("yes");
            let no = document.getElementById("no");
            yes.addEventListener("click", () => {
                window.location.replace("addQuestion.html");
            })
            no.addEventListener("click", () => {
                viewAllQuestion();
            })
        }
    })
    showinfo.append(details);

}
//ADD NEW QUESTION -END

//LOGOUT -start
function logoutAdmin() {
    details.innerHTML = "";
    details.innerHTML = `<p>  WANT TO LOGOUT ?? </p>
    <button class="allBtn" id = "yes" > YES</button>
    <button class="allBtn" id = "no" > NO </button>
    `;
    showinfo.append(details);
    let logOutYes = document.getElementById("yes");
    let logOutNo = document.getElementById("no");

    logOutYes.addEventListener("click", () => {
        sessionStorage.clear();
        window.location.replace("index.html");
    })
    logOutNo.addEventListener("click", () => {
        viewAllStudents();
    })
}
//LOGOUT -END
//STEP-3 --done all good
//SHOW PROFILE START
const showProfile = () => {
    headDiv.innerHTML = `Welcome ADMIN`;

    mainDivHolder.innerHTML = `
    <div class="boxDiv">
    <span> STUDENT's Details</span>
    <div>
    <button id="viewAllStd">VIEW</button>
    </div>
    </div>
    <div class="boxDiv">
    <span>ALL QUESTIONS</span>
    <div>
    <button id="showAllQue">VIEW</button>
    </div>
    </div>
    <div class="boxDiv">
    <span>EDIT/DELETE Question</span>
    <div>
    <button id="editDeletee">CHANGE</button>
    </div>
    </div >
    <div class="boxDiv">
    <span>ADD NEW QUESTION </span>
    <div>
    <button id="addQue">ADD</button>    
    </div>
    </div>
    <div class="boxDiv">
    <span>LOGOUT </span>
    <div>
    <button id="logout">LOGOUT</button>    
    </div>
    </div>
    
    `;

    const viewAllStd = document.getElementById("viewAllStd");
    const showAllQue = document.getElementById("showAllQue");
    const editDeletee = document.getElementById("editDeletee");
    const addQue = document.getElementById("addQue");
    const logout = document.getElementById("logout");
    //View ALL data on click VIEW
    viewAllStd.addEventListener("click", () => {
        viewAllStudents();
    })
    showAllQue.addEventListener("click", () => {
        viewAllQuestion();
    })
    editDeletee.addEventListener("click", () => {
        updateDeleteQuestions();
    })
    addQue.addEventListener("click", () => {
        addNewQuestion();
    })
    logout.addEventListener("click", () => {
        logoutAdmin();
    })
}
//SHOW PROFILE FUNCTION ENDS

//STEP-2 done all good
//FETCH DATA API 
if (user === "Admin" && pass === "Admin") {
    showProfile();
}


//FETCHING COMPLETE