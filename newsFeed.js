
const myHeaders = new Headers();
const MinDesktopWidth = 500;
const MinLargeScreenWodth = 1000;

let jobArr = [];
let postCount = 0;
let firstLoad = true;
let curLength;
let updatedJobArr = [];
let val;
let latestPost;
let curWidth;
let curLatest;
let curLatestData;
let offset = 0;

// creates a post component
function createPost(res){
    let newPost = document.createElement("div");

    if (curWidth > MinLargeScreenWodth || navigator.onLine != true ){
        newPost.setAttribute("class", "post");
    } else if (curWidth >= MinDesktopWidth && curWidth <= MinLargeScreenWodth){
        newPost.setAttribute("class", "post2");
    } else {
        document.getElementById("appBar").hidden = true;
        document.getElementById("mBar").hidden = false;
        newPost.setAttribute("class", "mPost");
    }

    newPost.setAttribute("id", "post"+postCount);
    let title = res["title"];
    let titleElement = document.createElement("h2");

    titleElement.textContent = title;
    newPost.appendChild(titleElement);

    let description = res["description"];
    let descriptionElement = document.createElement("h5");
    descriptionElement.textContent = description;
    newPost.appendChild(descriptionElement);
 
    let grid = document.createElement("div");
    newPost.appendChild(grid);

    // Posted date section
    let postedOnSection = document.createElement("div");
    postedOnSection.setAttribute("class", "grid-item");
    postedOnSection.textContent = "Created At";
    grid.appendChild(postedOnSection);

    let postedOn= document.createElement("div");
    postedOn.setAttribute("class", "grid-item");
    postedOn.textContent = calculateDate(res["createdAt"]);
    grid.appendChild(postedOn);

    // Start date section
    let startDateSection = document.createElement("div");
    startDateSection.setAttribute("class", "grid-item");
    startDateSection.textContent = "Start Date"
    grid.appendChild(startDateSection);

    let startDate= document.createElement("div");
    startDate.setAttribute("class", "grid-item");
    startDate.textContent = res["start"];
    grid.appendChild(startDate);

    // Post Made by section
    let madeBySection = document.createElement("div");
    madeBySection.setAttribute("class", "grid-item");
    madeBySection.textContent = "Creator"
    grid.appendChild(madeBySection);

    let madeBy= document.createElement("a");
    madeBy.setAttribute("onclick", "getUserProfile(this.id)");
    madeBy.setAttribute("id", res["creatorId"]);
    madeBy.setAttribute("class", "grid-item creator");
    getuserName(res["creatorId"]).then(response =>{
        madeBy.textContent = response;
    })
    grid.appendChild(madeBy);

    let noCommentsSection = document.createElement("div");
    noCommentsSection.setAttribute("class", "grid-item");
    noCommentsSection.textContent = "No. of comments"
    grid.appendChild(noCommentsSection);

    let noComments= document.createElement("div");
    noComments.setAttribute("class", "grid-item");
    noComments.setAttribute("id", "noOfComments"+postCount);
    noComments.textContent = res["comments"].length;
    grid.appendChild(noComments);


    //adding image 
    let jobImage = document.createElement("img");
    jobImage.setAttribute("src", res["image"]);
    jobImage.setAttribute("alt","Job Image");
    newPost.appendChild(jobImage);

    if (curWidth < MinDesktopWidth){
        grid.setAttribute("class", "mGrid-container");
        titleElement.setAttribute("class", "mPostTitle")
        descriptionElement.setAttribute("class", "mDesciption")
        postedOnSection.setAttribute("class", "mPostData")
        postedOn.classList.add("mPostData");
        startDateSection.setAttribute("class", "mPostData")
        startDate.classList.add("mPostData")
        madeBySection.setAttribute("class", "mPostData")
        madeBy.classList.add("mCreator");
        noCommentsSection.setAttribute("class", "mPostData");
        noComments.classList.add("mPostData");

        jobImage.setAttribute("class", "mPostingImage");
    } else {
        grid.setAttribute("class", "grid-container");
        jobImage.setAttribute("class", "postingImage");
    }

    // see who likes  
    let likeHeader = document.createElement("h4");
    likeHeader.setAttribute("class", "like");
    newPost.appendChild(likeHeader);
    
    let likeBtn = document.createElement("button");
    //console.log(res["likes"].length);
    
    likeBtn.textContent = res["likes"].length;
    likeBtn.setAttribute("id", "likeCount"+postCount);
    likeBtn.setAttribute("onclick", "document.getElementById('"+res["id"]+"_modal"+"').style.display='block'");

    likeHeader.appendChild(likeBtn);

    let likeIcon = document.createElement("i");

    likeIcon.setAttribute("id", res["id"] + "_likes");
    likeBtn.appendChild(likeIcon);

    // like and comments
    let lastSection = document.createElement("div");
    newPost.appendChild(lastSection);

    let likeBtn2 = document.createElement("button");
    likeBtn2.setAttribute("class", "btn btn-info");
    likeBtn2.setAttribute("id", res["id"]);
    if (navigator.onLine == true){
        likeBtn2.setAttribute("value", userToken);
    }
    likeBtn2.setAttribute("onclick", "addLike(this.value, this.id)");
    likeBtn2.textContent = "Like";
    lastSection.appendChild(likeBtn2);

    let commentBtn = document.createElement("button");
    commentBtn.setAttribute("onclick", "ShowComments(this.id)");
    commentBtn.setAttribute("id", res["id"]);
    commentBtn.textContent = "Comment";
    lastSection.appendChild(commentBtn);

    if (curWidth < MinDesktopWidth){
        likeIcon.setAttribute("class", "bie bi-hand-thumbs-up mLikeIcon");
        likeBtn.setAttribute("class", "mlikebtnTxt");
        likeBtn2.setAttribute("class", "mLikeBtn");
        commentBtn.setAttribute("class", "mLikeBtn");

    } else {
        likeIcon.setAttribute("class", "bie bi-hand-thumbs-up");
        likeBtn.setAttribute("class", "likebtn");
        likeBtn2.setAttribute("class", "blueBtn");
        commentBtn.setAttribute("class", "blueBtn");
    }

    let commentComp = createCommentSection(res);
    newPost.appendChild(commentComp);
    let tableOfComments = getAllComments(res["comments"]);
    commentComp.appendChild(tableOfComments);
    commentComp.hidden = true;
    
    let likeModal = createModal(res["id"], res);
    newPost.appendChild(likeModal);
    document.getElementById("feed").appendChild(newPost);
}


// gets the userName from Id
function getuserName(id){
    let url;
    url = new URL("http://localhost:5005/user");
    url = url+"?userId="+ id;
    
   return fetch(url, {
        headers: {
        Authorization  : userToken,
        Accept: "application/json",
        },
    method: "GET",
    }).then(response => response.json())
    .then((response)=>{
        return response.name;
    })
}

// shows the commentn section
function ShowComments(jobId){
    let test = document.getElementById(jobId +"_allComments");
    if (window.getComputedStyle(test).display === "none") {
        test.hidden = false;
    } else {
        test.hidden = true;
    }
}

// adds like to a post
function addLike(token, jobId){
    let likedIcon = document.getElementById(jobId + "_likes");
    let successLike = document.createElement("div");
    successLike.textContent = "liked";
    successLike.style.color = "rgb(52, 140, 235)";
    likedIcon.appendChild(successLike);
    //element.style.color = "rgb(52, 140, 235)".
    //console.log("liked");
    fetch("http://localhost:5005/job/like", {
        body: '{"id": "'+jobId+'","turnon": "string"}',
        headers: { 
        Authorization : token,
        Accept: "application/json",
        "Content-Type": "application/json"
        },
        method: "PUT"
    })
}

// adds a comment to a post
function addComment(token,jobId){
    let comment = document.getElementById(jobId+"_commentInput").value;
    if (comment == ""){
        return;
    }
    fetch("http://localhost:5005/job/comment", {
        body: '{"id": "'+jobId+'","comment": "'+comment+'"}',
        headers: {
        Authorization : token,
        Accept: "application/json",
        "Content-Type": "application/json"
        },
        method: "POST"
    })    
    document.getElementById(jobId+"_commentInput").value = "";
}


// get the job feed
function getFeed(increment){
    sessionStorage.setItem("userToken", userToken);
    if (firstLoad != true){
        return ;
    }    

    let url;
    url = new URL("http://localhost:5005/job/feed");
    url = url+"?start="+increment;
    fetch(url, {  
        headers: {    
        Authorization : userToken,
        Accept: "application/json"
        },
        method: "GET"
    }).then(response => response.json())
    .then(data => getAllJobs(data, increment));
}

// get the job feed
function getAllJobs(res, curIncrement){
    if (curIncrement == 0){
        latestPost = res[0]["title"];
    }

    if (res.length == 0) {
        firstLoad = false;
        curLength = jobArr.length;
        addElement(jobArr);
    } else {
        for (let i = 0; i < res.length; i++) {
        jobArr.push(res[i])
        }
        getFeed(curIncrement + 5);
    }
}

//adds a post eleemnt 
function addElement (res) {  
  for (let i = 0; i < 5; i++) {             
      createPost(res[i]);
      localStorage.setItem("post"+postCount, JSON.stringify(res[i]));
      postCount +=1;
  }
}


// get the user's profile
function getUserProfile(id){
    let url;
    url = new URL("http://localhost:5005/user");
    url = url+"?userId="+ id;
    
    fetch(url, {
        headers: {
        Authorization  : userToken,
        Accept: "application/json",
        },
    method: "GET",
    }).then(response => response.json())
    .then(data => showData(data)); 
}

//moves the page to a user's profile using url fragmentation
function showData(res){
    window.location.href = '../pages/ProfilePage.html#profile='+res["id"];
}

// function for inifinite scroll
window.addEventListener('scroll', () => {
    if (postCount < jobArr.length && window.scrollY + window.innerHeight + 50 >= document.documentElement.scrollHeight){
        createPost(jobArr[postCount]);
        localStorage.setItem("post"+postCount, JSON.stringify(jobArr[postCount]));
        postCount++;
    }
})

// live updates to the comment section
function updateComments(targetNum, comments){
    let tagetComment = document.getElementById("comments"+targetNum);
    if (tagetComment.className != comments.length){
    
        for (i = tagetComment.className; i < comments.length ; i++){
        let commentObj = document.createElement("div");
        let commentObjChild = document.createElement("a");
        commentObjChild.setAttribute("onclick", "getUserProfile(this.id)");
        commentObjChild.textContent = comments[i]["userName"] + ":";
        commentObj.appendChild(commentObjChild);

        let commentSpan = document.createElement("span");
        commentSpan.textContent = " " + comments[i]["comment"];
        commentObj.appendChild(commentSpan);  
        tagetComment.appendChild(commentObj);

            if (curWidth < MinDesktopWidth){
            commentObj.setAttribute("class","comment commentFont ");
            commentObjChild.setAttribute("class","commentUser commentFont");
            } else {
            commentObj.setAttribute("class","comment");
            commentObjChild.setAttribute("class","commentUser");
            }
        }
    
        let commentCounter = document.getElementById("noOfComments"+targetNum);
        commentCounter.textContent = comments.length;    
        //commentCounter.setAttribute("id", "noOfComments"+targetNum+1);
        
        tagetComment.className = comments.length;
    }
}

//live updates to the likes section
function updateLikes(targetNum, likes){
    let tagetModal = document.getElementById("likes"+targetNum);
    let curClass = tagetModal.className;
    let diff = likes.length - curClass;
    if (tagetModal.className != likes.length){

    for(let i=0; i < diff; i++){
        let id = likes[i]["userId"];
        let likeStep =  document.createElement("div");
        let user = document.createElement("a");
        user.textContent = likes[i]["userName"];
        user.setAttribute("onclick", "getUserProfile(this.id)");
        if (curWidth < MinDesktopWidth){
            user.setAttribute("class", "mCommentUser");
        } else{
            user.setAttribute("class", "commentUser");
        }
        user.setAttribute("id", id);
        likeStep.appendChild(user);
        tagetModal.appendChild(likeStep);
    }
    tagetModal.className = likes.length;
    let likeCounter = document.getElementById("likeCount"+targetNum);
    likeCounter.textContent = likes.length;
    }
    return; 
}

// function to get notifications on new job posts
function newPostNotification(newJob){
    let notificationSection = document.getElementById("notifications");
    let mNotificationSection = document.getElementById("mobileNotifications");
    let newNotification = document.createElement("div");
    newNotification.textContent = newJob["title"];
    
    if (curWidth < MinDesktopWidth){
        newNotification.setAttribute("class", "mPostData")
        mNotificationSection.appendChild(newNotification);
        document.getElementById("mobileNotifications").hidden = false;
    } else {
        notificationSection.appendChild(newNotification);
        document.getElementById("notifications").hidden = false;
    }
    offset+=1;
    return;
}

// gets Jobs
function makeReq(increment){
    let url;
    url = new URL("http://localhost:5005/job/feed");
    url = url+"?start="+increment;

    fetch(url, { 
        headers: {    
            Authorization : sessionStorage.getItem("userToken"),
            Accept: "application/json"
        },
        method: "GET"
    }).then(response => response.json())
    .then(data => getUpdatedfeed(data, increment));
}

// gets the new feed
function getUpdatedfeed(res, curIncrement){
    if (res.length == 0) {
        val = updatedJobArr;
    } else {
        for (let i = 0; i < res.length; i++) {
            updatedJobArr.push(res[i])
        }
        makeReq(curIncrement + 5);
    }
}

// returns new posts
function getNewPosts(){
    let url;
    url = new URL("http://localhost:5005/job/feed");
    url = url+"?start=0";
    fetch(url, { 
        headers: {    
            Authorization : sessionStorage.getItem("userToken"),
            Accept: "application/json"
        },
        method: "GET"
    
    }).then(response => response.json())
    .then(data => {
    curLatestData = data[0];
    curLatest = data[0]["title"];
    });
}
function livesUpdates(){
    updatedJobArr = [];
    makeReq(0);
    return val;
}

// main logic
function mainFeed(){
    if (screen.width < MinDesktopWidth){
        curWidth = screen.width
        
    } else {
        curWidth = window.innerWidth;
    }
    userToken = sessionStorage.getItem("userToken");
    getFeed(0);
    document.getElementById("myEmail").textContent = sessionStorage.getItem("email");
    
    if(navigator.onLine == true) {
        document.getElementById("offline").hidden = true;
    } else {
        document.getElementById("offline").hidden = false;
        let countPosts = localStorage.length;
        for (let i =0 ; i < countPosts ; i++){
            let storedObj = JSON.parse(localStorage.getItem("post"+i));
            createPost(storedObj);
        }
    }
    
}

mainFeed();

// poll the server every 1.5 sec 
setInterval(function () {
    let newData;
    if (firstLoad == false){
        newData = livesUpdates();
    }
    if (newData == null){
        return;
    }
    let curStart = 0 + offset;
    for (let i = curStart ; i < postCount; i++){
        updateComments(i - offset, newData[i]["comments"]);
        updateLikes(i - offset, newData[i]["likes"])
    }

    getNewPosts();
    if (curLatest != latestPost){
        newPostNotification(curLatestData);
        latestPost = curLatest;
    }
    if (curWidth >= MinDesktopWidth){
        curWidth = mobileResponsiveness();
    }
}, 1500)



