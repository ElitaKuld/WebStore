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

const dateToday = new Date().getDate();
const monthNumber = new Date().getMonth();
const month = months[monthNumber];
const year = new Date().getFullYear();

//funktion som visar beställningens datum
function showTheDate() {
    document.getElementById("date").innerHTML = dateToday + " " + month + " " + year; console.log(dateToday + " " + month + " " + year);
}

showTheDate();

//--------------------------------------------------------------------------------------------------------------------------------------------------------------

//räknare-funktion för att sätta ordernummer:
function showOrderNumber() {
    const today = new Date();
    const counter = today.getFullYear() + "" + (today.getMonth() + 1) + "" + today.getDate() + "" + today.getHours() + "" + today.getMinutes() + "" + today.getSeconds();
    console.log(counter)
    document.getElementById("oderNumber").innerHTML = "Ditt ordernummer: " + counter;
}

showOrderNumber();

//--------------------------------------------------------------------------------------------------------------------------------------------------------------

//funktion för att testa att fylla i information om en beställd produkt
function loadAPI() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "https://webacademy.se/fakestore/");
    xhr.send();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log(xhr.response); // OBS! En sträng
            const json = JSON.parse(xhr.response);
            console.log(json);
            renderAPI(json);
        }
    };
}

//getting from Victor's/Bahareh's pages (from local storage)

function renderAPI(json) {
    const randomProduct = Math.round(Math.random()*20);
    console.log(randomProduct)
    const product = {
        id: json[randomProduct].id,
        title: json[randomProduct].title,
        description: json[randomProduct].description,
        image: json[randomProduct].image,
        price: json[randomProduct].price,
        category: json[randomProduct].category
    }

    console.log(product);
    document.getElementById("product-image").innerHTML = "<img src=" + product.image + " class='img-fluid img-thumbnail' alt='Produkt bild' id='demo-image'/>"
    document.getElementById("product-info").innerHTML = "<tr><td>" + product.title + "</td><td>" + product.id + "</td><td>1</td><td>" + getPriceWithoutMoms(product.price) + "</td><td>25%</td><td>" + getMoms(product.price) + "</td><td>" + product.price + "</td></tr>"
}

loadAPI();

//Funktion för att räkna ut pris utan moms:
function getPriceWithoutMoms(price) {
    return (price * 0.75).toFixed(2);
}

//Funktion för att räkna ut moms:
function getMoms(price) {
    return (price * 0.25).toFixed(2);
}

//--------------------------------------------------------------------------------------------------------------------------------------------------------------

// Getting from Bahareh's page
const customer = {
    fullName: "Winnie the Pooh",
    email: "winnie@honey.com",
    phoneNumber: "(46)72-123 12 12",
    address: "Hundred Acre Wood 12",
    city: "Forest",
    zipCode: "123 45"
}

function showCustomerInfo(customer){
    document.getElementById("customer-info").innerHTML = "<h5>Kunduppgifter</h5><p>E-postadress: " + customer.email + "</p><p>Mobiltelefon: " +
    customer.phoneNumber + "</p><p>Kundtyp: Privatperson</p><h5>Leveransadress:</h5><p>" + customer.fullName+"</p><p>" + customer.address +
    "</p><p>" + customer.zipCode +" " + customer.city + "</p>"
}

showCustomerInfo(customer);