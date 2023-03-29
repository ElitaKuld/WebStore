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

function renderAPI(json) {
    let products = "";
    json.forEach((product) => {
        products += "<div class='col-12 col-sm-3 index_col'><a href='order.html' class='index_col'><p class='index_title'>" + product.title + "</p><div class='index_image_container'><img class='img-fluid index_images' src=" + product.image + "></div><p class='index_price'>Price: " + product.price + "USD</p></a></div>";
    });
    document.getElementById("products").innerHTML = products;
}

loadAPI();

//------------------------------------------------------------------------------------------------------------------------------------------------------

/*
<div class="col-12 col-sm-3 index_col">
                <a href="order.html">
                    <p class="index_title">
                        Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops
                    </p>
                    <div class="index_image_container">
                        <img class="img-fluid index_images"
                            src="https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg">
                    </div>
                    <p class="index_price">Price: 109.95 USD</p>
                </a>
            </div>
*/