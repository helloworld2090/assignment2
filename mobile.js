
// function that converts post classes on when resizing
function mobileResponsiveness() {
    let post
    curWidth = window.innerWidth;
    if (curWidth >= MinDesktopWidth && curWidth <= MinLargeScreenWodth){
        // going from large to med
        post = document.getElementsByClassName("post");
        for (let i = 0; i < post.length; i++) {
            post[i].setAttribute("class", "post2");
        }

        navBtns = document.getElementsByClassName("btnText");
        for (let i = 0; i < navBtns.length; i++) {
            navBtns[i].setAttribute("class", "smallBtnText");
        }

        document.getElementById("lurkForWork").hidden = true;

    // going from small to med
    } else {
        post = document.getElementsByClassName("post2");
        for (let i = 0; i < post.length; i++) {
            post[i].setAttribute("class", "post");
        }

        navBtns = document.getElementsByClassName("smallBtnText");
        for (let i = 0; i < navBtns.length; i++) {
            navBtns[i].setAttribute("class", "btnText");
        }

        document.getElementById("lurkForWork").hidden = false;
    }
    return curWidth;
}


