function affichagePanier (){


let showProduct = document.getElementById("cart__items");
let getProducts = JSON.parse(localStorage.getItem(`product`));
let selectProduct = [];
let totalQuantity = document.getElementById("totalQuantity");
let totalPrice = document.getElementById("totalPrice");
let allPrice = 0;
let allQuantity = 0;
let deleteItem = document.getElementsByClassName("deleteItem");

showProduct.innerHTML = "";
totalQuantity.textContent = allQuantity;
totalPrice.textContent = allPrice;



getProducts.map(function (showCart) {
  let productID = showCart.productID;
  let productURL = `http://localhost:3000/api/products/${productID}`;
  fetch(productURL)
    .then(response => response.json())
    .then(products => {
      console.log(products);



      if (showCart.productID === products._id) {
        selectProduct = products;
      }

      // PRIX TOTAL
      allPrice = Number(totalPrice.textContent) + selectProduct.price * showCart.quantity;
      totalPrice.innerHTML = allPrice;

      // QUANTITEE TOTAL
      allQuantity = Number(totalQuantity.textContent) + Number(showCart.quantity);
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


      Array.from(deleteItem).map(function (d) {
        d.addEventListener("click", function () {

          let articleParent = this.closest("article");
          articleParent.remove("article");
          console.log(articleParent.dataset.id);
          console.log(articleParent.dataset.color);

          let dataColor = articleParent.dataset.color;
          let dataId = articleParent.dataset.id;
          let productIndex = getProducts.findIndex((element) => element.productID == dataId && element.color == dataColor);
          getProducts.splice (productIndex, 1)
          localStorage.setItem(`product`, JSON.stringify(getProducts));
          affichagePanier();
          console.log(getProducts);


        })
      })
    })
})
}
affichagePanier()

const submit = document.getElementById("order")

submit.addEventListener("click", function () {

  let contact = {
    firstName: document.getElementById("firstName").value,
    lastName: document.getElementById("lastName").value,
    email: document.getElementById("email").value,
  }
  // PRENOM / NOM / VILLE
  const name = /^[a-z ,.'-]+$/i;

  // EMAIL
  const email = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

  if (
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