const { User } = require('../models');

const userData = [
    {
        user_id: '1',
        username: 'Hanbyeol(Justin)Lee',
        email: 'justinsta624@gmail.com',
        active_ind: '1',
        password: 'justinsta624@gmail.com'
    },
    {
        user_id: '2',
        username: 'Jude Bellingham',
        email: 'Jude.Bellingham@gmail.com',
        active_ind: '1',
        password: 'Jude.Bellingham@gmail.com'
    },
    {
        user_id: '3',
        username: 'Erling Haaland',
        email: 'Erling.Haaland@gmail.com',
        active_ind: '1',
        password: 'Erling.Haaland@gmail.com'
    },
    {
        user_id: '4',        
        username: 'Kylian Mbappe',
        email: 'Kylian.Mbappe@gmail.com',
        active_ind: '1',
        password: 'Kylian.Mbappe@gmail.com',
    },
    {
        user_id: '5',  
        username: 'Heungmin Son',
        email: 'Heungmin.Son@gmail.com',
        active_ind: '1',
        password: 'Heungmin.Son@gmail.com'
    },
    {
        user_id: '6',  
        username: 'Inactive User',
        email: 'Inactive.User@gmail.com',
        active_ind: '0',
        password: 'Inactive.User@gmail.com',
    },
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;