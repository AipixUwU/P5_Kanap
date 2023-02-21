const url = "http://localhost:3000/api/products";
const card = document.getElementById("items");

const getProducts = async () => {
  return await fetch(url).then(response => response.json())

}

const showProduct = async () => {
  const products = await getProducts()

  products.map(function(product) {
    card.innerHTML += `<a href="./product.html?id=${product._id}">
      <article>
        <img src="${product.imageUrl}" alt="${product.altTxt}">
        <h3 class="productName"> ${product.name}</h3>
        <p class="productDescription">${product.description}</p>
      </article>
    </a>`
  })
}
showProduct()