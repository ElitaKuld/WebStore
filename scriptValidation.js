let form = document.querySelector('#form');
let firstName = document.querySelector('#firstName');
let lastName = document.querySelector('#lastName');
let email = document.querySelector('#email');
let phoneNumber = document.querySelector('#phoneNumber')
let adress = document.querySelector('#adress')
let city = document.querySelector('#city')
let zipCode = document.querySelector('#zipCode')
let cardNumber = document.querySelector('#cc-number')
let expireDate = document.querySelector('#expireDate')
let cvvNumber = document.querySelector('#cvvNumber')

const checkInputs = () => {

    const firstNameValue = firstName.value.trim()
    console.log(firstNameValue)
    if (firstNameValue.length >= 2 && firstNameValue.length <= 50) {
        setSuccess(firstName)
    } else {
        console.log(firstName)
        setError(firstName)
    }


    const lastNameValue = lastName.value.trim()
    console.log(lastNameValue)
    if (lastNameValue.length >= 2 && lastNameValue.length <= 50) {
        setSuccess(lastName)
    } else {
        console.log(lastName)
        setError(lastName)
    }


    const emailValue = email.value.trim()
    console.log(emailValue)
    if (emailValue.includes('@')) {
        setSuccess(email)
    } else {
        console.log(email)
        setError(email)
    }


    const phoneNumberValue = phoneNumber.value.trim()
    console.log(phoneNumberValue)
    if (phoneNumberValue.includes('0123456789')) {
        setSuccess(phoneNumber)
        if (phoneNumberValue.includes('-') || phoneNumberValue.includes('()')) {
            setSuccess(phoneNumber)
        }
        if (phoneNumberValue.isNull() || phoneNumberValue.length == 0) {
            setError(phoneNumber)
        }
    }


    const adressValue = adress.value.trim()
    console.log(adressValue)
    if (adressValue.length >= 4 && adressValue.length <= 50) {
        setSuccess(adress)
    } else {
        setError(adress)
    }


    const cityValue = city.value.trim()
    console.log(cityValue)
    if (cityValue.length >= 2 && cityValue.length <= 50) {
        setSuccess(city)
    } else {
        setError(city)
    }


    const zipCodeValue = zipCode.value.trim()
    console.log(zipCodeValue)
    if (zipCodeValue.length == 6) {
        setSuccess(zipCode)
    } else {
        setError(zipCode)
    }


    const cardNumberValue = cardNumber.value.trim()
    console.log(cardNumberValue)
    if (cardNumberValue === '') {
        setError(cardNumber)
    } else {
        setSuccess(cardNumber)
    }


    const expirationValue = expiration.value.trim()
    console.log(expiration)

    if (expirationValue === '') {
        setError(expiration)
    } else {
        setSuccess(expiration)
    }

    const cvvNumberValue = cvv.value.trim()
    console.log(cvvNumber)

    if (cvvNumberValue === '') {
        setError(cvvNumber)
    } else {
        setSuccess(cvvNumber)
    }
}

const setError = (input) => {
    const formControl = input.parentElement
    console.log(formControl)
    const small = formControl.querySelector('small')
    small.style.display = "block"

}

const setSuccess = (input) => {
    const formControl = input.parentElement
    formControl.className = 'form-control success'
}


const customerInformation = [];
form.addEventListener('submit', (event) => {
    event.preventDefault();
    checkInputs();
    console.log("Success")

    const AddCustomerInformation = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        email: document.getElementById('email').value,
        adress: document.getElementById('adress').value,
        city: document.getElementById('city').value,
        phoneNumber: document.getElementById('phoneNumber').value,
        zipCode: document.getElementById('zipCode').value,
        cardNumber: document.getElementById('cardNumber').value,
        expiration: document.getElementById('expireDate').value,
        cvvNumber: document.getElementById('cvvNumber').value
    }
    customerInformation.push(AddCustomerInformation)
    document.forms[0].reset();

    console.warn('added', {customerInformation});
    let pre = document.querySelector('#form');
    form.textContent = JSON.stringify(customerInformation, 10);
})
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('btn').addEventListener('click', addEventListener)
})