const API_URL = 'http://localhost:8080/api/admin-products';

// Add product
document.getElementById('product-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const newProduct = {
        name: document.getElementById('name').value,
        description: document.getElementById('description').value,
        price: parseFloat(document.getElementById('price').value),
        weight: parseFloat(document.getElementById('weight').value),
        quantity: parseInt(document.getElementById('quantity').value),
        imageUrl: document.getElementById('imageUrl').value
    };

    axios.post(API_URL, newProduct)
        .then(response => {
            alert('Product added successfully');
            loadProducts(); // Reload the product list
        })
        .catch(error => {
            console.error('There was an error adding the product!', error);
        });
});

// Load products
function loadProducts() {
    axios.get(API_URL)
        .then(response => {
            const products = response.data;
            const productList = document.getElementById('product-list');
            productList.innerHTML = ''; // Clear existing list

            products.forEach(product => {
                const li = document.createElement('li');
                li.innerHTML = `
                    <strong>${product.name}</strong><br>
                    ${product.description}<br>
                    Price: $${product.price}<br>
                    Weight: ${product.weight} kg<br>
                    Quantity: ${product.quantity}<br>
                    <img src="${product.imageUrl}" width="100"><br>
                    <button onclick="deleteProduct(${product.id})">Delete</button>
                `;
                productList.appendChild(li);
            });
        })
        .catch(error => {
            console.error('There was an error loading the products!', error);
        });
}

// Delete product
function deleteProduct(id) {
    axios.delete(`${API_URL}/${id}`)
        .then(() => {
            alert('Product deleted successfully');
            loadProducts(); // Reload the product list
        })
        .catch(error => {
            console.error('There was an error deleting the product!', error);
        });
}

// Initial load of products
loadProducts();
