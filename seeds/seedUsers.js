const { User } = require('../models');

const userData = [
    {
        username: 'Hanbyeol(Justin)Lee',
        email: 'justinsta624@gmail.com',
        password: 'justinsta624@gmail.com',
        active_ind: '1'
    },
    {
        username: 'Jude Bellingham',
        email: 'Jude.Bellingham@gmail.com',
        password: 'Jude.Bellingham@gmail.com',
        active_ind: '1'
    },
    {
        username: 'Erling Haaland',
        email: 'Erling.Haaland@gmail.com',
        password: 'Erling.Haaland@gmail.com',
        active_ind: '1'
    },
    {
        username: 'Kylian Mbappe',
        email: 'Kylian.Mbappe@gmail.com',
        password: 'Kylian.Mbappe@gmail.com',
        active_ind: '1'
    },
    {
        username: 'Heungmin Son',
        email: 'Heungmin.Son@gmail.com',
        password: 'Heungmin.Son@gmail.com',
        active_ind: '1'
    },
    {
        username: 'Inactive User',
        email: 'Inactive.User@gmail.com',
        password: 'Inactive.User@gmail.com',
        active_ind: '0'
    },
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;