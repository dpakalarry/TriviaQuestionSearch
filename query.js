// var site = " http://jservice.io/api/random?count=2";
var site = " http://jservice.io/api/categories/?count=100";
// var request = new XMLHttpRequest();
// request.open("GET", site, true);
// var j = 5;
// var Json = getJSON(site)
// console.log(Json)
// console.log(Json)

function parseJSON(promise){
    promise.then(response=>response.json())
    .then(data=> {
        // console.log(data);
        var table = document.getElementsByName("qRes")[0];
        var tabLen = table.rows.length;
        console.log(tabLen);
        for(var i = 1; i < tabLen; i++){
            table.deleteRow(-1);
        }
        

        for(var q in data){
            console.log(data[q]);
            var row = table.insertRow(1);
            
            var date = row.insertCell(0);
            var category = row.insertCell(1);
            var quest = row.insertCell(2);
            var answ = row.insertCell(3);
            var save = row.insertCell(4);

            const actDate = new Date(data[q].airdate)

            date.innerHTML = "<h6>"+ actDate.toLocaleDateString() + "</h6>";
            category.innerHTML = "<h6>"+ data[q].category.title + "</h6>";
            quest.innerHTML = "<h6>"+ data[q].question + "</h6>";
            answ.innerHTML = "<h6>"+ data[q].answer + "</h6>";
            save.innerHTML = "<input type = \"checkbox\">";
        }
    });
}


function getJSON(site){
    // var Json;
    const resp = fetch(site);
    return resp;
    // const j = resp.json();
    // console.log(JSON.stringify(j));
}


function validateForm(numRes = 100) {
    var curDate = new Date();
    var maxDate = document.getElementsByName("dateMax")[0].value;
    var minDate = document.getElementsByName("dateMin")[0].value;
    var price = document.getElementsByName("val")[0].value;
    var cat = document.getElementsByName("catID")[0].value;

    console.log(curDate);
    console.log(maxDate);
    console.log(minDate);
    console.log(price);
    console.log(cat);

    if(maxDate != null && minDate != null && maxDate < minDate){
        alert("Date End is before Date Begin! Please try again.")
        document.getElementsByName("dateMax")[0].focus();
        // document.search.dateMax.focus();
        return false;
    } 
    if(minDate != null && curDate < minDate){
        alert("Date Begin is after today! Please try again.")
        document.getElementsByName("dateMin")[0].focus();
        return false;
    } 
    if(numRes != 100 && maxDate == "" && minDate == "" && price == "" && cat == ""){
        alert("No fields were filled out");
        document.getElementsByName("dateMin")[0].focus();
        return false;
    }
    var site = "http://jservice.io/api/"
    if(numRes == 100){
        site += "clues/?";
        if(price != ""){
            site += "value=" + price + "&"
        }
        if(cat != ""){
            site += "category=" + cat + "&"
        }
        if(minDate != ""){
            site += "min_date=" + minDate + "&"
        }
        if(maxDate != ""){
            site += "max_date=" + maxDate + "&"
        }
        site = site.substr(0,site.length-1);
    } else{
        site += "random/?count=1"
    }
    
    console.log(site);
    var prom = getJSON(site);
    parseJSON(prom)
    // console.log(Json);


}


window.addEventListener('keyup', function(event) {
    if (event.keyCode === 13) {
      validateForm();
    }
  });