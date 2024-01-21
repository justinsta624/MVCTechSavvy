// Importing Sequelize models
const Blog = require('./Blog.js');
const Comment = require('./Comment.js');
const User = require('./User.js');

// Defining associations between models

// Blog has many Comments
Blog.hasMany(Comment, {
    foreignKey: 'blog_id',
    onDelete: 'CASCADE',
});

// Comment belongs to a Blog
Comment.belongsTo(Blog, {
    foreignKey: 'blog_id',
});

// User has many Blogs
User.hasMany(Blog, {
    foreignKey: 'user_id',
});

// Blog belongs to a User
Blog.belongsTo(User, {
    foreignKey: 'user_id',
});

// User has many Comments
User.hasMany(Comment, {
    foreignKey: 'user_id',
});

// Comment belongs to a User
Comment.belongsTo(User, {
    foreignKey: 'user_id',
});

module.exports = { Blog, Comment, User };