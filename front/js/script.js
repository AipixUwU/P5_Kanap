// Récupère tout les produits de l'api
const url = "http://localhost:3000/api/products";
const card = document.getElementById("items");

fetch(url)
  .then(response => response.json())
  .then(products => {

    products.map(function (product) {
      card.insertAdjacentHTML('beforeend', `<a href="./product.html?id=${product._id}">
      <article>
        <img src="${product.imageUrl}" alt="${product.altTxt}">
        <h3 class="productName"> ${product.name}</h3>
        <p class="productDescription">${product.description}</p>
      </article>
    </a>` )
    })
  })