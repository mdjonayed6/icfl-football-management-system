## Project Details

<!-- How to run -->
## Server setup procedure
1. Unzip the server folder
2. Import the database
3. Create database icfl then import it
4. goto server folder 
5. Goto terminal and run:  npm install
6. Run: npx tsc --w
7. Run: npm start

## Client setup procedure
1. Unzip the client folder
2. npm install
3. npm run dev

### Admin
1. Do the registration first
2. Then login by using admin credentials, At first admin will accept all the registered users then others can login
   1. email: admin@gmail.com
   2. pass: 1234
3. Goto Pending users Link
   1. Accept the user, then it will show the user list
4. After login by usign `Organizer` credentials
   1. Your specific organizer has access to create `team` by using owner id

### Organizer
email: organizer2@gmail.com
password: 1234
1. Organizer able view registered owners
2. Can create the team
3. Can create the match, and on the edit button give the score, match stage( Semi Final, Final or Normal Match)
4. Can assign the rule for the match
5. Can view the announcement
6. Add the performance for the specific player by using his university ID
   
### Owner
email: owner2@gmail.com
password: 1234
1. Can view the His team
2. Can view the player, create player and delete player
3. Can view the announcemnt 
4. Can view the Match Schedule

### Player
sakib@gmail.com
1234
1. Can view the Dashboard with point tables
2. Can view Match Schedule and Team Mates
3. Can view the announcement

### Referee
referee2@gmail.com
1234
1. Can view his match schedule
2. Can view the points table
3. Also view the announcemnt