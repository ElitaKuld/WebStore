
const form = document.querySelector('#form');
const firstName = document.querySelector('#firstName');
const lastName = document.querySelector('#lastName');
const email = document.querySelector('#email');


form.addEventListener('submit', (event) => {
    event.preventDefault();
    checkInputs();
    console.log("Success")
})

const checkInputs = () => {

    const fistNameValue = firstName.value.trim()
    console.log(fistNameValue)
    if (fistNameValue.length >= 2 && firstNameValue.length <= 50) {

        setSuccess(firstName)
    } else {
        console.log(firstName)
        setError(firstName, 'Your name should be min 2 letter and max 50 letter')
    }


    const emailValue = email.value.trim()
    console.log(emailValue)

    if (emailValue.includes('@') && emailValue.length <= 50){
        setSuccess(email)
    }else {
        console.log(email)
        setError(email, 'Your email should include @ and be max 50 letter')
    }

}

const setError = (input, message) => {
    const formControl = input.parentElement
    console.log(formControl)
    const small = formControl.querySelector('small')

    formControl.className = 'form-control error'
    small.innerText = message
}
const setSuccess = (input) => {
    const formControl = input.parentElement
    formControl.className = 'form-control success'
}