// Define an asynchronous function named deleteFormHandler that takes an event as a parameter
async function deleteFormHandler(event) {
    // Prevent the default behavior of the button click (prevents the page from refreshing)
    event.preventDefault();

    // Extract the post ID from the current URL
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    // Use the fetch API to make a DELETE request to the /api/posts/:id endpoint
    const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE', // Specify the HTTP method as DELETE
    });

    // Check if the response status is okay (HTTP status code 200-299)
    if (response.ok) {
        // If successful, redirect to the dashboard page
        document.location.replace('/dashboard/');
    } else {
        // If not successful, display an alert with the error status text
        alert(response.statusText);
    }
}

// Attach an event listener to the element with the class 'delete-post-btn' for the 'click' event
document.querySelector('.delete-post-btn').addEventListener('click', deleteFormHandler);