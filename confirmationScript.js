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

//funktion för att fylla i information om beställda produkter (från Local Storage)

function getProductsFromLocalStorage() {
    let products = JSON.parse(localStorage.getItem("products"));
    console.log(products) // kontroll

    let customer = JSON.parse(localStorage.getItem("customerInfo"));
    let shippingFee = customer.shippingFee.slice(0, customer.shippingFee.indexOf(" "))
    let totalt = customer.totalt.slice(0, customer.totalt.indexOf(" "))

    let amountOfProducts = 0
    let totalPrice = 0

    for (let i = 0; i < products.length; i++) {
        amountOfProducts += Number(products[i].quantity);
        totalPrice += products[i].quantity * products[i].price;
    }

    let output = "";
    for (let i = 0; i < products.length; i++) {
        output += "<tr><td><div id='product-image'><img src=" + products[i].image + " alt='Produkt bild' id='demo-image'></div></td><td>" + products[i].title + "</td><td>" + products[i].id + "</td><td>"+ products[i].quantity + "</td><td>" + getPriceWithoutMoms(products[i].price) + "</td><td>25%</td><td>" + getMoms(products[i].price) + "</td><td>" + products[i].price + "</td></tr>"
    }
    output += "<tr id='fraktavgift-rad'><td></td><td></td><td>Fraktavgift:</td><td>1</td><td>" + getPriceWithoutMoms(shippingFee) + "</td><td>25%</td><td>" + getMoms(shippingFee) + "</td><td>" + shippingFee + "</td></tr>"

    output += "<tr id='sammanfattning-rad'><td></td><td></td><td id='totalt-bold'>Totalt:</td><td id='amount-bold'>" + amountOfProducts + "</td><td id='pwm-bold'>" + getPriceWithoutMoms(totalt) + "</td><td id='momss-bold'>25%</td><td id='moms-bold'>" + getMoms(totalt) + "</td><td id='price-bold'>" + totalt + "</td></tr>"
    document.getElementById("product-info").innerHTML = output;
}

getProductsFromLocalStorage();

//Funktion för att räkna ut pris utan moms:
function getPriceWithoutMoms(price) {
    return (price * 0.75).toFixed(2);
}

//Funktion för att räkna ut moms:
function getMoms(price) {
    return (price * 0.25).toFixed(2);
}

//--------------------------------------------------------------------------------------------------------------------------------------------------------------
function getCustomerFromLocalStorage() {
    let customer = JSON.parse(localStorage.getItem("customerInfo"));
    console.log(customer);

    document.getElementById("customer-info").innerHTML = "<div><h5 style='text-decoration: underline'>Kunduppgifter:</h5><p>E-postadress: <i>" + customer.email + "</i></p><p>Mobiltelefon: <i>" +
        customer.phoneNumber + "</i></p><p>Kundtyp: <i>Privatperson</i></p></div><br><div><h5 style='text-decoration: underline'>Leveransadress:</h5><p><i>" + customer.firstName + " " + customer.lastName + "</i></p><p><i>" + customer.address + "</i></p><p><i>" + customer.zipCode + " " + customer.city + "</i></p></div>"
}

getCustomerFromLocalStorage();

//------------------------------------------------------------------------------------------------------------------------------------------------------
//Tömma Local Storage:
window.onload = function()
{
    let products = JSON.parse(localStorage.getItem("products"));
    products.length = 0;
    localStorage.setItem("products", JSON.stringify(products));

    let productId = JSON.parse(localStorage.getItem("productId"));
    productId = 0;
    localStorage.setItem("productId", JSON.stringify(productId));

    let customer = JSON.parse(localStorage.getItem("customerInfo"));
    customer = null;
    localStorage.setItem("customerInfo", JSON.stringify(customer));
}