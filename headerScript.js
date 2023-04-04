function goToCart() {
    window.open('cart.html', '_self');
}

// Show actual amount of products in the cart:
function fetchAmountOfProducts() {
    let products = JSON.parse(localStorage.getItem("products"));
    let amountOfProducts = products.length;

    if (amountOfProducts > 0) {
        document.getElementById("quantity").innerHTML = " " + amountOfProducts + " ";
    }
}

fetchAmountOfProducts();