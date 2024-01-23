const { User } = require('../models');

const userData = [
    {
        name: 'Hanbyeol(Justin)Lee',
        email: 'justinsta624@gmail.com',
        password: 'justinsta624@gmail.com',
        active_ind: '1'
    },
    {
        name: 'Jude Bellingham',
        email: 'Jude.Bellingham@gmail.com',
        password: 'Jude.Bellingham@gmail.com',
        active_ind: '1'
    },
    {
        name: 'Erling Haaland',
        email: 'Erling.Haaland@gmail.com',
        password: 'Erling.Haaland@gmail.com',
        active_ind: '1'
    },
    {
        name: 'Kylian Mbappe',
        email: 'Kylian.Mbappe@gmail.com',
        password: 'Kylian.Mbappe@gmail.com',
        active_ind: '1'
    },
    {
        name: 'Heungmin Son',
        email: 'Heungmin.Son@gmail.com',
        password: 'Heungmin.Son@gmail.com',
        active_ind: '1'
    },
    {
        name: 'Inactive User',
        username: 'inactive',
        email: 'Inactive.User@gmail.com',
        password: 'Inactive.User@gmail.com',
        active_ind: '0'
    },
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;