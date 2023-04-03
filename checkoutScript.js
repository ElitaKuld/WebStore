// Listen for Form Submit
document.getElementById("form").addEventListener("submit", saveDataToLocalStorage);

function saveDataToLocalStorage(e) {
    //Prevent form from submitting
    e.preventDefault();

    // Get form values
    let firstName = document.getElementById('firstName').value;
    let lastName = document.getElementById('lastName').value;
    let email = document.getElementById('email').value;
    let phoneNumber = document.getElementById('phoneNumber').value
    let address = document.getElementById('address').value;
    let city = document.getElementById('city').value;
    let zipCode = document.getElementById('zipCode').value;
    let cardNumber = document.getElementById('cardNumber').value;
    let expireDate = document.getElementById('expireDate').value;
    let CVV = document.getElementById('CVV').value;

    //Validate form
    if (!validateForm(firstName, lastName, email, phoneNumber, address, city, zipCode, cardNumber, expireDate, CVV)) {
        return false;
    }

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

// Validate Form
function validateForm(firstName, lastName, email, phoneNumber, address, city, zipCode, cardNumber, expireDate, CVV) {

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
        let fName = document.querySelector('#firstName');
        const formControl = fName.parentElement;
        console.log(formControl);
        const small = formControl.querySelector('small')
        small.style.display = "block"
        return false;
    }

    if (lastName.length < 2 || lastName.length > 50) {
        alert('A name must be between 2 and 50 characters long and only contain letters');
        return false;
    }

    if (!email.includes('@')) {
        alert('Your email should include "@". Please type in a valid e-mail');
        return false;
    }

    if (email.length > 50) {
        alert('Your email should be max 50 characters long');
        return false;
    }

    //regex telephoneNumber
    //const telefonnummer = /^[(]?[0-9]{2}[)]?[-\s\.]?[0-9]{2}[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{2}[-\s\.]?[0-9]{2}$/im;
    const telefonnummer = /^[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g
    const regexTN = new RegExp(telefonnummer);

    if (!phoneNumber.match(regexTN)) {
        alert('Your phone number can only contain numbers, - and (). Please type in a valid phone number');
        return false;
    }

    if (address.length < 4 || address.length > 50) {
        alert('Your address should be min 4 letters and max 50 letters long');
        return false;
    }

    if (city.length < 4 || city.length > 50) {
        alert('The city name should be min 2 letters and max 50 letters long');
        return false;
    }

    //regex zip-code
    const postnummer = /^[0-9]{3}\s?[0-9]{2}$/;
    const regexPN = new RegExp(postnummer);
    if (!zipCode.match(regexPN) || zipCode.length < 6) {
        alert('Enter zipcode by 6 sign with format 000 00');
        return false;
    }

    return true;
}