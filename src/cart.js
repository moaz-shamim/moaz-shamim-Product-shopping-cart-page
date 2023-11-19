let label = document.getElementById("label");
let shoppingCart = document.getElementById("shopping-cart");

let basket = JSON.parse(localStorage.getItem("data")) || [];

let calculation = () => {
  let cartIcon = document.getElementById("cartAmount");
  cartIcon.innerHTML = basket
    .map((item) => item.item)
    .reduce((prevItem, nextItem) => prevItem + nextItem, 0);
};

calculation();

let generateCartItems = () => {
  if (basket.length !== 0) {
    let basketList = basket
      .map((basketItems) => {
        //   console.log(basketItems);
        let { id, item } = basketItems;
        let search = shopItemsData.find((dataItem) => dataItem.id === id) || [];
        //   console.log(search);
        let {img,name,price} = search;
        return `
        <div class="cart-item">
          <img width="100" src=${img} alt="" />
          <div class="details">
  
            <div class="title-price-x">
                <h4 class="title-price">
                  <p>${name}</p>
                  <p class="cart-item-price">$ ${price}</p>
                </h4>
                <i onclick="removeItem(${id})" class="bi bi-x-lg"></i>
            </div>
  
            <div class="buttons">
                <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                <div id=${id} class="quantity">${item}</div>
                <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
            </div>
  
            <h3>$ ${item * search.price}</h3>
          </div>
        </div>
        `;
      })
      .join("");
    shoppingCart.innerHTML = basketList;
  } else {
    shoppingCart.innerHTML = ``;
    label.innerHTML = `
        <h2>Cart is Empty</h2>
        <a href="index.html">
        <button class="HomeBtn">Back to Home</button>
        </a>
        `;
  }
};

generateCartItems();

let increment = (selectedItem) => {
  let search = basket.find((item) => item.id === selectedItem.id);

  search === undefined
    ? basket.push({ id: selectedItem.id, item: 1 })
    : (search.item += 1);

  generateCartItems();
  update(selectedItem.id);
  //passing data to local storage
  localStorage.setItem("data", JSON.stringify(basket));
};

let decrement = (selectedItem) => {
  let search = basket.find((item) => item.id === selectedItem.id);

  if (search === undefined) return;
  else if (search.item === 0) return;
  else search.item -= 1;

  update(selectedItem.id);
  basket = basket.filter((items) => items.item !== 0);
  generateCartItems();
  // console.log(basket);
  //passing data to local storage
  localStorage.setItem("data", JSON.stringify(basket));
};

let update = (id) => {
  let search = basket.find((item) => item.id === id);
  // console.log(search.item);
  document.getElementById(id).innerHTML = search.item;
  calculation();
  TotalAmount();
};

let removeItem = (id) => {
  let selectedItem = id;
  console.log(id);
  basket = basket.filter((restItem) => restItem.id !== selectedItem.id);
  generateCartItems();
  TotalAmount();
  calculation();
  localStorage.setItem("data", JSON.stringify(basket));
};


let clearCart = ()=>{
    basket = [];
    generateCartItems();
    calculation();
    localStorage.setItem("data", JSON.stringify(basket));
    
}



let TotalAmount = () => {
  if (basket.length !== 0) {
    let amount = basket
      .map((basketItems) => {
        let { item, id } = basketItems;
        let search = shopItemsData.find((dataItem) => dataItem.id === id) || [];

        return item * search.price;
      })
      .reduce((prevPrice, nextPrice) => prevPrice + nextPrice, 0);
    label.innerHTML = `
    <h2>Total Bill : $ ${amount}</h2>
      <button class="checkout">Chekout</button>
      <button onclick="clearCart()" class="removeAll">Clear Cart</button>
    `;
  } else {
  }
};

TotalAmount();
