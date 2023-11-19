let shop = document.getElementById("shop");

let basket = JSON.parse(localStorage.getItem("data")) || [];

let generateShop = () => {
  let shopItems = shopItemsData
    .map((item) => {
      let { id, name, price, desc, img } = item;
      console.log(id);
      let search = basket.find((item) => item.id === id) || [];
      return `
      <div class="container">
      <div class="wrapper">
    <div id=product-id-${id} >
        <img class="banner-image" src=${img} alt="">
       
          <h3>${name}</h3>
          <p>${desc}</p>

          <div class="price-quantity">
            <h3>$ ${price} </h3>

            <div class="buttons">
              <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
              <div id=${id} class="quantity">
              ${search.item === undefined ? 0 : search.item}
              </div>
              <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
            </div>

          </div>
     
      </div>
      </div>
      </div>
    `;
    })
    .join("");

  shop.innerHTML = shopItems;
};

generateShop();

let increment = (selectedItem) => {
  console.log(selectedItem);
  let search = basket.find((item) => item.id === selectedItem.id);
  console.log(search);
  search === undefined
    ? basket.push({ id: selectedItem.id, item: 1 })
    : (search.item += 1);

  console.log(basket);
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
  // console.log(basket);
  //passing data to local storage
  localStorage.setItem("data", JSON.stringify(basket));
};

let update = (id) => {
  console.log(id);
  let search = basket.find((item) => item.id === id);
  // console.log(search.item);
  document.getElementById(id).innerHTML = search.item;
  calculation();
};

let calculation = () => {
  let cartIcon = document.getElementById("cartAmount");
  cartIcon.innerHTML = basket
    .map((bItem) => bItem.item)
    .reduce((prevItem, nextItem) => prevItem + nextItem, 0);
};

calculation();
