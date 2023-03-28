const startDateLength = 10;

// creates a job Post in desktop mode
function createJobPost(){
    let title = document.getElementById("jobTitle").value;
    let description = document.getElementById("jobDescription").value;
    let startDate = document.getElementById("jobStartDate").value;

    if (startDate.length != startDateLength){
		document.getElementById("badFormat").hidden = false;
		return;
    }
	fetch("http://localhost:5005/job", {
		body: '{"title": "'+title+'","image": "'+uploadImg+'","start": "'+startDate+'","description": "'+description+'"}',
		headers: {
			Authorization : sessionStorage.getItem("userToken"),
			Accept: "application/json",
			"Content-Type": "application/json"
		},
		method: "POST"
	})  
	document.getElementById("jobTitle").value = "";
	document.getElementById("jobDescription").value = "";
	document.getElementById("jobStartDate").value = "";
	document.getElementById("jobImg").value = "";
	document.getElementById("postResult").hidden = false;
	document.getElementById("badFormat").hidden = true;
}


// creates a job Post in mobile mode
function createJobPostMobile(){
    let title = document.getElementById("jobTitleMobile").value;
    let description = document.getElementById("jobDescriptionMobile").value;
    let startDate = document.getElementById("jobStartDateMobile").value;
    if (startDate.length != startDateLength){
        document.getElementById("badFormatMobile").hidden = false;
        return;
    }

  fetch("http://localhost:5005/job", {
      body: '{"title": "'+title+'","image": "'+uploadImg+'","start": "'+startDate+'","description": "'+description+'"}',
      headers: {
        Authorization : sessionStorage.getItem("userToken"),
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      method: "POST"
  })  
    document.getElementById("jobTitleMobile").value = "";
    document.getElementById("jobDescriptionMobile").value = "";
    document.getElementById("jobStartDateMobile").value = "";
    document.getElementById("jobImg").value = "";
    document.getElementById("postResultMobile").hidden = false;
    document.getElementById("badFormatMobile").hidden = true;
}

// covert img to base 64 data
function handleImgJob(element){
    let file = element.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = function() {
        uploadImg = reader.result;
    }
}
