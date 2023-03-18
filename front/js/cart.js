let productsURL = `http://localhost:3000/api/products/`;
let showProduct = document.getElementById("cart__items");
let getProducts = JSON.parse(localStorage.getItem(`product`));
let selectProduct = [];
let totalQuantity = document.getElementById("totalQuantity");
let totalPrice = document.getElementById("totalPrice");
totalQuantity.textContent = 0;
totalPrice.textContent = 0;
let allPrice = 0;
let allQuantity = 0;
let deleteItem = document.getElementsByClassName("deleteItem");



// getProducts.map(function (canape) {
//   let productID = canape.productID;
//   let productURL = `http://localhost:3000/api/products/${productID}`;
//   fetch(productURL)
//     .then(response => response.json())
//     .then(product => {
//       console.log(product);
//     })
// })






fetch(productsURL)
    .then(response => response.json())
    .then(products => {
        getProducts.map(function (showCart) {
            products.map(function (product) {

                if (showCart.productID === product._id) {
                    selectProduct = product;
                }
            })
            // PRIX TOTAL
            allPrice = Number(totalPrice.textContent) + selectProduct.price * showCart.quantity;
            totalPrice.innerHTML = allPrice;

            // QUANTITEE TOTAL
            allQuantity = Number(totalQuantity.textContent) + showCart.quantity;
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


    Array.from(deleteItem).map(function (d) {

        d.addEventListener("click", function(){

            let articleParent = this.closest("article");
            articleParent.remove("article");

                console.log(articleParent.dataset.id);
                console.log(articleParent.dataset.color);
        })
    })
})

  const submit = document.getElementById("order")

  submit.addEventListener("click", function() {

      let contact = {
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
        address: document.getElementById("address").value,
        city: document.getElementById("city").value,
        email: document.getElementById("email").value,
    }
  // PRENOM / NOM / VILLE
  const name = /^[a-z ,.'-]+$/i;

  // EMAIL
  const email = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

    if  (
          (email.test(contact.email)) &
          (name.test(contact.firstName)) &
          (name.test(contact.lastName))
        ) {

        alert("Formulaire envoyé")
      }
      else {

        alert("Erreur");
      }

    })