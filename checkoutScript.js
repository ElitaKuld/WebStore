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

    if (firstName.length < 2 || firstName.length > 50) {
        alert('Your first name should be min 2 letters and max 50 letters long');
        return false;
    }

    if (lastName.length < 2 || lastName.length > 50) {
        alert('Your last name should be min 2 letters and max 50 letters long');
        return false;
    }


    if (!email.includes('@')) {
        alert('Your email should include "@"');
        return false;
    }

    if (email.length > 50) {
        alert('Your email should be max 50 characters long');
        return false;
    }

    if (lastName.length < 2 || lastName.length > 50) {
        alert('Your last name should be min 2 letters and max 50 letters long');
        return false;
    }

    //If-sats för att kontrollera telefonnummer (a tricky one!):
    //.........................................

    if (address.length < 4 || address.length > 50) {
        alert('Your address should be min 4 letters and max 50 letters long');
        return false;
    }

    if (city.length < 4 || city.length > 50) {
        alert('The city name should be min 2 letters and max 50 letters long');
        return false;
    }

    //regex zip-code
    const svensktPostnummer = /^[0-9]{3}\s?[0-9]{2}$/;
    const regex = new RegExp(svensktPostnummer);

    if (!zipCode.match(regex) || zipCode.length < 6) {
        alert('Enter zipcode by 6 sign with format 000 00');
        return false;
    }

    return true;
}