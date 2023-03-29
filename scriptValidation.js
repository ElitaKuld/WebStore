
const error = document.querySelector('#error');
const form = document.querySelector('#form');
const firstName = document.querySelector('#firstName');
const lastName = document.querySelector('#lastname');
const email = document.querySelector('#email');
const adress = document.querySelector('#address')
const city = document.querySelector('#city')
const phoneNumber = document.querySelector('#phoneNumber')
const zipCode = document.querySelector('#zip-code')
const cardNumber = document.querySelector('#cc-number')
const expiration = document.querySelector('#expire-date')
const cvv = document.querySelector('#cvvNumber')

form.addEventListener('submit', (event) => {
    event.preventDefault();
    checkInputs();
    console.log("Success")
})

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
    if (emailValue.includes('@')){
        setSuccess(email)
    }else {
        console.log(email)
        setError(email, )
    }


    const phoneNumberValue = phoneNumber.value.trim()
    console.log(phoneNumberValue)
    if (phoneNumberValue.includes('0123456789') && phoneNumberValue.includes('-') && phoneNumberValue.includes('()')){
        setSuccess(phoneNumber)
    }else {
        setError(phoneNumber)
    }


    const adressValue = adress.value.trim()
    console.log(adressValue)
    if (adressValue.length >= 4 && adressValue.length <= 50){
        setSuccess(adress)
    } else {
        setError(adress)
    }


    const cityValue = city.value.trim()
    console.log(cityValue)
    if (cityValue.length >= 2 && cityValue.length <= 50) {
        setSuccess(city)
    } else {
        setError(city, 'Your city name should be min 2 letter and max 50 letter')
    }


    const zipCodeValue = zipCode.value.trim()
    console.log(zipCodeValue)
    if (zipCodeValue.length == 5){
        setSuccess(zipCode)
    } else {
        setError(zipCode)
    }


    const cardNumberValue = cardNumber.value.trim()
    console.log(cardNumberValue)
    if (cardNumberValue === '') {
        setError(cardNumber, 'Please enter your card number')
    } else {
        setSuccess(cardNumber)
    }


    const expirationValue = expiration.value.trim()
    console.log(expiration)

    if (expirationValue === '') {
        setError(expiration, 'Please enter card expiration date')
    } else {
        setSuccess(expiration)
    }
}

const setError = (input) => {
    const formControl = input.parentElement
    console.log(formControl)
    const small = formControl.querySelector('small')
    small.style.display="block"

}
const setSuccess = (input) => {
    const formControl = input.parentElement
    formControl.className = 'form-control success'
}