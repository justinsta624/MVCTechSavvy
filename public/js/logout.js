// Define an asynchronous function named logout
async function logout() {
    // Use the fetch API to make a POST request to the /api/users/signoutUser endpoint to log out the user
    const response = await fetch('/api/users/logout', {
        method: 'post', // Specify the HTTP method as POST
        headers: { 'Content-Type': 'application/json' } // Set the request content type to JSON
    });

    // Check if the response status is okay (HTTP status code 200-299)
    if (response.ok) {
        // If successful, redirect to the homepage
        document.location.replace('/');
    } else {
        // If not successful, display an alert with the error status text
        alert(response.statusText);
    }
}

// Attach an event listener to the element with the ID 'logout' for the 'click' event
document.querySelector('#logout').addEventListener('click', logout);