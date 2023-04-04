function goToCart() {
    window.open('cart.html', '_self');
}

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
    else{
        document.getElementById("quantity").innerHTML = " ";
    }
}

fetchAmountOfProducts();