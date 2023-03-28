
//Styles of components responding to scrren size changes
function mobileResponsivenessProfile() {
    let curWidth = window.innerWidth;
    if (curWidth >= MinDesktopWidth && curWidth <= MinLargeScreenWodth){
        document.getElementById("newProfile").style.marginLeft = "15%";
        document.getElementById("newProfile").style.minWidth = "400px";
        document.getElementById("newProfile").style.width = "70%";
        document.getElementById("lurkForWork").hidden = true;
        document.getElementById("watcheeSection").className = "mWatchees";
        document.getElementById("postSection").className = "mJob";

        navBtns = document.getElementsByClassName("btnText");
        for (let i = 0; i < navBtns.length; i++) {
            navBtns[i].setAttribute("class", "smallBtnText");
        }


    } else {
        document.getElementById("newProfile").style.marginLeft = "25%";
        document.getElementById("newProfile").style.width = "50%";
        document.getElementById("newProfile").style.minWidth = "600px";
        document.getElementById("lurkForWork").hidden = false;
        document.getElementById("watcheeSection").className = "watchees";
        document.getElementById("postSection").className = "jobs";
        navBtns = document.getElementsByClassName("smallBtnText");
        for (let i = 0; i < navBtns.length; i++) {
            navBtns[i].setAttribute("class", "btnText");
        }

    }
    return curWidth;
}