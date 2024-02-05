// Define an asynchronous function named editFormHandler that takes an event as a parameter
async function editFormHandler(event) {
    // Prevent the default behavior of the form submission (prevents the page from refreshing)
    event.preventDefault();

    // Extract the values of the title, post_text, and post ID from the form inputs and the current URL
    const post_title = document.querySelector('input[name="post-title"]').value;
    const post_content = document.querySelector('textarea[name="post_content"]').value;
    const post_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    // Use the fetch API to make a PUT request to the /api/posts/:id endpoint
    const response = await fetch(`/api/posts/${post_id}`, {
        method: 'PUT', // Specify the HTTP method as PUT
        body: JSON.stringify({
            post_title,
            post_content
        }),
        headers: {
            'Content-Type': 'application/json' // Set the request content type to JSON
        }
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

// Attach an event listener to the element with the class 'edit-post-form' for the 'submit' event
document.querySelector('.edit-post-form').addEventListener('submit', editFormHandler);