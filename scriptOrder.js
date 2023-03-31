//Connecting Button "Beställ produkt" to checkoutForm.html

const orderButton = document.getElementById("order-button");

orderButton.addEventListener('click', () => {
    console.log("Success")
    window.open('checkoutForm.html', '_self');
});

function getProductFromLocalStorage() {
    let product = JSON.parse(localStorage.getItem("myProduct"));
    console.log(product);

    document.getElementById("image-order").innerHTML = "<img src=" + product.image + " class='img-fluid img-thumbnail' alt='Produkt bild' id='demo-image'/>"
    document.getElementById("product-info").innerHTML = "<tr><td>" + product.title + "</td><td>" + product.id + "</td><td>1</td><td>" + getPriceWithoutMoms(product.price) + "</td><td>25%</td><td>" + getMoms(product.price) + "</td><td>" + product.price + "</td></tr>"

}

getProductFromLocalStorage();