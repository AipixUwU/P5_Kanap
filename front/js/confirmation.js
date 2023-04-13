const orderId = localStorage.getItem(`orderId`);
document.getElementById("orderId").insertAdjacentHTML('beforeend', orderId);
localStorage.clear();