document.addEventListener("DOMContentLoaded", () => {
    const categoryContainer = document.querySelector(".categories-grid");

    // Fetch categories from the backend and populate the UI
    fetch("http://localhost:8080/api/categories") // Endpoint to get all categories
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to fetch categories");
            }
            return response.json();
        })
        .then(categories => {
            // Render categories dynamically
            renderCategories(categories);
        })
        .catch(error => {
            console.error("Error fetching categories:", error);
            categoryContainer.innerHTML = `<p class="error">Failed to load categories. Please try again later.</p>`;
        });

    // Function to render categories
    function renderCategories(categories) {
        categoryContainer.innerHTML = ""; // Clear any existing content
        categories.forEach(category => {
            const card = document.createElement("div");
            card.className = "category-card";
            card.setAttribute("data-category", category.name);
            card.innerHTML = `
                <h2>${category.name}</h2>
                <p>${category.description}</p>
                <img src="${category.imageUrl}" alt="${category.name}">
            `;
            card.addEventListener("click", () => handleCategoryClick(category));
            categoryContainer.appendChild(card);
        });
    }

    // Handle category click
    function handleCategoryClick(category) {
        // Navigate to a specific category page or show details
        const categoryUrl = `/categories/${category.name.toLowerCase()}`;
        window.location.href = categoryUrl;
    }
});