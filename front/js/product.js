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
    
        product.colors.map(function(color) {
            productColor.innerHTML += `<option value="${color}">${color}</option>`;
        })
    })


    // Ajout au panier
    // let product = []
    let addToCart = document.getElementById("addToCart")
    addToCart.addEventListener("click", function(){

        let choiceColor = productColor.value;
        let choiceQuantity = productQuantity.value;

            if (choiceColor == "") {
                alert("Selectioner une couleur");
            }

                //Une couleur a été selectionner
            else { 

                if (choiceQuantity <= 0 || choiceQuantity > 100) {
                    alert("Quantité incorrecte")
                }   
                // La quantité est compris entre 1 et 100
                else { 
                    console.log("Ajout au panier")
                    alert("Le produit a été ajouter au panier");

                    let productSelect = {   
                        productID: id,                     
                        color: choiceColor,
                        quantity: choiceQuantity,
                    }
                    let product = localStorage.getItem("product");
                    console.log(product);

                    if (product == null) {
                        product = []
                    } 
                    else {
                        product = JSON.parse(product);
                    }
                    
                    let trouve = 0;
                    product.map(function(canape) {

                        if (productSelect.productID == canape.productID && productSelect.color == canape.color){
                            trouve = 1;
                            canape.quantity = Number(canape.quantity) + Number(productSelect.quantity);
                        }
                    })
                    
                    if (trouve == 0) {
                        product.push(productSelect);
                    }

                    let productSelectJSON = JSON.stringify(product);
                    localStorage.setItem(`product`, productSelectJSON); 
                    }    
                }
})