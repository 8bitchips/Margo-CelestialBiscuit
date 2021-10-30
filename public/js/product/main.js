let addToCart = document.querySelectorAll(".button-head .product-action-2 a");
console.log(addToCart);
let productContent = document.querySelectorAll(".product-content a");
let productprice = document.querySelectorAll(".product-price span");

let cart = JSON.parse(localStorage.getItem("cart")) || {};

let productImage = document.querySelectorAll(".product-img .default-img");
for (let idx = 0; idx < addToCart.length; idx++) {
  let obj = addToCart[idx];
  obj.addEventListener("click", function () {
    let item = {
      name: productContent[idx].innerText,
      price: Number(productprice[idx].innerText.split(" ")[1]),
      image: productImage[idx].getAttribute("src"),
      quantity: 1,
    };
    cart[productContent[idx].innerText] = item;
    localStorage.setItem("cart", JSON.stringify(cart));
  });
}
