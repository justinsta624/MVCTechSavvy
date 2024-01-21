// Function to handle the creation of a new comment on a blog post
const handleNewComment = async (event) => {
    event.preventDefault();

    // Get the input value from the comment form
    const commentText = document.getElementById('comment-text').value.trim();

    // Get the blog post ID from the data attribute
    const postId = event.target.getAttribute('data-post-id');

    try {
        // Send a POST request to create a new comment
        const response = await fetch(`/comments/${postId}`, {
            method: 'POST',
            body: JSON.stringify({ text: commentText }),
            headers: { 'Content-Type': 'application/json' },
        });

        // If the request is successful, reload the page to display the new comment
        if (response.ok) {
            document.location.reload();
        } else {
            // If there's an error, alert the user
            alert('Error has occurred');
        }
    } catch (err) {
        console.error('Error has occurred', err);
    }
};

// Event listener for comment form submission
document.getElementById('comment-form').addEventListener('submit', handleNewComment);