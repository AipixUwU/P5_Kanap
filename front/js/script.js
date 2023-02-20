const url = "http://localhost:3000/api/products";
const card = document.getElementById("items");

const getProducts = async () => {
  return await fetch(url).then(response => response.json())

}

const showProduct = async () => {
  const products = await getProducts()

  products.map(function(product) {
    card.innerHTML += `<a href="./product.html?id=42">
      <article>
        <img src="${product.imageUrl}" alt="Lorem ipsum dolor sit amet, Kanap name1">
        <h3 class="productName"> ${product.name}</h3>
        <p class="productDescription">${product.description}</p>
      </article>
    </a>`
  })

}

showProduct()