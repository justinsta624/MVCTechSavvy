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
        },
        // Defining the 'comment_content' attribute as a string that cannot be null
        comment_content: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        // Defining the 'user_id' attribute as an integer and setting up a foreign key relationship with the 'user' model
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'user_id'
            },
        },
        // Defining the 'post_id' attribute as an integer and setting up a foreign key relationship with the 'post' model
        post_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'post',
                key: 'post_id',
            },
        },
    },
    {
        // Configuring Sequelize settings for the model
        sequelize,
        freezeTableName: true, // Preventing Sequelize from pluralizing the table name
        underscored: true, // Using underscores instead of camelCase for column names
        modelName: 'comment', // Setting the model name to 'comment'
    }
);

// Exporting the Comment model for use in other parts of the application
module.exports = Comment;