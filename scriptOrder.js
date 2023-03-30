//Connecting Button "Beställ produkt" to checkoutForm.html

const orderButton = document.getElementById("order-button");

orderButton.addEventListener('click', () => {
    console.log("Success")
    window.open('checkoutForm.html', '_self');
});



//--------------------------------------------------------------------------------------------------------------------------------------------------------------

//funktion för att testa att fylla i information om en beställd produkt
function loadAPI() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "https://fakestoreapi.com/products");
    xhr.send();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log(xhr.response); // OBS! En sträng
            const json = JSON.parse(xhr.response);
            console.log(json);
            renderAPI(json);
        }
    };
}

//getting from Victor's pages

function renderAPI(json) {
    const randomProduct = Math.round(Math.random() * 19);
    console.log(randomProduct)
    const product = {
        id: json[randomProduct].id,
        title: json[randomProduct].title,
        description: json[randomProduct].description,
        image: json[randomProduct].image,
        price: json[randomProduct].price,
        category: json[randomProduct].category
    }

    console.log(product);
    document.getElementById("image-order").innerHTML = "<a target='_blank' href=" + product.image + "><img class='img-fluid' src=" + product.image + " alt='Demo-image' title='Öppna högupplöst bild'/></a>";
    document.getElementById("product-name").innerHTML = product.title;
    document.getElementById("price").innerHTML = product.price + " USD";
    document.getElementById("intro").innerHTML = product.description;
    document.getElementById("idnumber").innerHTML = "Artikelnummer: " + product.id;
    document.getElementById("product-text-info").innerHTML = product.description;
    saveProductToLocalStorage(product);
}

loadAPI();


//------------------------------------------------------------------------------------------------------------------------------------------------------
//Spara produkten i localStorage
function saveProductToLocalStorage(product) {
    let myProduct = {
        id: product.id,
        title: product.title,
        image: product.image,
        price: product.price,
    };
    console.log(myProduct);

    localStorage.setItem("myProduct", JSON.stringify(myProduct));

}