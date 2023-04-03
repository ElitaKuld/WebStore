// Listen for Form Submit

document.getElementById("form").addEventListener("submit", saveDataToLocalStorage);

function saveDataToLocalStorage(e) {
    //Prevent form from submitting
    e.preventDefault();

    // Get form values
    let firstName = document.querySelector('#firstName').value;
    let lastName = document.querySelector('#lastName').value;
    let email = document.querySelector('#email').value;
    let phoneNumber = document.querySelector('#phoneNumber').value
    let address = document.querySelector('#address').value;
    let city = document.querySelector('#city').value;
    let zipCode = document.querySelector('#zipCode').value;
    let cardNumber = document.querySelector('#cardNumber').value;
    let expireDate = document.querySelector('#expireDate').value;
    let CVV = document.querySelector('#CVV').value;

    //Validate form
    if (!validateForm(firstName, lastName, email, phoneNumber, address, city, zipCode, cardNumber, expireDate, CVV)) {
        return false;
    }

    //Customer object
    let customerInfo = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        phoneNumber: phoneNumber,
        address: address,
        zipCode: zipCode,
        city: city,
        cardNumber: cardNumber,
        expireDate: expireDate,
        CVV: CVV
    }

    //Local Storage
    localStorage.setItem("customerInfo", JSON.stringify(customerInfo));
    window.open('confirmation.html', '_self'); // öppnas i samma tab
}

const setError = (element, message) => {
    const formControl = element.parentElement;
    // console.log(formControl) // kontroll
    const small = formControl.querySelector('small');
    small.innerHTML = message;
    small.style.display = "block";
}

const hideError = (element) => {
    const formControl = element.parentElement;
    const small = formControl.querySelector('small');
    small.style.display = "none";
}

// Validate Form
function validateForm(firstName, lastName, email, phoneNumber, address, city, zipCode, cardNumber, expireDate, CVV) {

    let isValidated = true;

    if (!firstName || !lastName || !email || !phoneNumber || !address || !city || !zipCode || !cardNumber || !expireDate || !CVV) {
        alert('Please fill in the form');
        return false;
    }

    /* TEST FUNKTION FÖR ATT KONTROLLERA OM NAMNET INNEHÅLLER BARA BOKSTÄVER. ACCEPTERARAR INTE DUBLA NAMN ("T.EX.: ANN-MARIE")
    //regex name
    //const namn = /^[a-zåäöçüûúùéêëèâäàåáïîìíæôöòóÿñ\s]+$/i;
    const regexN = new RegExp(namn);
    if (!firstName.match(regexN)) {
        alert('A name must only contain letters');
        return false;
    }*/

    if (firstName.length < 2 || firstName.length > 50) {
        //alert('A name must be between 2 and 50 characters long');
        setError(document.querySelector('#firstName'), "A first name should be min 2 letters and max 50 letters long")
        isValidated = false;
    }
    else {
        hideError(document.querySelector('#firstName'))
    }

    if (lastName.length < 2 || lastName.length > 50) {
        //alert('A name must be between 2 and 50 characters long and only contain letters');
        setError(document.querySelector('#lastName'), "A last name should be min 2 letters and max 50 letters long")
        isValidated = false;
    }
    else {
        hideError(document.querySelector('#lastName'))
    }

    if (!email.includes('@')) {
        //alert('Your email should include "@". Please type in a valid e-mail');
        setError(document.querySelector('#email'), "Your email should include '@'.")
        isValidated = false;
    }
    else {
        hideError(document.querySelector('#email'))
    }

    if (email.length > 50) {
        //alert('Your email should be max 50 characters long');
        setError(document.querySelector('#email'), "Your email should be max 50 characters long")
        isValidated = false;
    }

    //regex telephoneNumber
    //const telefonnummer = /^[(]?[0-9]{2}[)]?[-\s\.]?[0-9]{2}[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{2}[-\s\.]?[0-9]{2}$/im;
    const telefonnummer = /^[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g
    const regexTN = new RegExp(telefonnummer);

    if (!phoneNumber.match(regexTN)) {
        //alert('Your phone number can only contain numbers, - and (). Please type in a valid phone number');
        setError(document.querySelector('#phoneNumber'), "Your phone number can only contain numbers, - and (). Please type in a valid phone number")
        isValidated = false;
    }
    else {
        hideError(document.querySelector('#phoneNumber'))
    }

    if (address.length < 4 || address.length > 50) {
        //alert('Your address should be min 4 letters and max 50 letters long');
        setError(document.querySelector('#address'), "Your address should be min 4 letters and max 50 letters long")
        isValidated = false;
    }
    else {
        hideError(document.querySelector('#address'))
    }

    if (city.length < 4 || city.length > 50) {
        //alert('The city name should be min 2 letters and max 50 letters long');
        setError(document.querySelector('#city'), "The city name should be min 2 letters and max 50 letters long")
        isValidated = false;
    }
    else {
        hideError(document.querySelector('#city'))
    }

    //regex zip-code
    const postnummer = /^[0-9]{3}\s?[0-9]{2}$/;
    const regexPN = new RegExp(postnummer);
    if (!zipCode.match(regexPN) || zipCode.length < 6) {
        //alert('Enter zipcode by 6 sign with format 000 00');
        setError(document.querySelector('#zipCode'), "Enter zipcode by 6 sign with format 000 00")
        isValidated = false;
    }
    else {
        hideError(document.querySelector('#zipCode'))
    }

    return isValidated;
}