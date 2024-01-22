// Function to handle the creation of a new blog post
const handleNewBlogPost = async (event) => {
    event.preventDefault();

    // Get the input values from the form
    const title = document.getElementById('blog-title').value.trim();
    const content = document.getElementById('blog-content').value.trim();

    try {
        // Send a POST request to create a new blog post
        const response = await fetch('/dashboard/new', {
            method: 'POST',
            body: JSON.stringify({ title, content }),
            headers: { 'Content-Type': 'application/json' },
        });

        // If the request is successful, reload the page to display the new post
        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            // If there's an error, alert the user
            alert('Error has occurred');
        }
    } catch (err) {
        console.error('Error has occurred', err);
    }
};

// Function to handle the deletion of a blog post
const handleDeleteBlogPost = async (event) => {
    if (event.target.hasAttribute('data-blog-id')) {
        const blogId = event.target.getAttribute('data-blog-id');

        try {
            // Send a DELETE request to delete the selected blog post
            const response = await fetch(`/dashboard/${blogId}`, {
                method: 'DELETE',
            });

            // If the request is successful, reload the page to reflect the deletion
            if (response.ok) {
                document.location.reload();
            } else {
                // If there's an error, alert the user
                alert('Error has occurred');
            }
        } catch (err) {
            console.error('Error has occurred', err);
        }
    }
};

// Event listeners for form submission and delete buttons
document.getElementById('new-post-form').addEventListener('submit', handleNewBlogPost);
document.getElementById('blog-list').addEventListener('click', handleDeleteBlogPost);