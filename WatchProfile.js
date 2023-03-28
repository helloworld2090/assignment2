// makes a request to the Backend to watch a user
function watchThisProfile(){
    let followerEmail = document.getElementById("profileEmail").textContent;
    document.getElementById("watchingTrue").hidden = false;
    document.getElementById("watchingFalse").hidden = true;
    fetch("http://localhost:5005/user/watch", {
        body: '{"email": "'+followerEmail+'","turnon": true}',
        headers: {
        Authorization : sessionStorage.getItem("userToken"),
        Accept: "application/json",
        "Content-Type": "application/json"
        },
        method: "PUT"
    }).then(response => response.json())
    .then(data => console.log(data));         
}


// makes a request to the Backend to un watch a user
function unWatchThisProfile(){
    document.getElementById("watchingTrue").hidden = true;
    document.getElementById("watchingFalse").hidden = false;

    let followerEmail = document.getElementById("profileEmail").textContent;
    fetch("http://localhost:5005/user/watch", {
        body: '{"email": "'+followerEmail+'","turnon": false}',
        headers: {
        Authorization : sessionStorage.getItem("userToken"),
        Accept: "application/json",
        "Content-Type": "application/json"
    
        },
        method: "PUT"
    }).then(response => response.json())
    .then(data => console.log(data));         

}

// makes a request to the Backend to watch a user by email
function watchProfileByEmail(){
    let email = document.getElementById("searchEmail").value;
    document.getElementById("searchEmail").value = "";

    document.getElementById("followingResult").textContent = "following "+email;
    document.getElementById("followingResult").hidden = false;
    
    fetch("http://localhost:5005/user/watch", {
        body: '{"email": "'+email+'","turnon": true}',
        headers: {
        Authorization : sessionStorage.getItem("userToken"),
        Accept: "application/json",
        "Content-Type": "application/json"
        },
        method: "PUT"
    }).then(response => response.json())
    
}


// makes a request to the Backend to un watch a user by email
function watchProfileByEmailMobile(){
    let email = document.getElementById("searchEmailMobile").value;
    document.getElementById("searchEmailMobile").value = "";
    document.getElementById("followingResultMobile").textContent = "following "+email;
    document.getElementById("followingResultMobile").hidden = false;

    fetch("http://localhost:5005/user/watch", {
        body: '{"email": "'+email+'","turnon": true}',
        headers: {
        Authorization : sessionStorage.getItem("userToken"),
        Accept: "application/json",
        "Content-Type": "application/json"
        },
        method: "PUT"
    }).then(response => response.json())

}   

// get if the user is currently watching another user
function curWatching(data){
    let curWatching  =false;
    let myID = sessionStorage.getItem("id");

    for (let i= 0; i< data.length; i++){
        if (data[i] == myID){
            curWatching = true;
        }
    }

    if (curWatching == true){
        document.getElementById("watchingTrue").hidden = false;
        document.getElementById("watchingFalse").hidden = true;
    } else {
        document.getElementById("watchingTrue").hidden = true;
        document.getElementById("watchingFalse").hidden = false;
        console.log("not watching");
    }

}

