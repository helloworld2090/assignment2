// this is mainly the navigation and popup logic for the Navbar 

function navToFeed(){
    window.location.href = 'HomePage.html#feed='+sessionStorage.getItem('id')+'';
}

function navToMyProfile(){
    let urlFragment = window.location.hash;
    const myArray = urlFragment.split("=");
    let curLocation =  myArray[0];

    if(curLocation == "#profile"){
        window.location.href = 'ProfilePage.html#profile='+sessionStorage.getItem('id')+'';
        location.reload();
    } else {
        window.location.href = 'ProfilePage.html#profile='+sessionStorage.getItem('id')+'';
    }
}

function openWatchModal(){
    document.getElementById('watchModal').style.display='block';   
    document.getElementById('addPostModal').style.display='none'
}

function openPostModal(){
    document.getElementById('addPostModal').style.display='block';
    document.getElementById('watchModal').style.display='none'
}

function openWatchModalMobile(){
    document.getElementById('watchModalMobile').style.display='block';   
}

function openPostModalMobile(){
    document.getElementById('addPostModalMobile').style.display='block';   
}


function hideNotifications(){
    document.getElementById("notifications").hidden = true;
}
  
function showNotifactions(){
    let notifications = document.getElementById("notifications");
    if (window.getComputedStyle(notifications).display === "none") {
        notifications.hidden = false;
    } else {
        notifications.hidden = true;
    }
}

function showNotifactionsMobile(){
    let notifications = document.getElementById("mobileNotifications");
    if (window.getComputedStyle(notifications).display === "none") {
        notifications.hidden = false;
    } else {
        notifications.hidden = true;
    }
}

function hideNotificationsMobile(){
    document.getElementById("mobileNotifications").hidden = true;
}