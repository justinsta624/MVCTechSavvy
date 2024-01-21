// Importing necessary modules from Sequelize, the connection instance, and bcrypt for password hashing
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');
const bcrypt = require('bcrypt');

// Defining the User model by extending the Sequelize Model class
class User extends Model {
    // Method to check the password during login
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    }
}

// Initializing the User model with the specified attributes and options
User.init(
    {
        // Defining the 'user_id' attribute as an auto-incrementing integer primary key
        user_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        // Defining the 'name' attribute as a string that cannot be null
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        // Defining the 'email' attribute as a string that must be a valid email address and is unique
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        // Defining the 'active_ind' attribute as an integer with a default value of 1
        active_ind: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
        },
        // Defining the 'password' attribute as a string that cannot be null and must have a minimum length of 8 characters
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [8],
            },
        },
    },
    {
        // Sequelize hooks for password hashing before creation and update
        hooks: {
            async beforeCreate(newUserData) {
                newUserData.password = await bcrypt.hash(newUserData.password, 10);
                return newUserData;
            },
            async beforeUpdate(updatedUserData, options) {
                if (updatedUserData.changed('password')) {
                    const hashedPassword = await bcrypt.hash(updatedUserData.password, 10);
                    updatedUserData.password = hashedPassword;
                }
                return updatedUserData;
            },
        },
        // Configuring Sequelize settings for the model
        sequelize,
        timestamps: false, // Disabling timestamps (createdAt and updatedAt columns)
        freezeTableName: true, // Preventing Sequelize from pluralizing the table name
        underscored: true, // Using underscores instead of camelCase for column names
        modelName: 'user', // Setting the model name to 'user'
    }
);

// Exporting the User model for use in other parts of the application
module.exports = User;