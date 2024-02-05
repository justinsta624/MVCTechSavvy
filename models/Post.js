// Importing necessary modules from Sequelize
const { Model, DataTypes } = require('sequelize');

// Importing the Sequelize instance (connection to the database)
const sequelize = require('../config/connection.js');

// Defining the Post model by extending the Sequelize Model class
class Post extends Model { }

// Initializing the Post model with the specified attributes and options
Post.init(
    {
        // Defining the 'post_id' attribute as an auto-incrementing integer primary key
        post_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        // Defining the 'post_title' attribute as a long text field that cannot be null
        post_title: {
            type: DataTypes.TEXT('long'),
            allowNull: false
        },
        // Defining the 'post_content' attribute as a long text field that cannot be null
        post_content: {
            type: DataTypes.TEXT('long'),
            allowNull: false
        },
        // Defining the 'post_date' attribute as a date field with a default value of the current date and time
        format_date: {
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
        modelName: 'post', // Setting the model name to 'post'
    }
);

// Exporting the Post model for use in other parts of the application
module.exports = Post;