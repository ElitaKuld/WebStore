let form = document.querySelector('#form');
let firstName = document.querySelector('#firstName');
let lastName = document.querySelector('#lastName');
let email = document.querySelector('#email');
let phoneNumber = document.querySelector('#phoneNumber');
let adress = document.querySelector('#adress');
let city = document.querySelector('#city');
let zipCode = document.querySelector('#zipCode');
let cardNumber = document.querySelector('#cardNumber');
let expireDate = document.querySelector('#expireDate');
let CVV = document.querySelector('#CVV');
let resultOfCheck = true;

const setError = (input) => {
    const formControl = input.parentElement
    console.log(formControl)
    const small = formControl.querySelector('small')
    small.style.display = "block"
    resultOfCheck = false
}
const setSuccess = (input) => {
    const formControl = input.parentElement
    formControl.className = 'form-control'
    console.log('success')
}


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
    if (emailValue.includes('@') && emailValue.length <= 50) {
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
        if (phoneNumberValue.includes('!"#¤%&/=?@£$€')) {
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

    const expirationValue = expireDate.value.trim()
    console.log(expirationValue)

    if (expirationValue === '') {
        setError(expireDate)
    } else {
        setSuccess(expireDate)
    }

    const CVVValue = CVV.value.trim()
    console.log(CVVValue)

    if (CVVValue === '') {
        setError(CVV)
    } else {
        setSuccess(CVV)
    }
}

function saveDataToLocalStorage(firstName, lastName, email, phoneNumber, adress, zipCode, city, cartNumber, expireDate, CVV) {
    checkInputs();
    if (resultOfCheck) {
        let customerInfo =
            {
                firstName: firstName,
                lastName: lastName,
                email: email,
                phoneNumber: phoneNumber,
                adress: adress,
                zipCode: zipCode,
                city: city,
                cartNumber: cartNumber,
                expireDate: expireDate,
                CVV: CVV
            }
        localStorage.setItem("customerInfo", JSON.stringify(customerInfo));
        alert("Everything is correct " + resultOfCheck)
        window.open('confirmation.html', '_self');

    }

}
