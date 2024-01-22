// Function to handle user registration (sign up)
const handleSignUp = async (event) => {
    event.preventDefault();

    // Get the input values from the signup form
    const username = document.getElementById('signup-username').value.trim();
    const password = document.getElementById('signup-password').value.trim();

    try {
        // Send a POST request to sign up a new user
        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        // If the request is successful, reload the page or redirect to the dashboard
        if (response.ok) {
            document.location.replace('/dashboard'); // Redirect to the dashboard or another page
        } else {
            // If there's an error, alert the user
            alert('Error has occurred');
        }
    } catch (err) {
        console.error('Error has occurred', err);
    }
};

// Function to handle user login
const handleLogin = async (event) => {
    event.preventDefault();

    // Get the input values from the login form
    const username = document.getElementById('login-username').value.trim();
    const password = document.getElementById('login-password').value.trim();

    try {
        // Send a POST request to log in the user
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        // If the login is successful, reload the page or redirect to the dashboard
        if (response.ok) {
            document.location.replace('/dashboard'); // Redirect to the dashboard or another page
        } else {
            // If there's an error, alert the user
            alert('Error has occurred');
        }
    } catch (err) {
        console.error('Error has occurred', err);
    }
};

// Function to handle user logout
const handleLogout = async () => {
    try {
        // Send a POST request to log out the user
        const response = await fetch('/api/users/logout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        });

        // If the logout is successful, reload the page or redirect to the homepage
        if (response.ok) {
            document.location.replace('/'); // Redirect to the homepage or another page
        } else {
            // If there's an error, alert the user
            alert('Error has occurred');
        }
    } catch (err) {
        console.error('Error has occurred', err);
    }
};

// Event listeners for signup, login, and logout forms
document.getElementById('signup-form').addEventListener('submit', handleSignUp);
document.getElementById('login-form').addEventListener('submit', handleLogin);
document.getElementById('logout-btn').addEventListener('click', handleLogout);