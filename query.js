function showAnswer(id, answer){
    document.getElementById(id).innerHTML = answer;
}

//Takes the JSON in the promise and writes to the table below the form appropriately
function parseJSON(promise, hAnswer = false, numRes){
    promise.then(response=>response.json())
    .then(data=> {
        var table = document.getElementsByName("qRes")[0];
        var tabLen = table.rows.length;
        //Clears rows from table if there existed items before
        for(var i = 1; i < tabLen; i++){
            table.deleteRow(-1);
        }
        
        //If there was no data read from the api
        if(data.length == 0){
            var row = table.insertRow(1);
            var err = row.insertCell(0);
            err.innerHTML = "<h6> No Questions were found with your parameters, please try again.</h6>";
            
        }
        var minLen = (data.length < numRes) ? data.length : numRes;
        for(var q = 0; q < minLen; q++){
            var row = table.insertRow(1);
            
            var date = row.insertCell(0);
            var category = row.insertCell(1);
            var categoryID = row.insertCell(2);
            var value = row.insertCell(3);
            var quest = row.insertCell(4);
            var answ = row.insertCell(5);

            const actDate = new Date(data[q].airdate)

            date.innerHTML = "<h6>"+ actDate.toLocaleDateString() + "</h6>";
            category.innerHTML = "<h6>"+ data[q].category.title + "</h6>";
            categoryID.innerHTML = "<h6>"+ data[q].category_id + "</h6>";
            value.innerHTML = "<h6>"+ data[q].value + "</h6>";
            quest.innerHTML = "<h6>"+ data[q].question + "</h6>";
            
            //To hide the answer
            if(hAnswer){
                //Need to scrub the answer for " characters, replacing them with '
                var scrubbedAnswer = "";
                for(var let in data[q].answer){
                    scrubbedAnswer += (data[q].answer[let] == '\"')? "\\\'" : data[q].answer[let];
                }
                
                var answHtml = "<h6><label id = \"answ" + q + "\" onclick = \"showAnswer('answ" + q + "','"+ scrubbedAnswer+"')\">"
                for(var i = 0; i < data[q].answer.length; i++){
                    answHtml += "-";
                }
                
                answ.innerHTML = answHtml + "</label></h6>";
            } else{
                answ.innerHTML = "<h6>"+ data[q].answer + "</h6>";
            }
            
        }
    });
}

//Takes the site to request from and returns a promise object which contains the JSON data
function getJSON(site){
    // var Json;
    const resp = fetch(site);
    return resp;
}


//Validates the form on the search page
function validateForm(numRes = 100) {
    var curDate = new Date();
    var maxDate = document.getElementsByName("dateMax")[0].value;
    var minDate = document.getElementsByName("dateMin")[0].value;
    var price = document.getElementsByName("val")[0].value;
    var cat = document.getElementsByName("catID")[0].value;
    var hide = document.getElementById("hAnswer").checked;


    if(maxDate == "" && minDate != ""){
        alert("Date Begin needs to be paired with a Date End.")
        document.getElementsByName("dateMax")[0].focus();
        return false;
    }
    if(maxDate != "" && minDate == ""){
        alert("Date Begin needs to be paired with a Date End.")
        document.getElementsByName("dateMin")[0].focus();
        return false;
    }
    //Need to funnel http through https proxy
    var site = "https://cors-anywhere.herokuapp.com/http://jservice.io/api/"
    if(maxDate == "" && minDate == "" && price == "" && cat == ""){
        if(numRes == 100){
            alert("No fields were filled out");
            document.getElementsByName("dateMin")[0].focus();
            return false;
        }
        site += "random/?count=1";
    }else {
        site += "clues/?";
        if(price != ""){
            site += "value=" + price + "&";
        }
        if(cat != ""){
            site += "category=" + cat + "&";
        }
        if(minDate != ""){
            site += "min_date=" + minDate + "&";
        }
        if(maxDate != ""){
            site += "max_date=" + maxDate + "&";
        }
        site = site.substr(0,site.length-1);
    }
    
    var prom = getJSON(site);
    parseJSON(prom, hide, numRes);

}

//Binds Enter to call the validateForm() function
window.addEventListener('keydown', function(event) {
    if (event.keyCode === 13) {
      validateForm();
    }
  });

