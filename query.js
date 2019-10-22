// var site = " http://jservice.io/api/random?count=2";
var site = " http://jservice.io/api/categories";
// var request = new XMLHttpRequest();
// request.open("GET", site, true);
var Json = getJSON(site)
// console.log(Json)




function getJSON(site){
    fetch(site)
    .then(response => {
        return response.json()
    })
    .then(data=> {
        console.log(data)
    })
    .catch(err =>{
        console.log("ERROR")
    })
    return null;
}