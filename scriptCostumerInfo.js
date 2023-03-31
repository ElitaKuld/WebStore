

let customerInformation = [];
const addCustomer = (event) => {
    event.preventDefault();
    checkInputs();
    console.log("Success")


    let AddCustomerInformation = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        phoneNumber: document.getElementById('phoneNumber').value,
        email: document.getElementById('email').value,
        adress: document.getElementById('adress').value,
        city: document.getElementById('city').value,
        zipCode: document.getElementById('zipCode').value,
        cardNumber: document.getElementById('cardNumber').value,
        expireDate: document.getElementById('expireDate').value,
        cvvNumber: document.getElementById('cvvNumber').value,
    }
    customerInformation.push(AddCustomerInformation);
    document.querySelector('form').reset();

    console.warn('added', {customerInformation});
    let form = document.querySelector('#form');
    form.textContent = JSON.stringify(customerInformation, 10);
}
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('btn').addEventListener('click', addCustomer)
});

localStorage.setItem("Obj", JSON.stringify())

form = localStorage.getItem("form");
console.log("form");

firstName = localStorage.getItem("firstName");
console.log("firstName");

lastName = localStorage.getItem("lastName");
console.log("lastName");

email = localStorage.getItem("email");
console.log("email");

city = localStorage.getItem("phoneNumber");
console.log("phoneNumber");

adress = localStorage.getItem("adress");
console.log("adress");

city = localStorage.getItem("city");
console.log("city");

zipCode = localStorage.getItem("zipCode");
console.log("zipCode");

cardNumber = localStorage.getItem("cardNumber");
console.log("cardNumber");

expireDate = localStorage.getItem("expireDate");
console.log("expireDate");

cvvNumber = localStorage.getItem("cvvNumber");
console.log("cvvNumber");


for (let i = 0; i < localStorage.length; i++) {
    console.log(localStorage.key(i))
}

/*localStorage.removeItem("firstName");
localStorage.clear();
console.log(localStorage);*/


function saveCustomerInfoToLocalStorage (customerInformation) {
    let customer = {
        firstName: customerInformation.firstName,
        lastName: customerInformation.lastName,
        email: customerInformation.email,
        phoneNumber: customerInformation.phoneNumber,
        adress: customerInformation.adress,
        zipCode: customerInformation.zipCode,
        city: customerInformation.city,
        cardNumber: customerInformation.cardNumber,
        expireDate: customerInformation.expireDate,
        cvvNumber: customerInformation.cvvNumber,
    }
    console.log(customer)
    localStorage.setItem("customer", JSON.stringify(customer))
}

const submitButton = document.getElementById("order-button");

submitButton.addEventListener('submit', () => {
    console.log("Success")
    window.open('confirmation.html', '_self');
});