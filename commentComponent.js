// creates the comment section in Feed
function createCommentSection(res){
    let commentArea = document.createElement("div");
    commentArea.setAttribute("class", "commentSection");
    commentArea.setAttribute("id", res["id"] + "_allComments");
    //document.getElementById("allComments").hidden = false;

    let commentHead = document.createElement("div");
    commentHead.setAttribute("class","commentArea");
    commentArea.appendChild(commentHead);

    let commentInputSection = document.createElement("div");
    commentInputSection.setAttribute("class","input-group mb-3");
    commentHead.appendChild(commentInputSection);

    let commentInput1 = document.createElement("input");
    commentInput1.setAttribute("id",res["id"]+"_commentInput");
    commentInput1.setAttribute("type","text");
    commentInput1.setAttribute("placeholder","Comments");
    commentInputSection.appendChild(commentInput1);

    let inputGroup = document.createElement("div");
    inputGroup.setAttribute("class","input-group-append");
    commentInputSection.appendChild(inputGroup);
    let commentBtn = document.createElement("button");
    if (navigator.onLine == true){
        commentBtn.setAttribute("value",userToken);
    }
    commentBtn.setAttribute("id",res["id"]);
    commentBtn.setAttribute("onclick","addComment(this.value, this.id)");
    commentBtn.setAttribute("type","submit");
    commentBtn.textContent = "Submit";
    inputGroup.appendChild(commentBtn);
    
    if (curWidth < 500){    
        commentInput1.setAttribute("class","mformControl");
        commentBtn.setAttribute("class","mSuccess");
    } else {        
        commentBtn.setAttribute("class","Success");
        commentInput1.setAttribute("class","formControl");
    }
    let userComments = document.createElement("div");
    userComments.setAttribute("class","comment");
    return commentArea;
}
