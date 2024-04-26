"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.teamController = void 0;
const queryCollection_1 = require("../../lib/dbQuery/queryCollection");
const deleteFastFile_1 = __importDefault(require("../../lib/file/deleteFastFile"));
const upload_config_1 = require("../../utils/fileManagement/upload.config");
const sendApiResponse_1 = __importDefault(require("../../lib/ApiResponse/sendApiResponse"));
const photoPath_1 = __importDefault(require("../../lib/file/photoPath"));
const createTeam = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Photo upload middleware
        upload_config_1.photoUpload.single('photo')(req, res, (err) => __awaiter(void 0, void 0, void 0, function* () {
            var _a;
            if (err) {
                console.error('Error uploading photo:', err);
                return next(err);
            }
            // Access form data and uploaded file
            const { team_name, owner_id, organizer_id, batch_year, season, } = req.body;
            const photoPath = (_a = req.file) === null || _a === void 0 ? void 0 : _a.path;
            const photoURL = `${req.protocol}://${req.get('host')}/` + (photoPath === null || photoPath === void 0 ? void 0 : photoPath.replace(/\\/g, "/"));
            const existingUser = yield queryCollection_1.Query.selectOne('teams', 'batch_year', batch_year);
            const existingOwner = yield queryCollection_1.Query.selectOne('teams', 'owner_id', owner_id);
            const existingTeam = yield queryCollection_1.Query.selectOne('teams', 'team_name', team_name);
            if (existingUser) {
                (0, deleteFastFile_1.default)(photoPath);
                return res.status(403).send({
                    success: false,
                    message: 'Batch year already exists'
                });
            }
            if (existingTeam) {
                (0, deleteFastFile_1.default)(photoPath);
                return res.status(403).send({
                    success: false,
                    message: 'Team Name already exists'
                });
            }
            if (existingOwner) {
                (0, deleteFastFile_1.default)(photoPath);
                return res.status(403).send({
                    success: false,
                    message: 'Owner already exists'
                });
            }
            // Check for missing or empty fields
            if (!team_name || !owner_id || !organizer_id || !photoPath || !batch_year || !season) {
                // Delete the file if it exists
                if (photoPath) {
                    (0, deleteFastFile_1.default)(photoPath);
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
                const result = yield queryCollection_1.Query.executeQuery(query);
                if (result) {
                    res.status(200).send({
                        success: true,
                        message: 'Team created successfully',
                        userdata: result
                    });
                }
                else {
                    res.status(403).send({
                        success: false,
                        message: 'Team creation failed'
                    });
                }
            }
            catch (error) {
                console.error('Error executing query:', error);
                next(error);
            }
        }));
    }
    catch (error) {
        console.error('Error in createUser controller:', error);
        next(error);
    }
});
const getTeams = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        // Get the teams data along with owner and organizer information
        const teams = yield queryCollection_1.Query.executeQuery(`
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
        (0, sendApiResponse_1.default)(res, 200, true, 'Succssfully fetched', teams);
    }
    catch (error) {
        next(error);
    }
});
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
const deleteTeams = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        // Validate ID to prevent SQL injection
        if (!/^\d+$/.test(id)) {
            throw new Error("Invalid ID");
        }
        const user = yield queryCollection_1.Query.executeQuery(`SELECT photo FROM teams WHERE id ='${id}'`);
        const path = (0, photoPath_1.default)(user[0].photo); //Old photo URL
        const query = `DELETE FROM teams WHERE id = ${id}`;
        const result = yield queryCollection_1.Query.executeQuery(query);
        if (result) {
            (0, sendApiResponse_1.default)(res, 200, true, 'Deleted successfully', result);
            (0, deleteFastFile_1.default)(path);
        }
        else {
            (0, sendApiResponse_1.default)(res, 400, false, 'Deletion failed', result);
        }
    }
    catch (error) {
        next(error);
    }
});
exports.teamController = {
    createTeam,
    getTeams,
    deleteTeams,
    // updateTeams
};
