// app.js
const createTable = require('./function/create_table');
const dropTable = require('./function/drop_table');
const { usersSchema, deptSchema, teamSchema, matchSchema, rulechema, announcementSchema, playerSchema, playerPerformance } = require('./schema/userSchema');

// Drop table if it exists
// dropTable('users')


// Call the function to create a table
// createTable('users', usersSchema);
// createTable('departments', deptSchema);
// createTable('teams', teamSchema);
// createTable('matches', matchSchema);
// createTable('rules', rulechema);
// createTable('announcements', announcementSchema);
// createTable('players', playerSchema);
createTable('performances', playerPerformance);