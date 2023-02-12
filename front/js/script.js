const url = "http://localhost:3000/api/products";
const card = document.getElementById("items");

const getProducts = () => {
    fetch(url)
    .then(function(test) {
        return test.json()
    })
    .then(function (data){
       for(product in data) {
        card.innerHTML += `<a href="./product.html?id=42">
        <article>
          <img src="${data[product].imageUrl}" alt="Lorem ipsum dolor sit amet, Kanap name1">
          <h3 class="productName"> ${data[product].name}</h3>
          <p class="productDescription">${data[product].description}</p>
        </article>
      </a>`
       }
    })

}

getProducts()