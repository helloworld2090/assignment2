
// registers a user
function registerUser(){
    let email = document.getElementById("registerEmail").value
    let name = document.getElementById("registerName").value
    let p1 = document.getElementById("registerPassword").value
    let p2 = document.getElementById("registerPassword2").value

    // catching errors, 
    if (!email.includes("@") || !email.includes(".com")){
        alert("Registration Failed");
        document.getElementById("invalidEmail").hidden = false;
        document.getElementById("invalidPasswordMatch").hidden = true;
        document.getElementById("invalidPassword").hidden = true;
        document.getElementById("invalidName").hidden = true;
        return;
    } else if (name.length < 1){
        alert("Registration Failed");
        document.getElementById("invalidName").hidden = false;
        document.getElementById("invalidEmail").hidden = true;
        document.getElementById("invalidPasswordMatch").hidden = true;
        document.getElementById("invalidPassword").hidden = true;
        return;
    } else if (p1.length < 8){
        alert("Registration Failed");
        document.getElementById("invalidPassword").hidden = false;
        document.getElementById("invalidName").hidden = true;
        document.getElementById("invalidEmail").hidden = true;
        document.getElementById("invalidPasswordMatch").hidden = true;
        return;

    } else if (p1 != p2){
        alert("Registration Failed");
        document.getElementById("invalidPasswordMatch").hidden = false;
        document.getElementById("invalidPassword").hidden = true;
        document.getElementById("invalidName").hidden = true;
        document.getElementById("invalidEmail").hidden = true;
        return;
    } else {    
        // makes a req to create new user
        fetch("http://localhost:5005/auth/register", {
            body: '{"email": "'+email+'","password": "'+p1+'","name":"'+name+'"}',
            headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        method: "POST"
        }).then(response => response.json())
        .then(data => loginReq(data, p1, email));
    }
}
