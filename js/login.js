document.getElementById('loginForm').addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent form from refreshing the page

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:8080/admin/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        const message = document.getElementById('message');

        if (response.ok) {
            const result = await response.text();
            message.textContent = result; // Display "Login successful"
            message.style.color = "green";
            window.location.href = "../adminpage.html"; // Redirect to the admin dashboard
        } else {
            const errorText = await response.text();
            message.textContent = errorText; // Display "Invalid credentials"
            message.style.color = "red";
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('message').textContent = 'Something went wrong. Please try again.';
    }
});
