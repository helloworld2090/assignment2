
if(navigator.onLine != true) {
    window.location.href = 'pages/HomePage.html#feed';
}


// switching between login and register tab
function signUpTab(){
    document.getElementById("login").hidden = true;
    document.getElementById("register").hidden = false;

}

function loginTab(){
    document.getElementById("login").hidden = false;
    document.getElementById("register").hidden = true;
}




// makes a login req to the backend
function loginUser(){
    let email = document.getElementById("loginEmail").value
    let password = document.getElementById("loginPassword").value

    let payload = '{"email": "'+email+'","password": "'+password+'"}';
    const res = fetch("http://localhost:5005/auth/login", {
        body: payload,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        method: "POST"
      }).then(res => res.json())
      .then(data => loginReq(data, password, email))
}

