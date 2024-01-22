// Define an asynchronous function named signupFormHandler that takes an event as a parameter
async function signupFormHandler(event) {
    // Prevent the default behavior of the form submission (prevents the page from refreshing)
    event.preventDefault();

    // Extract the values of the username and password from the signup form inputs
    const username = document.querySelector('#username-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    // Check if both username and password are provided
    if (username && password) {
        // Use the fetch API to make a POST request to the /api/users endpoint to create a new user
        const response = await fetch('/api/users', {
            method: 'post', // Specify the HTTP method as POST
            body: JSON.stringify({
                username,
                password
            }),
            headers: { 'Content-Type': 'application/json' } // Set the request content type to JSON
        });

        // Check if the response status is okay (HTTP status code 200-299)
        if (response.ok) {
            // If successful, log a message, show an alert, and reload the page
            console.log('success');
            alert('New user created. You can now log in.');
            document.location.reload();
        } else {
            // If not successful, display an alert with the error status text
            alert(response.statusText);
        }
    }
}

// Define an asynchronous function named loginFormHandler that takes an event as a parameter
async function loginFormHandler(event) {
    // Prevent the default behavior of the form submission (prevents the page from refreshing)
    event.preventDefault();

    // Extract the values of the username and password from the login form inputs
    const username = document.querySelector('#username-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    // Check if both username and password are provided
    if (username && password) {
        // Use the fetch API to make a POST request to the /api/users/login endpoint to authenticate the user
        const response = await fetch('/api/users/login', {
            method: 'post', // Specify the HTTP method as POST
            body: JSON.stringify({
                username,
                password
            }),
            headers: { 'Content-Type': 'application/json' } // Set the request content type to JSON
        });

        // Check if the response status is okay (HTTP status code 200-299)
        if (response.ok) {
            // If successful, redirect to the dashboard page
            document.location.replace('/dashboard');
        } else {
            // If not successful, display an alert with the error status text
            alert(response.statusText);
        }
    }
}

// Attach an event listener to the element with the class 'signup-form' for the 'submit' event
document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);

// Attach an event listener to the element with the class 'login-form' for the 'submit' event
document.querySelector('.login-form').addEventListener('submit', loginFormHandler);