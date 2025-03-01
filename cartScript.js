//Validating form and saving customer info to Local Storage

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
    let shippingFee = document.getElementById("shipping-fee").innerHTML
    let totalt = document.getElementById("pris-rad").innerHTML

    //Validate form
    if (!validateForm(firstName, lastName, email, phoneNumber, address, city, zipCode, cardNumber, expireDate, CVV, shippingFee)) {
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
        CVV: CVV,
        shippingFee: shippingFee,
        totalt: totalt
    }

    //Local Storage
    localStorage.setItem("customerInfo", JSON.stringify(customerInfo));
    window.open('confirmation.html', '_self'); // öppnas i samma tab
}

const setError = (element, message) => {
    const formControl = element.parentElement;
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
function validateForm(firstName, lastName, email, phoneNumber, address, city, zipCode, cardNumber, expireDate, CVV, shippingFee) {

    let amountOfProducts = JSON.parse(localStorage.getItem("products")).length;
    let isValidated = true;

    if (!firstName || !lastName || !email || !phoneNumber || !address || !city || !zipCode || !cardNumber || !expireDate || !CVV) {
        alert('Please fill in the form');
        return false;
    }

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

    if (amountOfProducts === 0) {
        alert("Vänligen välj produkter du vill beställa innan du slutför beställningen");
        isValidated = false;
    }

    if (shippingFee === "") {
        alert("Vänligen välj leveransland och fraktalternativ innan du slutför beställningen");
        isValidated = false;
    }

    return isValidated;
}

//------------------------------------------------------------------------------------------------------------------------------------
//Delete one product from Cart (and Local Storage)

function deleteProduct(button) {
    let productId = button.parentElement.parentElement.querySelector("#artikelnummer").textContent.slice(8);
    console.log(productId); // kontroll

    let products = JSON.parse(localStorage.getItem("products"));

    for (let i = 0; i < products.length; i++) {
        if (products[i].id == productId) {
            // Remove from array
            products.splice(i, 1);
        }
    }
    // Re-set back to LocalStorage
    localStorage.setItem("products", JSON.stringify(products));

    if (products.length === 0) {
        resetCountryForm()
        resetShippingFeeForm()
        cleanSammanfattning()
    }
    else {
        showTotalSum();
    }

    // Re-fetch products and total sum/info
    showProductsInTheCart();
    fetchAmountOfProducts();
}

//------------------------------------------------------------------------------------------------------------------------------------
//Delete all products from Local Storage

function deleteAllProducts() {
    let products = JSON.parse(localStorage.getItem("products"));
    //Clear the array
    products.length = 0;

    // Re-set back to LocalStorage
    localStorage.setItem("products", JSON.stringify(products));

    // Re-fetch products and total sum/info
    showProductsInTheCart();
    showTotalSum();
    fetchAmountOfProducts();
    resetCountryForm()
    resetShippingFeeForm()
    cleanSammanfattning()
}

//----------------------------------------------------------------------------------------------------------------------------------------
//Showing products in the "Varukorg" section with the help of Local Storage:

function showProductsInTheCart() {
    let products = JSON.parse(localStorage.getItem("products"));
    let output = "";
    for (let i = 0; i < products.length; i++) {
        output += "<tr><td><div class='container' id='image-container'><img id='product-image' class='img-fluid' src=" + products[i].image + " alt='Product image'></div></td><td><div id='product-name'>" + products[i].title + "</div><div id='artikelnummer'>Art.nr: " + products[i].id + "</div></td><td><div class='container'><form id='update-form'><div class='input-group'><input type='number' id='number-of-products' class='form-control' placeholder=" + products[i].quantity + " min='1'><button class='btn' id='update-button' title='Uppdatera antal'><img class='img-fluid' src='images/update.png' alt='Update icon'></button></div></form></div></td><td><div id='enhet'>Enhet: " + products[i].price + " USD</div><div id='totalt'>Totalt: " + (products[i].price * products[i].quantity) + " USD</div></td><td><button class='btn' id='delete-button'><img class='img-fluid' src='images/garbage-bin.jpg' alt='Garbage bin icon' title='Ta bort produkten'></button></td></tr >"
    }
    document.getElementById("show-products").innerHTML = output;
    addActionListener();
}

showProductsInTheCart();

function addActionListener() {
    const deleteButtons = document.querySelectorAll("#delete-button");
    const updateForms = document.querySelectorAll("#update-form");
    deleteButtons.forEach((button) => console.log(button)); // kontroll
    deleteButtons.forEach((button) => button.addEventListener('click', () => {
        deleteProduct(button);
    })
    );
    updateForms.forEach((form) => form.addEventListener("submit", (e) => {
        //Prevent form from submitting
        e.preventDefault();
        updateQuantity(form);
    })
    );
}

//---------------------------------------------------------------------------------------------------------------------------------------------
//Showing information about the total sum to pay in "Sammanfattning" section:

function showTotalSum() {
    let products = JSON.parse(localStorage.getItem("products"));
    console.log(products) // kontroll

    let amountOfProducts = 0
    let totalPrice = 0

    for (let i = 0; i < products.length; i++) {
        amountOfProducts += Number(products[i].quantity);
        totalPrice += products[i].quantity * products[i].price;
    }

    //Showing the amount of products
    if (amountOfProducts === 1 || (amountOfProducts % 10) === 1) {
        document.getElementById("amount-of-products").innerHTML = amountOfProducts + " artikel"
    }
    else {
        document.getElementById("amount-of-products").innerHTML = amountOfProducts + " artiklar"
    }

    //Showing the total price
    let totalSum = totalPrice.toFixed(2) + " USD"
    document.getElementById("total-sum").innerHTML = totalSum

    //Showing shipping fee
    let shippingFee = document.getElementById("actual-shipping-fee").textContent
    document.getElementById("shipping-fee").innerHTML = shippingFee

    //Showing total of price + shipping fee
    let priceAndShippingFee = Number(totalPrice.toFixed(2)) + Number(shippingFee.slice(0, shippingFee.indexOf(" ")))
    document.getElementById("pris-rad").innerHTML = priceAndShippingFee.toFixed(2) + " USD"

    //Showing moms
    document.getElementById("moms-rad").innerHTML = (priceAndShippingFee * 0.25).toFixed(2) + " USD"
}

let amountOfProductsInTheCart = JSON.parse(localStorage.getItem("products")).length;
if (amountOfProductsInTheCart === 0) {
    showTotalSum();
    cleanSammanfattning()
}
else {
    showTotalSum();
}



//--------------------------------------------------------------------------------------------------------------------------------------
//Update quantity

function updateQuantity(form) {
    let productId = form.parentElement.parentElement.parentElement.querySelector("#artikelnummer").textContent.slice(8);
    console.log(productId); // kontroll

    let desiredQuantity = Number(form.parentElement.parentElement.parentElement.querySelector("#number-of-products").value);
    console.log(desiredQuantity); // kontroll

    let products = JSON.parse(localStorage.getItem("products"));

    for (let i = 0; i < products.length; i++) {
        if (products[i].id == productId) {
            products[i].quantity = desiredQuantity;
        }
    }
    // Re-set back to LocalStorage
    localStorage.setItem("products", JSON.stringify(products));

    // Re-fetch products and total sum/info
    showProductsInTheCart();
    showTotalSum();
    fetchAmountOfProducts();
}

//---------------------------------------------------------------------------------------------------------------------------------
// Show actual amount of products in the cart:
function fetchAmountOfProducts() {
    let products = JSON.parse(localStorage.getItem("products"));
    let amountOfProducts = 0;

    for (let i = 0; i < products.length; i++) {
        amountOfProducts += products[i].quantity;
    }

    if (products.length > 0) {
        document.getElementById("quantity").innerHTML = " " + amountOfProducts + " ";
    }
    else {
        document.getElementById("quantity").innerHTML = " ";
    }
}

//---------------------------------------------------------------------------------------------------------------------------------
// Change flag according to country of delivery

let country = "";
const countrySelect = document.getElementById("country-form")
countrySelect.addEventListener("change", () => {
    country = countrySelect.value
    console.log(country) // kontroll
    changeFlag(country);
    resetShippingFeeForm()
    document.getElementById("shipping-fee").innerHTML = "";
});

function changeFlag(value) {
    let flag = document.getElementById("actual-country")
    if (value === "Sverige") {
        flag.innerHTML = "<img src='images/sweden-flag.jpg' alt='Sverige flagga icon' id='country-flag'></img>"
    }
    else if (value === "Norge") {
        flag.innerHTML = "<img src='images/norway-flag.jpg' alt='Norge flagga icon' id='country-flag'></img>"
    }
    else if (value === "Danmark") {
        flag.innerHTML = "<img src='images/danmark-flag.jpg' alt='Danmark flagga icon' id='country-flag'></img>"
    }
    else if (value === "Finland") {
        flag.innerHTML = "<img src='images/finland-flag.png' alt='Finland flagga icon' id='country-flag'></img>"
    }
    else if (value === "Estland") {
        flag.innerHTML = "<img src='images/estland-flag.png' alt='Estland flagga icon' id='country-flag'></img>"
    }
    else if (value === "Frankrike") {
        flag.innerHTML = "<img src='images/frankrike-flag.jpg' alt='Frankrike flagga icon' id='country-flag'></img>"
    }
    else if (value === "Tyskland") {
        flag.innerHTML = "<img src='images/tyskland-flag.png' alt='Tyskland flagga icon' id='country-flag'></img>"
    }
    else if (value === "Spanien") {
        flag.innerHTML = "<img src='images/spanien-flag.jpg' alt='Spanien flagga icon' id='country-flag'></img>"
    }
    else if (value === "Storbrittanien") {
        flag.innerHTML = "<img src='images/storbrittanien-flag.png' alt='Storbrittanien flagga icon' id='country-flag'></img>"
    }
    else if (value === "USA") {
        flag.innerHTML = "<img src='images/usa-flag.png' alt='USA flagga icon' id='country-flag'></img>"
    }
    else if (value === "Nya Zeeland") {
        flag.innerHTML = "<img src='images/new-zealand-flag.jpg' alt='New Zealand flagga icon' id='country-flag'></img>"
    }
    else if (value === "Australien") {
        flag.innerHTML = "<img src='images/australien-flag.png' alt='Australien flagga icon' id='country-flag'></img>"
    }
    else if (value === "Japan") {
        flag.innerHTML = "<img src='images/japan-flag.jpg' alt='Japan flagga icon' id='country-flag'></img>"
    }
    else if (value === "Välj-land") {
        flag.innerHTML = "<img src='images/question-mark.png' alt='Question mark icon' id='country-flag'></img>"
    }
    else {
        flag.innerHTML = "<img src='images/rainbow-flag.png' alt='Rainbow flagga icon' id='country-flag'></img>"
    }
}

//-------------------------------------------------------------------------------------------------------------------------------
// Change shipping fee according to leverantör

const select = document.getElementById("shipping-form")
let fee = document.getElementById("actual-shipping-fee")
select.addEventListener("change", () => {
    console.log(select.value) // kontroll
    changeShippingFee(select.value)
});

function changeShippingFee(value) {
    if (country === "Sverige") {
        if (value === "Postnord") {
            fee.innerHTML = "7 USD"
        }
        else if (value === "DHL") {
            fee.innerHTML = "11 USD"
        }
        else if (value === "Schenker") {
            fee.innerHTML = "17 USD"
        }
    }
    else if (country === "Norge") {
        if (value === "Postnord") {
            fee.innerHTML = "35 USD"
        }
        else if (value === "DHL") {
            fee.innerHTML = "39 USD"
        }
        else if (value === "Schenker") {
            fee.innerHTML = "45 USD"
        }
    }
    else if (country === "Danmark") {
        if (value === "Postnord") {
            fee.innerHTML = "35 USD"
        }
        else if (value === "DHL") {
            fee.innerHTML = "39 USD"
        }
        else if (value === "Schenker") {
            fee.innerHTML = "45 USD"
        }
    }
    else if (country === "Finland") {
        if (value === "Postnord") {
            fee.innerHTML = "35 USD"
        }
        else if (value === "DHL") {
            fee.innerHTML = "39 USD"
        }
        else if (value === "Schenker") {
            fee.innerHTML = "45 USD"
        }
    }
    else if (country === "Estland") {
        if (value === "Postnord") {
            fee.innerHTML = "35 USD"
        }
        else if (value === "DHL") {
            fee.innerHTML = "39 USD"
        }
        else if (value === "Schenker") {
            fee.innerHTML = "45 USD"
        }
    }
    else if (country === "Frankrike") {
        if (value === "Postnord") {
            fee.innerHTML = "35 USD"
        }
        else if (value === "DHL") {
            fee.innerHTML = "39 USD"
        }
        else if (value === "Schenker") {
            fee.innerHTML = "45 USD"
        }
    }
    else if (country === "Spanien") {
        if (value === "Postnord") {
            fee.innerHTML = "35 USD"
        }
        else if (value === "DHL") {
            fee.innerHTML = "39 USD"
        }
        else if (value === "Schenker") {
            fee.innerHTML = "45 USD"
        }
    }
    else if (country === "Tyskland") {
        if (value === "Postnord") {
            fee.innerHTML = "35 USD"
        }
        else if (value === "DHL") {
            fee.innerHTML = "39 USD"
        }
        else if (value === "Schenker") {
            fee.innerHTML = "45 USD"
        }
    }
    else if (country === "Storbrittanien") {
        if (value === "Postnord") {
            fee.innerHTML = "35 USD"
        }
        else if (value === "DHL") {
            fee.innerHTML = "39 USD"
        }
        else if (value === "Schenker") {
            fee.innerHTML = "45 USD"
        }
    }
    else if (country === "USA") {
        if (value === "Postnord") {
            fee.innerHTML = "50 USD"
        }
        else if (value === "DHL") {
            fee.innerHTML = "54 USD"
        }
        else if (value === "Schenker") {
            fee.innerHTML = "60 USD"
        }
    }
    else if (country === "Nya Zeeland") {
        if (value === "Postnord") {
            fee.innerHTML = "50 USD"
        }
        else if (value === "DHL") {
            fee.innerHTML = "54 USD"
        }
        else if (value === "Schenker") {
            fee.innerHTML = "60 USD"
        }
    }
    else if (country === "Australien") {
        if (value === "Postnord") {
            fee.innerHTML = "50 USD"
        }
        else if (value === "DHL") {
            fee.innerHTML = "54 USD"
        }
        else if (value === "Schenker") {
            fee.innerHTML = "60 USD"
        }
    }
    else if (country === "Japan") {
        if (value === "Postnord") {
            fee.innerHTML = "50 USD"
        }
        else if (value === "DHL") {
            fee.innerHTML = "54 USD"
        }
        else if (value === "Schenker") {
            fee.innerHTML = "60 USD"
        }
    }
    else if (country === "Välj-land") {
        fee.innerHTML = "<img src='images/question-mark.png' alt='Question mark icon' id='country-flag'></img>"
    }
    showTotalSum();
}

function resetShippingFeeForm() {
    select.selectedIndex = 0;
    fee.innerHTML = "<img src='images/question-mark.png' alt='Question mark icon' id='country-flag'></img>"
}

function resetCountryForm() {
    countrySelect.selectedIndex = 0;
    document.getElementById("actual-country").innerHTML = "<img src='images/question-mark.png' alt='Question mark icon' id='country-flag'></img>"
}

function cleanSammanfattning() {
    document.getElementById("total-sum").innerHTML = "";
    document.getElementById("shipping-fee").innerHTML = "";
    document.getElementById("pris-rad").innerHTML = "";
    document.getElementById("moms-rad").innerHTML = "";
}