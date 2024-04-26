import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/dashboard/Home";
import Login from "../shared/Login";
import PrivateRoutes from "../PrivateRoutes/PrivateRoutes";
import Department from "../pages/admin/departments/Department";
import Users from "../pages/admin/users/Users";
import CreateUser from "../pages/admin/users/CreateUser";
import UserDetails from "../pages/admin/users/UserDetails";
import EditUser from "../pages/admin/users/EditUser";
import PendingOrganizer from "../pages/admin/users/PendingOrganizer";
import AdminRoutes from "../PrivateRoutes/AdminRoutes";
import OrganizerRoutes from "../PrivateRoutes/OrganizerRoutes";
import Owners from "../pages/ioc/Owners";
import PendingOwners from "../pages/ioc/PendingOwners";
import CreateTeam from "../pages/ioc/CreateTeam";
import Teams from "../pages/ioc/Teams";
import Matches from "../pages/matches/Matches";
import CreateMatch from "../pages/matches/CreateMatch";
import EditMatch from "../pages/matches/EditMatch";
import Rules from "../pages/ioc/rules/Rules";
import CreateRule from "../pages/ioc/rules/CreateRule";
import EditRule from "../pages/ioc/rules/EditRule";
import Announcements from "../pages/ioc/announcements/Announcements";
import CreateAnnouncements from "../pages/ioc/announcements/CreateAnnouncements";
import EditAnnouncement from "../pages/ioc/announcements/EditAnnouncement";
import Players from "../pages/owner/Players";
import CreatePlayer from "../pages/owner/CreatePlayer";
import EditPlayer from "../pages/owner/EditPlayer";
import MatchSchedule from "../pages/owner/MatchSchedule";
import MatchRules from "../pages/owner/MatchRules";
import AnnouncementsOwner from "../pages/owner/AnnouncementsOwner";
import PlayerMatchSchedule from "../pages/player/PlayerMatchSchedule";
import PlayerTeamMate from "../pages/player/PlayerTeamMate";
import PlayAnnouncement from "../pages/player/PlayAnnouncement";
import HomePage from "../pages/Home/Home";
import UserReport from "../pages/admin/Report/UserReport";
import PointsTableReport from "../pages/admin/Report/PointsTableReport";
import CreatePerformance from "../pages/ioc/CreatePerformance";
import OwnerPlayer from "../pages/ioc/OwnerPlayer";

const router = createBrowserRouter([
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/register",
        element: <CreateUser />,
    },
    {
        path: '/',
        element: <HomePage />,
    },
    {
        path: "/dashboard",
        element: <PrivateRoutes><MainLayout /></PrivateRoutes>,
        children: [
            {
                path: "",
                element: <Home />,
            },
            {
                path: "departments",
                element: <AdminRoutes><Department /></AdminRoutes>,
            },
            {
                path: "users",
                element: <AdminRoutes><Users /></AdminRoutes>,
            },
            {
                path: "create-user",
                element: <AdminRoutes><CreateUser /></AdminRoutes>,
            },
            {
                path: "user-details/:id",
                element: <UserDetails />,
            },
            {
                path: "edit-user/:id",
                element: <AdminRoutes><EditUser /></AdminRoutes>,
            },
            {
                path: "pending-organizer",
                element: <AdminRoutes><PendingOrganizer /></AdminRoutes>,
            },
            {
                path: "owners",
                element: <OrganizerRoutes><Owners /></OrganizerRoutes>,
            },
            {
                path: "pending-owners",
                element: <OrganizerRoutes><PendingOwners /></OrganizerRoutes>,
            },
            {
                path: "teams",
                element: <OrganizerRoutes><Teams /></OrganizerRoutes>,
            },
            {
                path: "create-team",
                element: <OrganizerRoutes><CreateTeam /></OrganizerRoutes>,
            },
            {
                path: "matches",
                element: <OrganizerRoutes><Matches /></OrganizerRoutes>,
            },
            {
                path: "create-matches",
                element: <OrganizerRoutes><CreateMatch /></OrganizerRoutes>,
            },
            {
                path: "match-edit/:id",
                element: <OrganizerRoutes><EditMatch /></OrganizerRoutes>,
            },
            {
                path: "rules",
                element: <OrganizerRoutes><Rules /></OrganizerRoutes>,
            },
            {
                path: "create-rule",
                element: <OrganizerRoutes><CreateRule /></OrganizerRoutes>,
            },
            {
                path: "edit-rule/:id",
                element: <OrganizerRoutes><EditRule /></OrganizerRoutes>,
            },
            {
                path: "announcements",
                element: <OrganizerRoutes><Announcements /></OrganizerRoutes>,
            },
            {
                path: "create-announcement",
                element: <OrganizerRoutes><CreateAnnouncements /></OrganizerRoutes>,
            },
            {
                path: "edit-announcement/:id",
                element: <OrganizerRoutes><EditAnnouncement /></OrganizerRoutes>,
            },
            {
                path: "players",
                element: <><Players /></>,
            },
            {
                path: "create-player",
                element: <><CreatePlayer /></>,
            },
            {
                path: "edit-player/:id",
                element: <><EditPlayer /></>,
            },
            {
                path: "match-schedule",
                element: <><MatchSchedule /></>,
            },
            {
                path: "create-performance",
                element: <><CreatePerformance /></>,
            },
            {
                path: "match-rules/:id",
                element: <><MatchRules /></>,
            },
            {
                path: "owner-announcements",
                element: <><AnnouncementsOwner /></>,
            },
            {
                path: "player-match-schedule/:id",
                element: <><PlayerMatchSchedule /></>,
            },
            {
                path: "player-team-mate/:id",
                element: <><PlayerTeamMate /></>,
            },
            {
                path: "myteam-announcements",
                element: <><PlayAnnouncement /></>,
            },
            {
                path: "user-report",
                element: <><UserReport /></>,
            },
            {
                path: "points-table-report",
                element: <><PointsTableReport /></>,
            },
            {
                path: "owner-player/:id",
                element: <><OwnerPlayer /></>,
            },
        ]
    }
]);

export default router;