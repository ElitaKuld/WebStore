function loadAPI() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "https://fakestoreapi.com/products");
    xhr.send();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            //    console.log(xhr.response);
            const json = JSON.parse(xhr.response);
            //    console.log(json);
            renderAPI(json);
        }
    };
}

function renderAPI(json) {
    let products = "";
    json.forEach((product) => {
        products += "<div class='col-12 col-md-4'><div class='box' id='box'><p class='index_title' id='product_title'>" + product.title + "</p><div class='index_image_container'><img src=" + product.image + " class='index_images' id='product_image'></div><p class='index_price' id='product_price'>Price: " + product.price + " USD</p><div id='button-center'><button class='btn btn-success' id='index-order-button'>LÄGG PRODUKT I VARUKORG</button></div><div id='product_id'>" + product.id + "</div></div></div>";
    });
    document.getElementById("products").innerHTML = products;
    addActionListener(json); // adds Event Listener to every "box" element
}

function addActionListener(json) {
    const items = document.querySelectorAll(".index_image_container");
    const orderButtons = document.querySelectorAll("#index-order-button");
    items.forEach((item) => item.addEventListener('click', () => {
        saveProductIdToLocalStorage(item);
        window.open('order.html', '_self');
    })
    );
    orderButtons.forEach((button) => button.addEventListener('click', () => {
        saveProduct(button, json);
        fetchAmountOfProducts();
    })
    );
}

loadAPI();

function saveProductIdToLocalStorage(item) {
    // find out the id number inside the clicked "container" element
    let productId = item.parentElement.querySelector("#product_id").textContent;
    console.log(productId); // kontroll
    localStorage.setItem("productId", JSON.stringify(productId));
}

//-------------------------------------------------------------------------------------------------------------------
//Funktion for saving an array of products to Local Storage:
function saveProduct(button, json) {

    let productId = button.parentElement.parentElement.querySelector("#product_id").textContent - 1;
    console.log(productId) // kontroll

    let product = {
        id: json[productId].id,
        title: json[productId].title,
        image: json[productId].image,
        price: json[productId].price,
        description: json[productId].description,
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
    else {
        document.getElementById("quantity").innerHTML = " ";
    }
}