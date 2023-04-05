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
        products += "<div class='col-12 col-md-4'><div class='box' id='box'><p class='index_title' id='product_title'>" + product.title + "</p><div class='index_image_container'><img src=" + product.image + " class='index_images' id='product_image'></div><p class='index_price' id='product_price'>Price: " + product.price + " USD</p><div id='product_id'>" + product.id + "</div></div></div>";
    });
    document.getElementById("products").innerHTML = products;
    addActionListener(); // adds Event Listener to every "box" element
}

function addActionListener() {
    const items = document.querySelectorAll(".box");
    //    items.forEach((item) => console.log(item)); // kontroll
    items.forEach((item) => item.addEventListener('click', () => {
        saveProductIdToLocalStorage(item);
        window.open('order.html', '_self');
    })
    );
}

loadAPI();

function saveProductIdToLocalStorage(item) {
    let productId = item.querySelector("#product_id").textContent; // find out the id number inside the clicked "box" element
    console.log(productId); // kontroll
    localStorage.setItem("productId", JSON.stringify(productId));
}