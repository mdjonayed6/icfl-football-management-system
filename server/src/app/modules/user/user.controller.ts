import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { Query } from "../../lib/dbQuery/queryCollection";
import { photoUpload } from "../../utils/fileManagement/upload.config";
import deleteFastFile from "../../lib/file/deleteFastFile";
import passwordHash from 'password-hash';
import parsedURL from "../../lib/file/photoPath";
import sendApiResponse from "../../lib/ApiResponse/sendApiResponse";


// Create user
const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Photo upload middleware
        photoUpload.single('photo')(req, res, async (err) => {
            if (err) {
                console.error('Error uploading photo:', err);
                return next(err);
            }

            // Access form data and uploaded file
            const {
                username, password, email, phone, user_id, dept_id, role,
            } = req.body;

            const photoPath = req.file?.path;
            const photoURL = `${req.protocol}://${req.get('host')}/` + photoPath?.replace(/\\/g, "/");

            const hashedPassword = passwordHash.generate(password);

            const existingUser = await Query.selectOne('users', 'email', email);
            const existingId = await Query.selectOne('users', 'user_id', user_id);

            if (existingUser) {
                deleteFastFile(photoPath);
                return res.status(403).send({
                    success: false,
                    message: 'User email already exists'
                });
            }
            if (existingId) {
                deleteFastFile(photoPath);
                return res.status(403).send({
                    success: false,
                    message: 'User ID already exists'
                });
            }

            // Check for missing or empty fields
            if (!username || !password || !email || !photoPath || !user_id || !dept_id) {

                // Delete the file if it exists
                if (photoPath) {
                    deleteFastFile(photoPath);
                }

                return res.status(400).send({
                    success: false,
                    message: 'Please provide all required fields'
                });
            }

            const query = `
                INSERT INTO users (
                    username, password, email, phone, photo, dept_id, user_id, role
                ) 
                VALUES (
                    '${username}', '${hashedPassword}', '${email}', '${phone}', 
                    '${photoURL}', '${dept_id}', '${user_id}','${role}'
                )
            `;

            try {
                const result = await Query.executeQuery(query);

                if (result) {
                    res.status(200).send({
                        success: true,
                        message: 'User created successfully',
                        userdata: result
                    });
                } else {
                    res.status(403).send({
                        success: false,
                        message: 'User creation failed'
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
};

// Get all users
const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    const currentPage = req.query.currentPage ? parseInt(req.query.currentPage as string) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 5;
    const searchParams: Record<string, any> = {};

    // Check for search query parameters
    if (req.query.username) {
        searchParams.username = req.query.username;
    }
    if (req.query.email) {
        searchParams.email = req.query.email;
    }

    try {
        const result = await Query.Paginate('users', currentPage, limit, [], 'id', 'DESC', searchParams, ['status="ok"'])
        if (result) {
            sendApiResponse(res, 200, true, 'Users fetched successfully.', result);
        }

    } catch (error) {
        sendApiResponse(res, 400, false, 'User not found', error);
    }
}

// Getting a single user
const getSingleUser = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;

    try {
        // Execute the query
        const userResult = await Query.selectOne('users', 'id', id);

        // If user not found, return error
        if (!userResult || userResult.length === 0) {
            return sendApiResponse(res, 404, false, 'User not found');
        }

        // Extract the first row as the user object
        // const user = userResult[0];

        // Respond with the fetched user information
        sendApiResponse(res, 200, true, 'User fetched successfully', userResult)
    } catch (err) {
        next(err);
    }

};

// Get Pending Organizer
const getPendingUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await Query.filterTable('users', [], ['status = "pending"'])
        if (result) {
            sendApiResponse(res, 200, true, 'Pending Organizer successfully retrieved', result)
        }
        else {
            sendApiResponse(res, 403, false, 'Organizer not found', result)
        }
    } catch (error) {
        next(error)
    }
}

const acceptPendingOrganizer = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    try {
        // Update the status of the organizer to "ok"
        const result = await Query.executeQuery(`UPDATE users SET status='ok' WHERE id='${id}'`)

        // Send a success response
        sendApiResponse(res, 200, true, 'Updated succesully', result)
    } catch (error) {
        next(error);
    }
};

// // Get Pending Players
// const getPendingPlayers = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const result = await Query.filterTable('users', [], ['status = "pending"', 'role = "player"']);
//         if (result && result.length > 0) {
//             sendApiResponse(res, 200, true, 'Pending Players successfully retrieved', result);
//         } else {
//             sendApiResponse(res, 404, false, 'Pending Players not found', []);
//         }
//     } catch (error) {
//         next(error);
//     }
// }

// // Get Pending Team Owner
// const getPendingTeamOwner = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const result = await Query.filterTable('users', [], ['status = "pending"', 'role = "owner"']);
//         if (result) {
//             sendApiResponse(res, 200, true, 'Pending Team Owners successfully retrieved', result);
//         } else {
//             sendApiResponse(res, 404, false, 'Pending Team Owners not found', []);
//         }
//     } catch (error) {
//         next(error);
//     }
// }

const getAllTeamOwners = async (req: Request, res: Response, next: NextFunction) => {
    const currentPage = req.query.currentPage ? parseInt(req.query.currentPage as string) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 5;
    const searchParams: Record<string, any> = {};

    // Check for search query parameters
    if (req.query.username) {
        searchParams.username = req.query.username;
    }
    if (req.query.email) {
        searchParams.email = req.query.email;
    }

    try {
        // Filter by status="ok" to get only approved team owners
        const result = await Query.Paginate('users', currentPage, limit, [], 'id', 'DESC', searchParams, ['status="ok"', 'role="owner"']);

        if (result) {
            sendApiResponse(res, 200, true, 'Team owners fetched successfully.', result);
        } else {
            sendApiResponse(res, 404, false, 'No team owners found.', null);
        }
    } catch (error) {
        sendApiResponse(res, 400, false, 'Error fetching team owners.', error);
    }
};

// // Get Pending Referee
// const getPendingReferee = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const result = await Query.filterTable('users', [], ['status = "pending"', 'role = "referee"']);
//         if (result && result.length > 0) {
//             sendApiResponse(res, 200, true, 'Pending Referees successfully retrieved', result);
//         } else {
//             sendApiResponse(res, 404, false, 'Pending Referees not found', []);
//         }
//     } catch (error) {
//         next(error);
//     }
// }


// Perfect Update user TODO: Update user
const updateUser = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    try {
        // Handle photo upload
        photoUpload.single('photo')(req, res, async (err) => {
            if (err) {
                console.error('Error uploading photo:', err);
                return next(err);
            }

            const {
                username,
                password,
                email,
                phone,
                dept_id,
                user_id,
                role,
            } = req.body;

            let photoURL = '';

            if (req.file) {
                photoURL = `${req.protocol}://${req.get('host')}/${req.file.path.replace(/\\/g, "/")}`;
            }

            const user = await Query.selectOneWithColumn('users', ['username', 'password', 'photo', 'email'], 'id', id);

            if (user && req.file && user.photo) {
                deleteFastFile(parsedURL(user.photo));
            }

            let query = `UPDATE users SET username = '${username}', email = '${email}'`;

            if (password) {
                query += `, password = '${passwordHash.generate(password)}'`;
            }
            if (user_id) {
                query += `, user_id = '${user_id}'`;
            }

            if (phone) {
                query += `, phone = '${phone}'`;
            }

            if (dept_id) {
                query += `, dept_id = '${dept_id}'`;
            }

            if (role) {
                query += `, role = '${role}'`;
            }

            if (photoURL) {
                query += `, photo = '${photoURL}'`;
            }

            query += ` WHERE id = '${id}'`;

            const result = await Query.executeQuery(query);

            if (result) {
                res.status(200).send({
                    success: true,
                    message: 'User updated successfully',
                    updated: result
                });
            } else {
                res.status(400).send({
                    success: false,
                    message: 'User update failed'
                });
            }
        });
    } catch (error) {
        next(error);
    }
};


// Delete user
const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    try {
        // Validate ID to prevent SQL injection
        if (!/^\d+$/.test(id)) {
            throw new Error("Invalid ID");
        }

        const user = await Query.executeQuery(`SELECT photo FROM users WHERE id ='${id}'`)
        const path = parsedURL(user[0].photo) //Old photo URL
        const query = `DELETE FROM users WHERE id = ${id}`;
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

// User sign in
const signInUser = async (req: Request, res: Response, next: NextFunction) => {
    const email = req.body.email;
    const password = req.body.password;

    try {
        // const query = `SELECT username,email,password FROM users WHERE email='${email}'`
        const user = await Query.selectOne('users', 'email', email)
        if (!user) {
            return res.status(403).send({
                success: false,
                message: 'Invalid email or password'
            });
        }
        const isPasswordValid = passwordHash.verify(password, user.password);
        if (!isPasswordValid) {
            return res.status(403).send({
                success: false,
                message: 'Invalid email or password'
            });
        }

        const isPending = user.status
        if (isPending == 'pending') {
            return res.status(403).send({
                success: false,
                message: 'Wait for the approval'
            });
        }

        if (isPasswordValid && user) {
            // Sign in jwt token
            const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
            const token = jwt.sign({ user }, `${accessTokenSecret}`, {
                expiresIn: '1h'
            })

            res.status(200).json({
                success: true,
                user: user,
                token: token
            });
        }
        else {
            res.status(403).send({
                success: false,
                message: 'Invalid username or password'
            })
        }
    } catch (error) {
        res.status(403).send({
            success: false,
            message: 'Invalid username or password'
        })
    }
}

// Get List of Referee
const getReferees = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const query = `SELECT * FROM users WHERE role = 'referee'`;
        const referees = await Query.executeQuery(query);

        if (referees.length === 0) {
            return sendApiResponse(res, 404, false, 'Referee not found ')
        }
        sendApiResponse(res, 200, true, 'Referee found successfully', referees)
    } catch (error) {
        next(error);
    }
};


// These are accessible from different files.
export const userController = {
    createUser,
    getAllUsers,
    getSingleUser,
    getPendingUsers,
    // getPendingPlayers,
    // getPendingTeamOwner,
    // getPendingReferee,
    updateUser,
    deleteUser,
    signInUser,
    acceptPendingOrganizer,
    getAllTeamOwners,
    getReferees
}