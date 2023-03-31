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

function renderAPI(json) {
    let products = "";
    json.forEach((product) => {
        products += "<div class='col'><div class='box' id = 'box'><a href='order.html'><p class='index_title' id = 'product_title'>" + product.title + "</p><div class='index_image_container'><img src=" + product.image + " class='index_images' id = 'product_image'></div><p class='index_price' id = 'product_price'>Price: " + product.price + "USD</p> <div id = 'product_id'>" + product.id + "</div><div id = 'product_description'>" + product.description + "</div></a></div></div>";
    });
    document.getElementById("products").innerHTML = products;
}

loadAPI();

const box = document.getElementById("box");

box.addEventListener('click', () => {
    console.log("Success")
    window.open('order.html', '_self');
});

function saveProductToLocalStorage() {
    let myProduct = {
        id: document.getElementById("product_id").innerText,
        title: document.getElementById("product_title").innerText,
        image: document.getElementById("product_image").innerText,
        price: document.getElementById("product_price").innerText,
        price: document.getElementById("product_description").innerText,
    };
    console.log(myProduct);

    localStorage.setItem("myProduct", JSON.stringify(myProduct));

}