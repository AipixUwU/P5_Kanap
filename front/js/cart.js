function affichagePanier() {

    const showProduct = document.getElementById("cart__items");
    const totalQuantity = document.getElementById("totalQuantity");
    const totalPrice = document.getElementById("totalPrice");
    let getProducts = JSON.parse(localStorage.getItem(`product`));
    let selectProduct = [];
    let allPrice = 0;
    let allQuantity = 0;


    //UPDATE
    showProduct.innerHTML = "";
    totalQuantity.textContent = allQuantity;
    totalPrice.textContent = allPrice;

    // CACHE LE FORMULAIRE LORSQUE LE PANIER EST VIDE
    if (getProducts == null || localStorage.getItem(`product`) === "[]") {
        alert("Le panier est vide");
        getProducts = [];
        document.querySelector(".cart__order__form").hidden = true;
    }

    // BOUCLE QUI PERMET DE RECUPERER (DEPUIS API) ET AFFICHER LES PRODUITS QUI SONT DANS LE LOCALSTORAGE
    getProducts.map(function (showCart) {
        let productID = showCart.productID;
        let productURL = `http://localhost:3000/api/products/${productID}`;
        fetch(productURL)
            .then(response => response.json())
            .then(products => {
                if (showCart.productID === products._id) {
                    selectProduct = products;
                }

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

                // PRIX TOTAL
                allPrice = Number(totalPrice.textContent) + selectProduct.price * showCart.quantity;
                totalPrice.innerHTML = allPrice;

                // QUANTITEE TOTAL
                allQuantity = Number(totalQuantity.textContent) + Number(showCart.quantity);
                totalQuantity.innerHTML = allQuantity;


                // BOUCLE PERMETTANT D'ACTUALISER LA QUANTITÉ DEPUIS LE PANIER
                const itemQuantity = document.getElementsByClassName("itemQuantity");

                Array.from(itemQuantity).map(function (q) {
                    q.addEventListener("change", function () {

                        let articleParent = this.closest("article");
                        let dataColor = articleParent.dataset.color;
                        let dataId = articleParent.dataset.id;

                        let productIndex = getProducts.findIndex((element) => element.productID == dataId && element.color == dataColor);
                        getProducts[productIndex].quantity = q.value;

                        // SUPPRIME LE PRODUIT DU PANIER LORSQUE SA QUANTITE EST A 0
                        if (q.value == 0) {
                            getProducts.splice(productIndex, 1)
                            localStorage.setItem(`product`, JSON.stringify(getProducts));
                            articleParent.remove("article");
                        }

                        localStorage.setItem(`product`, JSON.stringify(getProducts));
                        affichagePanier();
                    })
                })

                // BOUCLE PERMETTANT DE SUPPRIMER LE PRODUIT CHOISIS DU LOCALSTORAGE ET DE L'HTML
                const deleteItem = document.getElementsByClassName("deleteItem");

                Array.from(deleteItem).map(function (d) {
                    d.addEventListener("click", function () {

                        let articleParent = this.closest("article");

                        let dataColor = articleParent.dataset.color;
                        let dataId = articleParent.dataset.id;
                        let productIndex = getProducts.findIndex((element) => element.productID == dataId && element.color == dataColor);
                        getProducts.splice(productIndex, 1)
                        localStorage.setItem(`product`, JSON.stringify(getProducts));
                        affichagePanier();
                    })
                })
            })
    })
}
affichagePanier()

// Formulaire Validation
const submit = document.getElementById("order")
submit.addEventListener("click", function (e) {
    e.preventDefault()

    let contact = {
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
        email: document.getElementById("email").value,
        address: document.getElementById("address").value,
        city: document.getElementById("city").value,
    }

    // REGEX
    const name = /^[a-z ,.'-]+$/i;
    const email = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

    let error = false;

    if (!name.test(contact.firstName)) {
        document.getElementById("firstNameErrorMsg").textContent = "Prénom invalide"
        error = true;
    }
    else {
        document.getElementById("firstNameErrorMsg").textContent = ""
    }

    if (!name.test(contact.lastName)) {
        document.getElementById("lastNameErrorMsg").textContent = "Nom invalide"
        error = true;
    }
    else {
        document.getElementById("lastNameErrorMsg").textContent = ""
    }

    if (!name.test(contact.address)) {
        document.getElementById("addressErrorMsg").textContent = "Adresse invalide"
        error = true;
    }
    else {
        document.getElementById("addressErrorMsg").textContent = ""
    }

    if (!name.test(contact.city)) {
        document.getElementById("cityErrorMsg").textContent = "Ville invalide"
        error = true;
    }
    else {
        document.getElementById("cityErrorMsg").textContent = ""
    }

    if (!email.test(contact.email)) {
        document.getElementById("emailErrorMsg").textContent = "Adresse e-mail invalide"
        error = true;
    }
    else {
        document.getElementById("emailErrorMsg").textContent = ""
    }

    let products = [];
    let infosSubmit;
    if (!error) {

        let getProducts = JSON.parse(localStorage.getItem(`product`));

        getProducts.map(function (p) {
            products.push(p.productID)
        })

        infosSubmit = { contact, products }
        console.log(infosSubmit);

        fetch("http://localhost:3000/api/products/order", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(infosSubmit)
        })
            .then((response) => response.json())
            .then((infosResponse) => {
                localStorage.setItem(`orderId`, infosResponse.orderId);
                window.location.href = "confirmation.html";
            })
    }
})