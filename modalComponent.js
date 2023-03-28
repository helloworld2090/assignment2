// creates Modal componenet
function createModal(jobId, res){

    //https://www.w3schools.com/w3css/w3css_modal.asp used for modal styling
    let modalFrame = document.createElement("div");
    modalFrame.setAttribute("id", jobId+"_modal");
    
    let innerFrame = document.createElement("div");
    modalFrame.appendChild(innerFrame);

    let modalSpan = document.createElement("span");
    modalSpan.setAttribute("onclick", "document.getElementById('"+jobId + "_modal"+"').style.display='none'");
    modalSpan.textContent = "close";
    innerFrame.appendChild(modalSpan);

    let jobTitle = document.createElement("h3");
    if(curWidth < 500){
        jobTitle.textContent = "likes";
        modalFrame.setAttribute("class", "w3-modal mobileModal");
        jobTitle.setAttribute("class", "mLikesTitle");
        innerFrame.setAttribute("class", "w3-modal-content mobileModal");
        modalSpan.setAttribute("class", "w3-button w3-display-topright mClose");


    } else {
        jobTitle.textContent = res["title"]+" likes";
        modalFrame.setAttribute("class", "w3-modal");
        jobTitle.setAttribute("class", "likesTitle");
        innerFrame.setAttribute("class", "w3-modal-content");
        modalSpan.setAttribute("class", "w3-button w3-display-topright");

    }

    innerFrame.appendChild(jobTitle);

    let container = document.createElement("div");;
    container.setAttribute("class",res["likes"].length);
    container.setAttribute("id", "likes"+postCount);

    if (res["likes"].length == 0){
        innerFrame.appendChild(container);
        return modalFrame;
    } 
    
    for(let i=0; i < res["likes"].length; i++){
        let id = res["likes"][i]["userId"];

        let likeStep =  document.createElement("div");
        let user = document.createElement("a");
        user.textContent = res["likes"][i]["userName"];
        user.setAttribute("onclick", "getUserProfile(this.id)");
        if(curWidth < 500){
            user.setAttribute("class", "mCommentUser");
        } else{
            user.setAttribute("class", "commentUser");
        }
        user.setAttribute("id", id);
        likeStep.appendChild(user);
        container.appendChild(likeStep);
    }
    innerFrame.appendChild(container);
    return modalFrame;
}
