// Importing necessary modules from Sequelize
const { Model, DataTypes } = require('sequelize');

// Importing the Sequelize instance (connection to the database)
const sequelize = require('../config/connection.js');

// Defining the Blog model by extending the Sequelize Model class
class Blog extends Model { }

// Initializing the Blog model with the specified attributes and options
Blog.init(
    {
        // Defining the 'blog_id' attribute as an auto-incrementing integer primary key
        blog_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        // Defining the 'blog_title' attribute as a long text field that cannot be null
        blog_title: {
            type: DataTypes.TEXT('long'),
            allowNull: false
        },
        // Defining the 'blog_content' attribute as a long text field that cannot be null
        blog_content: {
            type: DataTypes.TEXT('long'),
            allowNull: false
        },
        // Defining the 'blog_date' attribute as a date field with a default value of the current date and time
        blog_date: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        // Defining the 'active_ind' attribute as an integer with a default value of 1
        active_ind: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
        },
        // Defining the 'user_id' attribute as an integer and setting up a foreign key relationship with the 'user' model
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'user_id',
            },
        },
    },
    {
        // Configuring Sequelize settings for the model
        sequelize,
        timestamps: false, // Disabling timestamps (createdAt and updatedAt columns)
        freezeTableName: true, // Preventing Sequelize from pluralizing the table name
        underscored: true, // Using underscores instead of camelCase for column names
        modelName: 'blog', // Setting the model name to 'blog'
    }
);

// Exporting the Blog model for use in other parts of the application
module.exports = Blog;