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
//Funktion for saving single product to Local Storage:

function saveProductToLocalStorage() {
    let myProduct = {
        id: document.getElementById("idnumber").textContent.slice(15),
        title: document.getElementById("product-name").textContent,
        image: document.getElementById("image-order").innerHTML.slice(24, document.getElementById("image-order").innerHTML.indexOf('>')),
        price: document.getElementById("price").innerHTML.slice(0, document.getElementById("price").innerHTML.indexOf(' ')),
        description: document.getElementById("product-text-info").innerHTML,
    };
    console.log(myProduct);

    localStorage.setItem("myProduct", JSON.stringify(myProduct));
}

//---------------------------------------------------------------------------------------------------------------------
//Saving product to Local Storage:

const orderButton = document.getElementById("order-button");

orderButton.addEventListener('click', () => {
    //saveProductToLocalStorage();
    saveProduct();
    //refetch amount of products in the cart and show the number in header
    fetchAmountOfProducts();
});

//---------------------------------------------------------------------------------------------------------------------
//Going to Cart page:

const cartButton = document.getElementById("go-to-cart-button");

cartButton.addEventListener('click', () => {
    window.open('cart.html', '_self');
});

//-------------------------------------------------------------------------------------------------------------------
//Funktion for saving an array of products to Local Storage:
function saveProduct() {

    let product = {
        id: document.getElementById("idnumber").textContent.slice(15),
        title: document.getElementById("product-name").textContent,
        image: document.getElementById("image-order").innerHTML.slice(24, document.getElementById("image-order").innerHTML.indexOf('>')),
        price: document.getElementById("price").innerHTML.slice(0, document.getElementById("price").innerHTML.indexOf(' ')),
        description: document.getElementById("product-text-info").innerHTML,
        quantity: 1
    };

    //Local Storage

    //Test if products is null
    if (localStorage.getItem("products") === null) {
        // Initiate array
        let products = [];
        // Add to array
        products.push(product);
        // Set to Local Storage
        localStorage.setItem("products", JSON.stringify(products));
        console.log(products) // kontroll
    } else {
        // Get products from local storage
        let products = JSON.parse(localStorage.getItem("products"));

        // Check if there is a product with the same id among the products:
        let isSuchProduct = false;
        for (let i = 0; i < products.length; i++) {
            if (products[i].id == product.id) {
                products[i].quantity++;
                isSuchProduct = true;
            }
        }

        if (!isSuchProduct) {
            // Add product to array
            products.push(product);
        }
        // Re-set back to LocalStorage
        localStorage.setItem("products", JSON.stringify(products));
        console.log(products) // kontroll
    }
}

//-----------------------------------------------------------------------------------------------------------------------------------------------------
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