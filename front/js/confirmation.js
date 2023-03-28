const orderId = localStorage.getItem(`orderId`);
document.getElementById("orderId").innerHTML = orderId;
localStorage.clear();