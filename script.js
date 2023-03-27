const months = [
    "januari",
    "februari",
    "mars",
    "april",
    "maj",
    "juni",
    "juli",
    "augusti",
    "september",
    "oktober",
    "november",
    "december",
];

let dateToday = new Date().getDate();
let monthNumber = new Date().getMonth();
let month = months[monthNumber];
let year = new Date().getFullYear();


function showTheDate() {
    document.getElementById("date").innerHTML = dateToday + " " + month + " " + year;console.log(dateToday + " " + month + " " + year);
}

showTheDate();