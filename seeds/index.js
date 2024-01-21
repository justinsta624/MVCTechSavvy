const sequelize = require('../config/connection.js');

const seedBlogs = require('./seedBlogs.js');
const seedComments = require('./seedComments.js');
const seedUsers = require('./seedUsers.js');

const seedAll = async () => {
    await sequelize.sync({ force: true });
    console.log('\n----- DATABASE SYNCED -----\n');
    await seedBlogs();
    console.log('\n----- BLOGS SEEDED -----\n');
    await seedComments();
    console.log('\n----- COMMENTS SEEDED -----\n');
    await seedUsers();
    console.log('\n----- USERS SEEDED -----\n');

    process.exit(0);
};

seedAll();