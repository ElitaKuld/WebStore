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
    console.log(products)
    let output = "";
    for (let i = 0; i < products.length; i++) {
        output += "<tr><td><div id='product-image'><img src=" + products[i].image + " alt='Produkt bild' id='demo-image'></div></td><td>" + products[i].title + "</td><td>" + products[i].id + "</td><td>"+ products[i].quantity + "</td><td>" + getPriceWithoutMoms(products[i].price) + "</td><td>25%</td><td>" + getMoms(products[i].price) + "</td><td>" + products[i].price + "</td></tr>"
    }
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

/* TEST INFORMATION OCH METODER:
const customer = {
    fullName: "Winnie the Pooh",
    email: "winnie@honey.com",
    phoneNumber: "(46)72-123 12 12",
    address: "Hundred Acre Wood 12",
    city: "Forest",
    zipCode: "123 45"
}

function showCustomerInfo(customer) {
    document.getElementById("customer-info").innerHTML = "<h5>Kunduppgifter:</h5><p>E-postadress: " + customer.email + "</p><p>Mobiltelefon: " +
        customer.phoneNumber + "</p><p>Kundtyp: Privatperson</p><h5>Leveransadress:</h5><p>" + customer.fullName + "</p><p>" + customer.address +
        "</p><p>" + customer.zipCode + " " + customer.city + "</p>"
}

showCustomerInfo(customer);*/

function getCustomerFromLocalStorage() {
    let customer = JSON.parse(localStorage.getItem("customerInfo"));
    console.log(customer);

    document.getElementById("customer-info").innerHTML = "<div><h5 style='text-decoration: underline'>Kunduppgifter:</h5><p>E-postadress: <i>" + customer.email + "</i></p><p>Mobiltelefon: <i>" +
        customer.phoneNumber + "</i></p><p>Kundtyp: <i>Privatperson</i></p></div><br><div><h5 style='text-decoration: underline'>Leveransadress:</h5><p><i>" + customer.firstName + " " + customer.lastName + "</i></p><p><i>" + customer.address + "</i></p><p><i>" + customer.zipCode + " " + customer.city + "</i></p></div>"
}

getCustomerFromLocalStorage();

//------------------------------------------------------------------------------------------------------------------------------------------------------