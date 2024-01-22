// Define an asynchronous function named commentFormHandler that takes an event as a parameter
async function commentFormHandler(event) {
    // Prevent the default behavior of the form (prevents the page from refreshing)
    event.preventDefault();

    // Retrieve the comment text from the textarea input
    const comment_text = document.querySelector('textarea[name="comment-body"]').value.trim();

    // Extract the post_id from the current URL
    const post_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    // Check if the comment text is not empty
    if (comment_text) {
        // Use the fetch API to make a POST request to the /api/comments endpoint
        const response = await fetch('/api/comments', {
            method: 'POST', // Specify the HTTP method
            body: JSON.stringify({ // Convert the data to JSON format and set it as the request body
                post_id,
                comment_text
            }),
            headers: {
                'Content-Type': 'application/json' // Specify the content type as JSON
            }
        });

        // Check if the response status is okay (HTTP status code 200-299)
        if (response.ok) {
            // If successful, reload the page to display the new comment
            document.location.reload();
        } else {
            // If not successful, display an alert with the error status text
            alert(response.statusText);
        }
    }
}

// Attach an event listener to the form with the class 'comment-form' for the 'submit' event
document.querySelector('.comment-form').addEventListener('submit', commentFormHandler);