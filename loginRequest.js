

// checks if user is Authenicated
function loginReq(parm, password, email){
    if (parm["error"] != null){
        alert("login Failed");
        document.getElementById("loginFailed").hidden = false;
    } else {
        document.getElementById("loginFailed").hidden = true;
        sessionStorage.setItem("email", email);
        sessionStorage.setItem("id", parm["userId"]);
        sessionStorage.setItem("password", password);
        sessionStorage.setItem("userToken", parm["token"]);
        window.location.href = 'pages/HomePage.html#feed='+parm["userId"]+'';
    }
}

