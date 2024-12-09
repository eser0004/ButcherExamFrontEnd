const apiUrl = 'http://localhost:8080/api/admin-products'; // Your backend API URL

// DOM elements
const productForm = document.getElementById('productForm');
const productList = document.getElementById('productItems');
const productFormModal = document.getElementById('productFormModal');

// Event listener for form submission
productForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const productId = document.getElementById('productId').value;
    const productName = document.getElementById('productName').value;
    const productDescription = document.getElementById('productDescription').value;
    const productPrice = document.getElementById('productPrice').value;
    const productWeight = document.getElementById('productWeight').value;
    const productQuantity = document.getElementById('productQuantity').value;
    const productImageUrl = document.getElementById('productImageUrl').value;

    const productData = {
        name: productName,
        description: productDescription,
        price: parseFloat(productPrice),
        weight: parseFloat(productWeight),
        quantity: parseInt(productQuantity),
        imageUrl: productImageUrl
    };

    if (productId) {
        // Update product
        fetch(`${apiUrl}/${productId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(productData)
        })
            .then(response => response.json())
            .then(data => {
                closeModal();
                fetchProducts(); // Refresh the product list
            });
    } else {
        // Create new product
        fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(productData)
        })
            .then(response => response.json())
            .then(data => {
                closeModal();
                fetchProducts(); // Refresh the product list
            });
    }
});

// Show modal to create or update product
function showCreateForm() {
    document.getElementById('productForm').reset();
    document.getElementById('productId').value = '';
    productFormModal.style.display = 'block';
}

// Close the modal
function closeModal() {
    productFormModal.style.display = 'none';
}

// Fetch and display all products
function fetchProducts() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(products => {
            productList.innerHTML = ''; // Clear the current list
            products.forEach(product => {
                const productItem = document.createElement('li');
                productItem.innerHTML = `
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                    <p><strong>Price:</strong> $${product.price}</p>
                    <p><strong>Weight:</strong> ${product.weight} kg</p>
                    <p><strong>Quantity:</strong> ${product.quantity}</p>
                    <img src="${product.imageUrl}" alt="${product.name}" width="100" height="100">
                    <button onclick="editProduct(${product.id})">Edit</button>
                    <button onclick="deleteProduct(${product.id})">Delete</button>
                `;
                productList.appendChild(productItem);
            });
        });
}

// Edit a product
function editProduct(id) {
    fetch(`${apiUrl}/${id}`)
        .then(response => response.json())
        .then(product => {
            document.getElementById('productId').value = product.id;
            document.getElementById('productName').value = product.name;
            document.getElementById('productDescription').value = product.description;
            document.getElementById('productPrice').value = product.price;
            document.getElementById('productWeight').value = product.weight;
            document.getElementById('productQuantity').value = product.quantity;
            document.getElementById('productImageUrl').value = product.imageUrl;
            productFormModal.style.display = 'block';
        });
}

// Delete a product
function deleteProduct(id) {
    if (confirm('Are you sure you want to delete this product?')) {
        fetch(`${apiUrl}/${id}`, {
            method: 'DELETE',
        })
            .then(() => fetchProducts()); // Refresh the product list
    }
}

// Initial fetch of products
fetchProducts();
