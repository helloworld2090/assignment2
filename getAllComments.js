// gets all comments of a post
function getAllComments(comments){
    let commentsTable = document.createElement("div");
    commentsTable.setAttribute("id","comments"+postCount);
    commentsTable.setAttribute("class",comments.length);

    for (let i=0 ; i < comments.length; i++){
        //console.log(comments[i]["userId"]);
        let commentObj = document.createElement("div");
        if (curWidth < 500){
            commentObj.setAttribute("class","mComment");
        } else {
            commentObj.setAttribute("class","comment");
        }

        let commentObjChild = document.createElement("a");
        commentObjChild.setAttribute("onclick", "getUserProfile(this.id)");
        commentObjChild.setAttribute("class","commentUser");
        commentObjChild.setAttribute("id",comments[i]["userId"]);
        commentObjChild.textContent = comments[i]["userName"] + ":";
        commentObj.appendChild(commentObjChild);
        //commentObj.textContent = "tet";
        let commentSpan = document.createElement("span");
        commentSpan.textContent = " " + comments[i]["comment"];
        commentObj.appendChild(commentSpan);
        commentsTable.appendChild(commentObj);
    }

  return commentsTable;
}
