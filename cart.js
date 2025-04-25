let cart = JSON.parse(localStorage.getItem("cart")) || {};
window.onload = updateTable;

const items = {
    
    "qty1": { name: "Intel® Core™ i7 9th Gen", price: 120000 },
    "qty2": { name: "Intel® Core™ i9 Processors", price: 97000 },
    "qty3": { name: "Intel® Core™ i5 Processors", price: 53000 },
    "qty4": { name: "AMD Ryzen™ 7 7700X Desktop Processors", price: 110000 },
    "qty5": { name: "Intel® Core™ i7 Processor", price: 90000 },
    "qty6": { name: "Intel® Core™ i9 Processors", price: 82000 },

    "qty7": { name: "GeForce GTX VENTUS XS OC", price: 87000 },
    "qty8": { name: "GeForce GTX 1660 SUPER", price: 220000 },
    "qty9": { name: "ASUS ROG Strix GeForce RTX 4070 Ti", price: 175000 },
    "qty10": { name: "AMD Radeon RX 6750 XT", price: 190000 },
    "qty11": { name: "ASUS TUF Gaming Radeon RX 7900 XTX", price: 160000 },
    "qty12": { name: "NVIDIA GeForce RTX 4070 Ti", price: 200000 },
    
    "qty13": { name: "MSI X570-A PRO", price: 60000 },
    "qty14": { name: "Gigabyte B550 AORUS PRO V2", price: 35000 },
    "qty15": { name: "ASUS ROG Strix Z590-E Gaming WiFi", price: 50000 },
    "qty16": { name: "MSI MAG B550 TOMAHAWK WIFI", price: 80000 },
    "qty17": { name: "ASUS ROG Strix Z690-E Gaming WiFi", price: 67000 },
    "qty18": { name: "ASRock B450M PRO4", price: 27500 },
    
    "qty19": { name: "Corsair Vengeance RGB Pro (DDR4)", price: 82000 },
    "qty20": { name: "Kingston HyperX Fury (DDR4)", price: 16700 },
    "qty21": { name: "Crucial Ballistix Sport LT (DDR4)", price: 33000 },
    "qty22": { name: "Corsair Vengeance LPX (DDR4)", price: 14000 },

    "qty23": { name: "SanDisk Ultra 512MB microSDXC", price: 5600 },
    "qty24": { name: "Lexar Professional 1000x 8GB", price: 7300 },
    "qty25": { name: "SanDisk Ultra Dual Drive 64GB USB-C", price: 4300 },
    "qty26": { name: "Sony BD-R 50GB Blu-ray", price: 16000 },
    "qty27": { name: "SanDisk Desk HardDrive - 16TB", price: 23000 },
    "qty28": { name: "SanDisk Ultra Dual Drive Luxe 128GB", price: 17000 },
    "qty29": { name: "Seagate Momentus 1TB", price: 33000 }
    

  };
  
function addToCart()
{
    cart = JSON.parse(localStorage.getItem("cart")) || {};

    for (let id in items) {
        const qty = parseInt(document.getElementById(id)?.value) || 0;
        if (qty > 0) {
            cart[id] = (cart[id] || 0) + qty;
        }
    }

    localStorage.setItem("cart", JSON.stringify(cart)); //saves cart
    updateTable();
    alert.showToast("Items added to cart!");
}

function updateTable() {
    const tbody = document.querySelector("#cart-table tbody");
    tbody.innerHTML = '';
    let total = 0;
  
    for (let id in cart) {
      const item = items[id];
      const qty = cart[id];
      const price = item.price * qty;
      total += price;
  
      tbody.innerHTML += `
        <tr id="row-${id}">
          <td>${item.name}</td>
          <td>${qty}</td>
          <td>${price.toFixed(2)}</td>
          <td><button class="remove-btn" onclick="removeItem('${id}')">Remove</button></td>
        </tr>
      `;
    }
  
    document.getElementById("total").innerText = total.toFixed(2);
  }
  

function saveFavourite() {
    localStorage.setItem("favouriteCart", JSON.stringify(cart));
    alert("Favourite Saved!!!");
}

function applyFavourite(){
    const fav = JSON.parse(localStorage.getItem("favouriteCart"));
    if (!fav) return alert("No favourite saved");
    for (let id in fav){
        document.getElementById(id).value = fav[id];
    }

    cart = fav;
    updateTable();
}

function clearFavourites() {
    const confirmFavClear = confirm("Are you sure you want to clear your saved favourite?")
    if (!confirmFavClear) return;

    localStorage.removeItem("favouriteCart");
    alert("Favourite has been cleared")
}

function buyNow(){
    if(Object.keys(cart).length === 0) {
        alert("Please add items to your cart before proceeding");
        return;
    }

    localStorage.setItem("checkoutCart", JSON.stringify(cart));

    window.location.href = "checkout.html" // need to create a webpage on this
    
}

function removeItem(id) 
{
    if (cart[id]){
        delete cart[id];
        localStorage.setItem("cart", JSON.stringify(cart)); //this updates the carts storage
        // check on this
        document.getElementById(id).value = 0; //this is to reset input 
        updateTable();
        showToast(`${items[id].name} removed from your cart.`);
    }
}