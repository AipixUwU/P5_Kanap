const url = window.location;
const id = new URL(url).searchParams.get("id");

const productURL = `http://localhost:3000/api/products/${id}`;
const productImage = document.querySelector(".item__img");
const productTitle = document.getElementById("title");
const productPrice = document.getElementById("price");
const productDescription = document.getElementById("description");
const productColor = document.getElementById("colors");
const productQuantity = document.getElementById("quantity");

// const addToCart = document.getElementById("addToCart")

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
let addToCart = document.getElementById("addToCart")
    addToCart.addEventListener("click", function(){

        let choiceColor = productColor.value;
        let choiceQuantity = productQuantity.value;
        let getProductName = document.getElementById("title").textContent;
        let getProductPrice = document.getElementById("price").textContent;


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

                    let productSelect = {                        
                        title: getProductName,
                        color: choiceColor,
                        price: getProductPrice,
                        quantity: choiceQuantity,
                    }

                    // console.log(productSelect);
                    let productSelectJSON = JSON.stringify(productSelect);
                    localStorage.setItem(`product`, productSelectJSON);
                }     
            }
})