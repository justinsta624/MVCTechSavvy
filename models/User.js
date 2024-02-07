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
            primaryKey: true, // 'user_id' is the primary key
            autoIncrement: true, // 'user_id' auto-increments with each new entry
            allowNull: false, // 'user_id' cannot be null
        },
        // Defining the 'name' attribute as a string that cannot be null
        username: {
            type: DataTypes.STRING,
            allowNull: false, // 'username' cannot be null
        },
        // Defining the 'email' attribute as a string that must be a valid email address and is unique
        email: {
            type: DataTypes.STRING,
            allowNull: false, // 'email' cannot be null
            unique: true, // 'email' must be unique
            validate: {
                isEmail: true, // 'email' must be a valid email address
            },
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW, // Default value for 'created_at' is the current timestamp
        },
        // Defining the 'active_ind' attribute as an integer with a default value of 1
        active_ind: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1, // Default value for 'active_ind' is 1
        },
        // Defining the 'password' attribute as a string that cannot be null and must have a minimum length of 8 characters
        password: {
            type: DataTypes.STRING,
            allowNull: false, // 'password' cannot be null
            validate: {
                len: [4], // 'password' must have a minimum length of 4 characters
            },
        },
    },
    {
        // Sequelize hooks for password hashing before creation and update
        hooks: {
            // Hashing the password before creating a new user
            async beforeCreate(newUserData) {
                newUserData.password = await bcrypt.hash(newUserData.password, 10); // Hashing the password with bcrypt
                return newUserData;
            },
            // Hashing the password before updating an existing user (if the password is changed)
            async beforeUpdate(updatedUserData, options) {
                if (updatedUserData.changed('password')) {
                    const hashedPassword = await bcrypt.hash(updatedUserData.password, 10); // Hashing the updated password with bcrypt
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