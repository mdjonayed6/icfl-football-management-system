import { NextFunction, Request, Response } from "express";
import { Query } from "../../lib/dbQuery/queryCollection";
import deleteFastFile from "../../lib/file/deleteFastFile";
import { photoUpload } from "../../utils/fileManagement/upload.config";
import sendApiResponse from "../../lib/ApiResponse/sendApiResponse";
import parsedURL from "../../lib/file/photoPath";


const createTeam = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Photo upload middleware
        photoUpload.single('photo')(req, res, async (err) => {
            if (err) {
                console.error('Error uploading photo:', err);
                return next(err);
            }

            // Access form data and uploaded file
            const {
                team_name, owner_id, organizer_id, batch_year, season,
            } = req.body;

            const photoPath = req.file?.path;
            const photoURL = `${req.protocol}://${req.get('host')}/` + photoPath?.replace(/\\/g, "/");


            const existingUser = await Query.selectOne('teams', 'batch_year', batch_year);
            const existingOwner = await Query.selectOne('teams', 'owner_id', owner_id);
            const existingTeam = await Query.selectOne('teams', 'team_name', team_name);

            if (existingUser) {
                deleteFastFile(photoPath);
                return res.status(403).send({
                    success: false,
                    message: 'Batch year already exists'
                });
            }
            if (existingTeam) {
                deleteFastFile(photoPath);
                return res.status(403).send({
                    success: false,
                    message: 'Team Name already exists'
                });
            }
            if (existingOwner) {
                deleteFastFile(photoPath);
                return res.status(403).send({
                    success: false,
                    message: 'Owner already exists'
                });
            }

            // Check for missing or empty fields
            if (!team_name || !owner_id || !organizer_id || !photoPath || !batch_year || !season) {

                // Delete the file if it exists
                if (photoPath) {
                    deleteFastFile(photoPath);
                }

                return res.status(403).send({
                    success: false,
                    message: 'Please provide all required fields'
                });
            }

            const query = `
                INSERT INTO teams (
                    team_name, owner_id, organizer_id, batch_year, photo, season
                ) 
                VALUES (
                    '${team_name}', '${owner_id}', '${organizer_id}', '${batch_year}', 
                    '${photoURL}', '${season}'
                )
            `;

            try {
                const result = await Query.executeQuery(query);

                if (result) {
                    res.status(200).send({
                        success: true,
                        message: 'Team created successfully',
                        userdata: result
                    });
                } else {
                    res.status(403).send({
                        success: false,
                        message: 'Team creation failed'
                    });
                }
            } catch (error) {
                console.error('Error executing query:', error);
                next(error);
            }
        });
    } catch (error) {
        console.error('Error in createUser controller:', error);
        next(error);
    }
}

const getTeams = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params
    try {
        // Get the teams data along with owner and organizer information
        const teams = await Query.executeQuery(`
            SELECT 
                teams.id,
                teams.team_name,
                teams.owner_id,
                teams.organizer_id,
                teams.batch_year,
                teams.season,
                teams.photo AS team_photo,
                users.username AS owner_username,
                users.email AS owner_email,
                users.phone AS owner_phone,
                users.photo AS owner_photo,
                users.user_id AS owner_user_id,
                organizer.username AS organizer_username,
                organizer.email AS organizer_email,
                organizer.phone AS organizer_phone,
                organizer.photo AS organizer_photo,
                organizer.user_id AS organizer_user_id
            FROM teams
            LEFT JOIN users ON teams.owner_id = users.id
            LEFT JOIN users AS organizer ON teams.organizer_id = organizer.id
            WHERE teams.organizer_id = "${id}"
        `);

        sendApiResponse(res, 200, true, 'Succssfully fetched', teams)
    } catch (error) {
        next(error);
    }
};

// Perfect Update user TODO: Update user
// const updateTeams = async (req: Request, res: Response, next: NextFunction) => {
//     const id = req.params.id;
//     try {
//         // Handle photo upload
//         photoUpload.single('photo')(req, res, async (err) => {
//             if (err) {
//                 console.error('Error uploading photo:', err);
//                 return next(err);
//             }

//             const {
//                 team_name,
//                 owner_id,
//                 organizer_id,
//                 batch_year,
//                 season
//             } = req.body;

//             const existingUser = await Query.selectOne('teams', 'batch_year', batch_year);
//             const existingOwner = await Query.selectOne('teams', 'owner_id', owner_id);
//             const existingTeam = await Query.selectOne('teams', 'team_name', team_name);

//             if (existingUser) {
//                 return res.status(403).send({
//                     success: false,
//                     message: 'Batch year already exists'
//                 });
//             }
//             if (existingTeam) {
//                 return res.status(403).send({
//                     success: false,
//                     message: 'Team Name already exists'
//                 });
//             }
//             if (existingOwner) {
//                 return res.status(403).send({
//                     success: false,
//                     message: 'Owner already exists'
//                 });
//             }

//             let photoURL = '';

//             if (req.file) {
//                 photoURL = `${req.protocol}://${req.get('host')}/${req.file.path.replace(/\\/g, "/")}`;
//             }

//             const user = await Query.selectOneWithColumn('users', ['username', 'password', 'photo', 'email'], 'id', id);

//             if (user && req.file && user.photo) {
//                 deleteFastFile(parsedURL(user.photo));
//             }

//             let query = `UPDATE users SET team_name = '${team_name}', owner_id = '${owner_id}'`;


//             if (organizer_id) {
//                 query += `, organizer_id = '${organizer_id}'`;
//             }

//             if (batch_year) {
//                 query += `, batch_year = '${batch_year}'`;
//             }

//             if (season) {
//                 query += `, season = '${season}'`;
//             }

//             if (photoURL) {
//                 query += `, photo = '${photoURL}'`;
//             }

//             query += ` WHERE id = '${id}'`;

//             const result = await Query.executeQuery(query);

//             if (result) {
//                 res.status(200).send({
//                     success: true,
//                     message: 'User updated successfully',
//                     updated: result
//                 });
//             } else {
//                 res.status(400).send({
//                     success: false,
//                     message: 'User update failed'
//                 });
//             }
//         });
//     } catch (error) {
//         next(error);
//     }
// };

// Delete user
const deleteTeams = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    try {
        // Validate ID to prevent SQL injection
        if (!/^\d+$/.test(id)) {
            throw new Error("Invalid ID");
        }

        const user = await Query.executeQuery(`SELECT photo FROM teams WHERE id ='${id}'`)
        const path = parsedURL(user[0].photo) //Old photo URL
        const query = `DELETE FROM teams WHERE id = ${id}`;
        const result = await Query.executeQuery(query);

        if (result) {
            sendApiResponse(res, 200, true, 'Deleted successfully', result)
            deleteFastFile(path);
        } else {
            sendApiResponse(res, 400, false, 'Deletion failed', result)
        }
    } catch (error) {
        next(error);
    }
}


export const teamController = {
    createTeam,
    getTeams,
    deleteTeams,
    // updateTeams
}