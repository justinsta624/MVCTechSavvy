const { Comment } = require('../models');

const commentData = [
    {
        comment_body: 'Great post! I learned a lot.',
        comment_date: '2024-01-09',
        active_ind: '1',
        user_id: '1',
        blog_id: '1',
    },
    {
        comment_body: 'Thanks for sharing this information.',
        comment_date: '2024-01-09',
        active_ind: '1',
        user_id: '2',
        blog_id: '1',
    },
    {
        comment_body: 'I have a question about your post, please check your DM',
        comment_date: '2024-01-09',
        active_ind: '1',
        user_id: '3',
        blog_id: '1',
    },
    {
        comment_body: 'Do you have more examples to share?',
        comment_date: '2024-01-10',
        active_ind: '1',
        user_id: '4',
        blog_id: '1',
    },
    {
        comment_body: 'This helped me understand the topic better.',
        comment_date: '2024-01-11',
        active_ind: '1',
        user_id: '4',
        blog_id: '2',
    },
    {
        comment_body: 'Nah, not really interested in this topic',
        comment_date: '2024-01-12',
        active_ind: '1',
        user_id: '2',
        blog_id: '3',
    },
    {
        comment_body: 'LOL, this is so interesting!',
        comment_date: '2024-01-12',
        active_ind: '1',
        user_id: '2',
        blog_id: '4'
    },
    {
        comment_body: 'I appreciate the detailed breakdown.',
        comment_date: '2024-01-13',
        active_ind: '1',
        user_id: '4',
        blog_id: '5',
    },
    {
        comment_body: 'This concept is fascinating.',
        comment_date: '2024-01-13',
        active_ind: '1',
        user_id: '5',
        blog_id: '5',
    },
    {
        comment_body: 'Can you explain more about it?',
        comment_date: '2024-01-14',
        active_ind: '1',
        user_id: '5',
        blog_id: '6',
    },

];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;