const productsURL = `http://localhost:3000/api/products`;

let showProduct = document.getElementById("cart__items");
let getProducts = JSON.parse(localStorage.getItem(`product`));
let selectProduct = [];
let totalQuantity = document.getElementById("totalQuantity");
let totalPrice = document.getElementById("totalPrice");
let allPrice = 0;
let allQuantity = 0;

fetch(productsURL)
    .then(response => response.json())
    .then(products => {

      getProducts.map(function(showCart) {  
        products.map(function(product) {

          if (showCart.productID === product._id) {
            selectProduct = product;
          }  
        })
        
          // PRIX TOTAL
      allPrice += selectProduct.price * showCart.quantity;
      totalPrice.innerHTML = allPrice;

          // QUANTITEE TOTAL
      allQuantity += showCart.quantity++;
      totalQuantity.innerHTML = allQuantity;

      showProduct.innerHTML +=

        `<article class="cart__item" data-id="${showCart.productID}" data-color="${showCart.color}">
        <div class="cart__item__img">
          <img src="${selectProduct.imageUrl}" alt="${selectProduct.altTxt}">
        </div>
        <div class="cart__item__content">
          <div class="cart__item__content__description">
            <h2>${selectProduct.name}</h2>
            <p>${showCart.color}</p>
            <p>${selectProduct.price} €</p>
          </div>
          <div class="cart__item__content__settings">
            <div class="cart__item__content__settings__quantity">
              <p>Qté : </p>
              <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${showCart.quantity}">
            </div>
            <div class="cart__item__content__settings__delete">
              <p class="deleteItem">Supprimer</p>
            </div>
          </div>
        </div>
      </article>`
      })
    })