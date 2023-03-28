// date calculations, converts it to dd/mm/yyyy
function getDate(dateObject){
    let dateArr = dateObject.split("-");
    let day = dateArr[2].slice(0,2);
    let month = dateArr[1];
    let year = dateArr[0];
    let dateString = day +"/"+month+"/"+year;
    return dateString;
}


//function to calculate createdBy date
function calculateDate(dateObject){
  //let newFormat = getDate(dateObject);
    let dateArr = dateObject.split("T");
    let utc0Time = dateArr[1];
    let utc0Hr = utc0Time.slice(0,2);
    let utc11Hr = parseInt(utc0Hr) +11;
    let utc11Min = utc0Time.slice(3,5);

    let resDate = dateArr[0]
    let yy = parseInt(resDate.slice(0,4));
    let mm = parseInt(resDate.slice(5,7));
    let dd = parseInt(resDate.slice(8,10));

    let today = new Date();
    let dateString;
  
    if (utc11Hr >= 24){
        dd += 1;
        utc11Hr +=-24;
        if (dd == parseInt(today.getDate())
            && mm == parseInt(today.getMonth() + 1)
            && yy == parseInt(today.getFullYear())
        ){
            return lessThan24Hrs(utc11Hr, utc11Min);
        //console.log("less than 24 hours ago");
        } else {
            dateString = dd +"/"+mm+"/"+yy;
            return dateString
        }   
    } else if (dd == parseInt(today.getDate()) 
        && mm == parseInt(today.getMonth() + 1)
        && yy == parseInt(today.getFullYear())
    ){
        return lessThan24Hrs(utc11Hr, utc11Min);
    } else {
        dateString = dd +"/"+mm+"/"+yy;
        return dateString
    }
}

  // post was created less than 24 hours - show hr/min instead
function lessThan24Hrs(hr, min){
    let today = new Date();
    let deltaHr = parseInt(today.getHours())- hr;
    let deltaMin;
    if (deltaHr == 0){
        deltaMin = parseInt(today.getMinutes()) - min;
        min = today.getMinutes() - min;
    } else{
        deltaMin = (60 - min) + deltaHr * today.getMinutes();
        if (today.getMinutes() <= min){
            deltaHr +=-1;
        }
        min = 60 - min + today.getMinutes();
        min = min % 60;
    }
    let dateString = deltaHr + "hrs " + min + " mins ago"
    return dateString
}
