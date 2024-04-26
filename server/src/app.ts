import express, { Request, Response, NextFunction } from 'express'
import 'dotenv/config'
import cors from 'cors'
import { userRoutes } from './app/modules/user/user.route'
import helmet from 'helmet'
import { departmentRoutes } from './app/modules/department/department.route'
import { teamRoutes } from './app/modules/team/team.route'
import { matchRoutes } from './app/modules/match/match.route'
import { ruleRoutes } from './app/modules/rules/rules.route'
import { announcementRoutes } from './app/modules/announcements/announcement.route'
import { ownerRoutes } from './app/modules/owner/owner.route'
import { playerRoutes } from './app/modules/player/player.route'
import { refereeRoutes } from './app/modules/referee/referee.route'
import { dashboardRoutes } from './app/modules/dashboard/dashboard.route'

const app = express()

app.use(express.json())
app.use(cors())
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use('/uploads', express.static('uploads'))

// Route handlings;
app.use('/api/v1/users', userRoutes)
app.use('/api/v1/departments', departmentRoutes)
app.use('/api/v1/teams', teamRoutes)
app.use('/api/v1/matches', matchRoutes)
app.use('/api/v1/rules', ruleRoutes)
app.use('/api/v1/announcements', announcementRoutes)
app.use('/api/v1/owners', ownerRoutes)
app.use('/api/v1/players', playerRoutes)
app.use('/api/v1/referees', refereeRoutes)
app.use('/api/v1/dashboard', dashboardRoutes)

// SSL Commerze or any redirect routes will be Here, from controller with functions

app.get('/', (req: Request, res: Response) => {
    res.status(200).json({
        success: true,
        message: 'Welcome to Node.js Server',
        author: 'Md. Jonayed',
        github: 'https://github.com/mdjonayed6',
        linkedin: 'https://www.linkedin.com/in/md-jonayed/',
    })
})

// Route Error
app.all('*', (req: Request, res: Response) => {
    res.status(404).json({
        status: 404,
        message: 'Not Found'
    })
})

// Global Error Handler
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
    if (error) {
        res.status(500).send({
            success: false,
            message: error.message
        })
    }
})

export default app;