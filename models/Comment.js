// Importing necessary modules from Sequelize
const { Model, DataTypes } = require('sequelize');

// Importing the Sequelize instance (connection to the database)
const sequelize = require('../config/connection.js');

// Defining the Comment model by extending the Sequelize Model class
class Comment extends Model { }

// Initializing the Comment model with the specified attributes and options
Comment.init(
    {
        // Defining the 'comment_id' attribute as an auto-incrementing integer primary key
        comment_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        // Defining the 'comment_content' attribute as a string that cannot be null
        comment_content: {
            type: DataTypes.STRING,
            allowNull: false
        },
        // Defining the 'comment_date' attribute as a date field with a default value of the current date and time
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
        // Defining the 'post_id' attribute as an integer and setting up a foreign key relationship with the 'post' model
        post_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'post',
                key: 'post_id',
            },
        },
    },
    {
        // Configuring Sequelize settings for the model
        sequelize,
        timestamps: false, // Disabling timestamps (createdAt and updatedAt columns)
        freezeTableName: true, // Preventing Sequelize from pluralizing the table name
        underscored: true, // Using underscores instead of camelCase for column names
        modelName: 'comment', // Setting the model name to 'comment'
    }
);

// Exporting the Comment model for use in other parts of the application
module.exports = Comment;