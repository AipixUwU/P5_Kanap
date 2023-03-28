const url = window.location;
const id = new URL(url).searchParams.get("id");

const productURL = `http://localhost:3000/api/products/${id}`;
const productImage = document.querySelector(".item__img");
const productTitle = document.getElementById("title");
const productPrice = document.getElementById("price");
const productDescription = document.getElementById("description");
const productColor = document.getElementById("colors");
const productQuantity = document.getElementById("quantity");

fetch(productURL)
    .then(response => response.json())
    .then(product => {

        productPrice.innerHTML = `${product.price}`;
        productTitle.innerHTML = `${product.name}`;
        productDescription.innerHTML = `${product.description}`;
        productImage.innerHTML = `<img src="${product.imageUrl}" alt="${product.altTxt}">`;

        product.colors.map(function (color) {
            productColor.innerHTML += `<option value="${color}">${color}</option>`;
        })
    })


// Ajout au panier
// let product = []
let addToCart = document.getElementById("addToCart")
addToCart.addEventListener("click", function () {

    let choiceColor = productColor.value;
    let choiceQuantity = productQuantity.value;

    if (choiceColor == "") {
        alert("Veuillez sélectionner une couleur.");
    }
    //Une couleur a été selectionner
    else {

        if (choiceQuantity <= 0 || choiceQuantity > 100) {
            alert("La quantité saisie est incorrecte.")
        }
        // La quantité est compris entre 1 et 100
        else {
            console.log("Produit ajouter au panier")
            alert("Le produit a été ajouter au panier");

            let productSelect = {
                productID: id,
                color: choiceColor,
                quantity: choiceQuantity,
            }
            let products = localStorage.getItem("product");

            if (products == null) {
                products = []
            }
            else {
                products = JSON.parse(products);
            }

            let found = 0;
            products.map(function (product) {

                if (productSelect.productID == product.productID && productSelect.color == product.color) {
                    found = 1;
                    product.quantity = Number(product.quantity) + Number(productSelect.quantity);
                }
            })

            if (found == 0) {
                products.push(productSelect);
            }

            let productSelectJSON = JSON.stringify(products);
            localStorage.setItem(`product`, productSelectJSON);
        }
    }
})