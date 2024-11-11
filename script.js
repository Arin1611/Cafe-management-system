// Menu items data
const menuItems = [
    { id: 1, name: "Coffee", price: 2.5 },
    { id: 2, name: "Tea", price: 1.5 },
    { id: 3, name: "Sandwich", price: 5.0 },
    { id: 4, name: "Cake", price: 3.0 }
];

// Function to load menu items
function loadMenu() {
    const menuDiv = document.getElementById("menu");
    menuItems.forEach(item => {
        const menuItemDiv = document.createElement("div");
        menuItemDiv.className = "menu-item";
        menuItemDiv.innerHTML = `
            <span>${item.name} - $${item.price.toFixed(2)}</span>
            <input type="number" min="0" value="0" data-id="${item.id}" class="quantity-input">
        `;
        menuDiv.appendChild(menuItemDiv);
    });

    // Add event listeners to quantity inputs
    const quantityInputs = document.querySelectorAll(".quantity-input");
    quantityInputs.forEach(input => {
        input.addEventListener('input', calculateBill);
    });
}

// Function to calculate and display order summary
function calculateBill() {
    const orderItemsDiv = document.getElementById("orderItems");
    const quantityInputs = document.querySelectorAll(".quantity-input");
    let total = 0;
    orderItemsDiv.innerHTML = '';  // Clear previous order items

    quantityInputs.forEach(input => {
        const itemId = parseInt(input.getAttribute("data-id"));
        const quantity = parseInt(input.value);

        if (quantity > 0) {
            const item = menuItems.find(i => i.id === itemId);
            const itemTotal = item.price * quantity;
            total += itemTotal;

            // Add item to order summary list
            const orderItem = document.createElement("li");
            orderItem.className = "order-item";
            orderItem.innerHTML = `
                <span>${item.name} x ${quantity}</span>
                <span>$${itemTotal.toFixed(2)}</span>
            `;
            orderItemsDiv.appendChild(orderItem);
        }
    });

    // Update total bill
    document.getElementById("totalBill").innerText = `Total Bill: $${total.toFixed(2)}`;
}

// Load menu on page load
window.onload = loadMenu;