const items = Object.values(document.querySelectorAll(".single-product"));
items.push(Object.values(document.querySelectorAll(".single-list")));
const cartItems = [];
items.forEach((item) => {
    item.addEventListener("click",()=>{
        cartItems.push(this.);
        console.log(cartItems);
    })
})