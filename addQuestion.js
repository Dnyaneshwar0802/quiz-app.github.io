let body = document.body;
sessionStorage.setItem("username", "Admin");
sessionStorage.setItem("password", "Admin");

let user = sessionStorage.getItem("username")
let pass = sessionStorage.getItem("password")
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

body.innerHTML = "";
if (user === "Admin" && pass === "Admin") {
    body.innerHTML = ` <div class="container">
<div class="text" id="warning">
    ENTER QUESTION OPTIONS AND ANSWER
</div>
<form action="#">
    <div class="form-row">
        <div class="input-data textarea">
            <textarea rows="8" cols="80" required id="que"></textarea>
            <div class="underline"></div>
            <label for="">Question</label>
        </div>
    </div>
    <div class="form-row">
        <div class="input-data textarea">
            <textarea rows="8" cols="80" required id="op1"></textarea>
            <div class="underline"></div>
            <label for="">Option-1</label>
        </div>
    </div>
    <div class="form-row">
        <div class="input-data textarea">
            <textarea rows="8" cols="80" required id="op2"></textarea>
            <div class="underline"></div>
            <label for="">Option-2</label>
        </div>
    </div>
    <div class="form-row">
        <div class="input-data textarea">
            <textarea rows="8" cols="80" required id="op3"></textarea>
            <div class="underline"></div>
            <label for="">Option-3</label>
        </div>
    </div>
    <div class="form-row">
        <div class="input-data textarea">
            <textarea rows="8" cols="80" required id="op4"></textarea>
            <div class="underline"></div>
            <label for="">Option-4</label>

            <div class="form-row">
                <div class="input-data textarea">
                    <input type="number" min="1" max="4" required id="ans">
                    <div class="underline"></div>
                    <label for="">ANSWER 1 2 3 4 Single Digit Allowed only</label>
                </div>
                <br />

            </div>
            <div class="form-row submit-btn">
                <div class="input-data">
                    <div class="inner"></div>
                    <input id="btn" type="submit" value="submit">
                </div>
            </div>
</form>
</div>`;

    let btn = document.getElementById("btn");
    let que = document.getElementById("que");
    let op1 = document.getElementById("op1");
    let op2 = document.getElementById("op2");
    let op3 = document.getElementById("op3");
    let op4 = document.getElementById("op4");
    let ans = document.getElementById("ans");
    let warning = document.getElementById("warning");
    btn.addEventListener("click", (e) => {
        e.preventDefault();
        let question = que.value.replace("\n", "");
        let opt1 = op1.value.replace("\n", "");
        let opt2 = op2.value.replace("\n", "");
        let opt3 = op3.value.replace("\n", "");
        let opt4 = op4.value.replace("\n", "");
        let answer = ans.value.replace("\n", "");

        if (answer > 0 && answer < 5) {
            if (question === "" && opt1 === "" && opt2 === "" && opt3 === "" && opt4 === "") {
                warning.textContent = "";
                warning.textContent = " !! NULL VALUE NOT ALLOWED !!";
            } else {
                let res = fetch("http://mcq-quiz-app-env.eba-p3jh63gy.eu-north-1.elasticbeanstalk.com/examRestController/seeAllQuestions");
                res.then((res) => {
                    return res.json();
                }).then((res) => {
                    console.log(res.length);
                    let len = res.length;
                    if (len > 9) {
                        console.log("inside if");
                        warning.textContent = "";
                        warning.textContent = "CANNOT ADD MORE than 10 Question";
                    } else {
                        console.log("inside Else")
                        let questionAnswer = new QuestionAnswer(question, opt1, opt2, opt3, opt4, answer);
                        console.log(questionAnswer);
                        let response = fetch("http://mcq-quiz-app-env.eba-p3jh63gy.eu-north-1.elasticbeanstalk.com/examRestController/saveData", {
                            method: "POST",
                            headers: {
                                'auth': 'headers',
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(questionAnswer)
                        })
                        response.then((response) => {
                            console.log(response.status);
                            if (response.status === 200) {
                                warning.textContent = "";
                                warning.textContent = "QUESTION AND ANSWER UPDATED SUCCESS";
                            } else {
                                warning.textContent = "";
                                warning.textContent = "FAILED TO SAVE DATA";
                            }
                        })
                    }
                })

            }


        } else {
            console.log("NOPE")
            warning.textContent = "";
            warning.textContent = " !! INPUT MUST BE 1-4 RANGE !!";
        }


    })

} else {
    body.innerHTML = `<div class="container">
    <div class="text">
    YOU ARE NOT AN ADMIN
    </div>`;
}