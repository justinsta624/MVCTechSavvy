// Define an asynchronous function named newFormHandler that takes an event as a parameter
async function newFormHandler(event) {
    // Prevent the default behavior of the form (prevents the page from refreshing)
    event.preventDefault();

    // Retrieve values from the form inputs
    const post_title = document.querySelector('input[name="post-title"]').value;
    const post_content = document.querySelector('textarea[name="post_content"]').value;

    // Use the fetch API to make a POST request to the /api/posts endpoint
    const response = await fetch(`/api/posts`, {
        method: 'POST', // Specify the HTTP method
        body: JSON.stringify({ // Convert the data to JSON format and set it as the request body
            post_title,
            post_content
        }),
        headers: {
            'Content-Type': 'application/json' // Specify the content type as JSON
        }
    });
    // tester
    // Check if the response status is okay (HTTP status code 200-299)
    if (response.ok) {
        // If successful, redirect the user to the dashboard page
        document.location.replace('/dashboard');
    } else {
        // If not successful, display an alert with the error status text
        alert(response.statusText);
    }
}

// Attach an event listener to the form with the class 'new-post-form' for the 'submit' event
document.querySelector('.new-post-form').addEventListener('submit', newFormHandler);