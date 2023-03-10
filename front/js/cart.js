const productsURL = `http://localhost:3000/api/products`;

let showProduct = document.getElementById("cart__items");
let getProducts = JSON.parse(localStorage.getItem(`product`));


fetch(productsURL)
    .then(response => response.json())
    .then(product => {
      
      getProducts.map(function(showCart) {
        showProduct.innerHTML += 

        `<article class="cart__item" data-id="${showCart.productID}" data-color="${showCart.color}">
        <div class="cart__item__img">
          <img src="${product.imageUrl}" alt="${product.altTxt}">
        </div>
        <div class="cart__item__content">
          <div class="cart__item__content__description">
            <h2>Nom du produit</h2>
            <p>${showCart.color}</p>
            <p>42,00 €</p>
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