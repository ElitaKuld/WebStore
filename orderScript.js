// Function for getting id of the clicked product:
function getProductIdFromLocalStorage() {
    return JSON.parse(localStorage.getItem("productId"));
}

const productId = getProductIdFromLocalStorage(); // kontroll
console.log(productId); // kontroll

//-----------------------------------------------------------------------------------------------------------------
//Filling the page with the information from API:
function loadAPI() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "https://fakestoreapi.com/products");
    xhr.send();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const json = JSON.parse(xhr.response);
            renderAPI(json);
            saveProductToLocalStorage(json); 
        }
    };
}

function renderAPI(json) {
    const productId = getProductIdFromLocalStorage() - 1; // för att vi ska behandla en array
//    console.log(json[productId]); //kontroll

    document.getElementById("image-order").innerHTML = "<a target='_blank' href=" + json[productId].image + "><img class='img-fluid' src=" + json[productId].image + " alt='Demo image' title='Öppna högupplöst bild'/></a>";
    document.getElementById("product-name").innerHTML = json[productId].title;
    document.getElementById("price").innerHTML = json[productId].price + " USD";
    document.getElementById("intro").innerHTML = json[productId].description;
    document.getElementById("idnumber").innerHTML = "Artikelnummer: " + json[productId].id;
    document.getElementById("product-text-info").innerHTML = json[productId].description;
}

loadAPI();

//--------------------------------------------------------------------------------------------------------------------
//Saving product to Local Storage:

function saveProductToLocalStorage(json) {
    const productId = getProductIdFromLocalStorage() - 1; // för att vi ska behandla en array
    let myProduct = {
        id: json[productId].id,
        title: json[productId].title,
        image: json[productId].image,
        price: json[productId].price,
        description: json[productId].description,
    };
    console.log(myProduct);

    localStorage.setItem("myProduct", JSON.stringify(myProduct));
}

//---------------------------------------------------------------------------------------------------------------------
//

const orderButton = document.getElementById("order-button");

orderButton.addEventListener('click', () => {
    //window.open('checkoutForm.html', '_self');
    alert("Hi there!");
});

//---------------------------------------------------------------------------------------------------------------------
//

const cartButton = document.getElementById("go-to-cart-button");

cartButton.addEventListener('click', () => {
    window.open('cart.html', '_self');
});