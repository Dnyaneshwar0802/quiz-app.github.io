//STEP -1 done all good
//59 62 65 function comment out
//VARIABLES NEEDED START
//console.log(sessionStorage);
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

//console.log(user);
//console.log(pass);
//VARIABLES NEEDED END

//STEP--5  ALL GOOD
// CREATE CLASS START
class userData {
    constructor(firstname, lastname, email, username, ) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.username = username;
    }
}
//CREATE CLASS DONE

//STEP --6 
//UPDATE DETAILS START
let updateUserDetails = () => {
    console.log(details);
    let response1 = fetch(`http://mcq-quiz-app-env.eba-p3jh63gy.eu-north-1.elasticbeanstalk.com/studentRestController/sendData/${user}/${pass}`)
    response1.then((res) => {
        return res.json();
    }).then((response) => {
        console.log(response);
        //ALL GOOD ABOVE
        console.log(details);
        details.innerHTML = "";
        console.log(details);
        //DONE WITH TESTING
        details.innerHTML = `<p class="updateWarn">Edit Below and click Update To change Details</p>
    <span>FirstName:-</span>
    <input id="fname" type="text" value="${response.firstname}" />
    <br>
    <br>
    <span>LastName:-</span>
    <input id="lname" type="text" value="${response.lastname}" />
    <br>
    <br>
    <span>Email ID:-</span>
    <input id="email" type="email" value="${response.email}" />
    <br>
    <br>
    <span>Username:-</span>
    <input id="username" type="text" value="${response.username}" />
    <br>
    <br>
    <button id="updateBtn" type="submit">UPDATE</button>
    <br>
    <br>

    `;
        showinfo.append(details);

        let updateWarn = document.querySelector(".updateWarn");
        let updateButton = document.getElementById("updateBtn");
        console.log(updateButton)

        updateButton.addEventListener("click", () => {
            let firstname = document.getElementById("fname").value;
            let lastname = document.getElementById("lname").value;
            let email = document.getElementById("email").value;
            let username = document.getElementById("username").value;

            let data = new userData(firstname, lastname, email, username);


            const response1 = fetch(`http://mcq-quiz-app-env.eba-p3jh63gy.eu-north-1.elasticbeanstalk.com/studentRestController/updateData/${response.id}`, {
                method: "PUT",
                headers: {
                    'auth': 'headers',
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
            });
            response1.then((response1) => {
                let status = response1.status;
                warning.innerHTML = "";
                if (status === 200) {
                    updateWarn.textContent = "";
                    updateWarn.textContent = "Details Successfully Updated";
                } else {
                    updateWarn.textContent = "";
                    updateWarn.textContent = "Update Data failed Either UserName is taken OR Email already Registered";
                }
                details.append(warning);
            })
        })
    })
}
//UPDATE DETAILS END

//STEP-4 -Done ALL GOOD
//VIEW DETAILS START
let userDetails = () => {

    let response = fetch(`http://mcq-quiz-app-env.eba-p3jh63gy.eu-north-1.elasticbeanstalk.com/studentRestController/sendData/${user}/${pass}`)
    response.then((res) => {
        return res.json();
    }).then((response) => {
        console.log(response);

        console.log(details);
        details.innerHTML = "";
        console.log(details);

        details.innerHTML = `
        <hr>
         <p>Here is your Details ${response.firstname} :-</span>
         <br>
             <span>Registration Number = ${response.id}</span>
             <br>
             <span>FirstName = ${response.firstname}</span>
             <br>
             <span>LastName = ${response.lastname}</span>
             <br>
             <span>UserName = ${response.username}</span>
             <br>
             <span>Email = ${response.email}</span>
             <br>
             <span>ExamStatus = ${response.examStatus}</span>
             <br> 
             <hr>      
         `;
        showinfo.append(details);
    })

}
//VIEW DETAILS END

//STEP-7
//DELETE USER START
let deleteUser = (id) => {
    console.log(details);

    details.innerHTML = "";
    details.innerHTML = `<p>Are YOu Sure You Want to Delete Application</p>
    <p>Confirm YES To Delete Application</p>
    <div class="yesNO">
    <button id = "yes" > YES </button>
    <button id = "no" > NO </button>
    </div>
    `;
    showinfo.append(details);
    console.log(details);

    let no = document.getElementById("no");
    let yes = document.getElementById("yes");
    no.addEventListener("click", () => {
        userDetails();
    })
    yes.addEventListener("click", () => {

        fetch(`http://mcq-quiz-app-env.eba-p3jh63gy.eu-north-1.elasticbeanstalk.com/studentRestController/deleteData/${id}`, {
            method: "DELETE",
            headers: {
                'auth': 'headers',
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
        sessionStorage.clear();
        window.location.replace("deletedSuccess.html");

    })
}
//DELETE USER END

let examApi = () => {
    details.innerHTML = "";
    details.innerHTML = `
    <p>Scroll And Confirm YES To Give EXAM</p>
    <p>To pass EXAM You have to score greater than or equal to 5 out of 10  </p>
    <p>1 Question =1 Mark </p>
    <div class="yesNO">
    <button id = "yes" > YES </button>
    <button id = "no" > NO </button>
    </div>
    `;
    showinfo.append(details);
    const yesBtn = document.getElementById("yes");
    const noBtn = document.getElementById("no")
    yesBtn.addEventListener("click", () => {
        let userExamStatus = sessionStorage.getItem("status")
        if (userExamStatus === "NOT ATTEMPTED") {
            window.location.replace("examportal.html");
        } else {
            details.innerHTML = "";
            details.innerHTML = `
            <p>YOU ALREADY SUBMITTED QUIZ</p>
            <p>YOU CAN NOT APPEAR FOR QUIZ TWICE</p>
            `;
        }

    })
    noBtn.addEventListener("click", () => {
        userDetails();
    })
}
//LOGOUT-start
function logoutStudent() {
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
        location.replace("index.html");
    })
    logOutNo.addEventListener("click", () => {
        userDetails();
    })

}
//LOGOUT -end
//STEP-3 --done all good
//SHOW PROFILE START
const showProfile = (res) => {
    // sessionStorage.setItem("userName", res.username)
    // sessionStorage.setItem("password", res.password)
    sessionStorage.setItem("id", res.id)
    sessionStorage.setItem("status", res.examStatus);
    // let newHeader = document.createElement("div");
    // newHeader.setAttribute("id", "headDiv");
    headDiv.innerHTML = `Welcome ${res.firstname} ${res.lastname}`;
    //showinfo.append(newHeader);
    // const buttonDiv = document.createElement("div");
    // buttonDiv.setAttribute("class", "mainDivHolder");

    mainDivHolder.innerHTML = `
    <div class="boxDiv">
    <span> VIEW Details</span>
    <div>
    <button id="view">VIEW</button>
    </div>
    </div>
    <div class="boxDiv">
    <span> UPDATE Data</span>
    <div>
    <button id="update">UPDATE</button>
    </div>
    </div>
    <div class="boxDiv">
    <span>DELETE Form</span>
    <div>
    <button id="deletee">DELETE</button>
    </div>
    </div >
    <div class="boxDiv">
    <span>GIVE EXAM </span>
    <div>
    <button id="exam">EXAM </button>    
    </div>
    </div>
    <div class="boxDiv">
    <span>LOGOUT </span>
    <div>
    <button id="logout">LOGOUT</button>    
    </div>
    </div>
    `;

    const view = document.getElementById("view");
    const update = document.getElementById("update");
    const deletee = document.getElementById("deletee");
    const exam = document.getElementById("exam");
    let details = document.createElement("div");
    const logout = document.getElementById("logout");
    //View ALL data on click VIEW
    view.addEventListener("click", () => {
        userDetails();
    })
    update.addEventListener("click", () => {
        updateUserDetails(res);
    })
    deletee.addEventListener("click", () => {
        let id = res.id;
        deleteUser(id);
    })
    exam.addEventListener("click", () => {
        examApi();
    })
    logout.addEventListener("click", () => {
        logoutStudent();
    })
}
//SHOW PROFILE FUNCTION ENDS

//STEP-2 done all good
//FETCH DATA API 
let response = fetch(`http://mcq-quiz-app-env.eba-p3jh63gy.eu-north-1.elasticbeanstalk.com/studentRestController/sendData/${user}/${pass}`)
response.then((response) => {
    return response.json();
}).then((res) => {
    //sessionStorage.clear();
    //console.log(res);
    showProfile(res);
})
//FETCHING COMPLETE