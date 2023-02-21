const url = window.location;
const id = new URL(url).searchParams.get("id");

const productURL = `http://localhost:3000/api/products/${id}`;
const productImage = document.querySelector(".item__img");
const productTitle = document.getElementById("title");
const productPrice = document.getElementById("price");
const productDescription = document.getElementById("description");
const productColor = document.getElementById("color");


const getProduct = async () => {
    return await fetch(productURL).then(response => response.json())
}

const productFetch = async () => {
    const product = await getProduct()

        productPrice.innerHTML = `${product.price}`;
        productTitle.innerHTML = `${product.name}`;
        productDescription.innerHTML = `${product.description}`;
        productImage.innerHTML = `<img src="${product.imageUrl}" alt="${product.altTxt}">`;


        // for (let colors of product.colors){
          
        // }
    }

productFetch()