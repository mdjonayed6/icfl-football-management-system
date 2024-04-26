-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 24, 2024 at 07:01 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `icfl`
--

-- --------------------------------------------------------

--
-- Table structure for table `announcements`
--

CREATE TABLE `announcements` (
  `id` int(11) NOT NULL,
  `organizer_id` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `announcements`
--

INSERT INTO `announcements` (`id`, `organizer_id`, `title`, `description`, `created_at`, `updated_at`) VALUES
(1, '12', 'Important Event', 'We are hosting an important event next week. Please join us!', '2024-04-23 02:24:09', '2024-04-23 02:24:09'),
(4, '28', 'AnnounceMent Org2', 'Here is my announcement about Our all teams.', '2024-04-24 13:41:28', '2024-04-24 13:41:28');

-- --------------------------------------------------------

--
-- Table structure for table `departments`
--

CREATE TABLE `departments` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `departments`
--

INSERT INTO `departments` (`id`, `name`) VALUES
(1, 'CSE');

-- --------------------------------------------------------

--
-- Table structure for table `matches`
--

CREATE TABLE `matches` (
  `id` int(11) NOT NULL,
  `team1_id` varchar(255) DEFAULT NULL,
  `team2_id` varchar(255) DEFAULT NULL,
  `team1_score` varchar(255) DEFAULT NULL,
  `team2_score` varchar(255) DEFAULT NULL,
  `match_date` varchar(255) DEFAULT NULL,
  `match_time` varchar(255) DEFAULT NULL,
  `organizer_id` varchar(255) DEFAULT NULL,
  `match_status` varchar(255) DEFAULT 'upcoming',
  `match_stage` varchar(50) DEFAULT 'normal',
  `referee_id` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `matches`
--

INSERT INTO `matches` (`id`, `team1_id`, `team2_id`, `team1_score`, `team2_score`, `match_date`, `match_time`, `organizer_id`, `match_status`, `match_stage`, `referee_id`, `created_at`, `updated_at`) VALUES
(1, '5', '6', '3', '2', '2024-04-23', '12:00', '12', 'completed', 'normal', '17', '2024-04-22 10:40:33', '2024-04-22 10:40:33'),
(6, '5', '7', '3', '1', '2024-04-20', '10:00', '12', 'completed', 'normal', '17', '2024-04-24 03:32:12', '2024-04-24 03:32:12'),
(7, '5', '8', '4', '3', '2024-04-21', '10:00', '12', 'completed', 'normal', '17', '2024-04-24 03:32:30', '2024-04-24 03:32:30'),
(8, '6', '7', '4', '2', '2024-04-21', '13:00', '12', 'completed', 'normal', '17', '2024-04-24 03:53:13', '2024-04-24 03:53:13'),
(9, '6', '8', '3', '1', '2024-04-22', '11:00', '12', 'completed', 'normal', '17', '2024-04-24 03:54:43', '2024-04-24 03:54:43'),
(10, '7', '8', '1', '1', '2024-04-25', '12:00', '12', 'completed', 'normal', '17', '2024-04-24 03:58:12', '2024-04-24 03:58:12'),
(11, '5', '6', '', '', '2024-05-22', '12:00', '12', 'upcoming', 'Final', '17', '2024-04-24 04:10:08', '2024-04-24 04:10:08'),
(12, '9', '10', '2', '1', '2023-05-24', '14:00', '28', 'completed', 'undefined', '41', '2024-04-24 10:59:41', '2024-04-24 10:59:41'),
(13, '9', '11', '2', '0', '2023-05-25', '12:00', '28', 'completed', 'undefined', '41', '2024-04-24 11:02:49', '2024-04-24 11:02:49'),
(14, '9', '13', '2', '2', '2023-07-02', '10:00', '28', 'completed', 'undefined', '41', '2024-04-24 11:06:24', '2024-04-24 11:06:24'),
(15, '10', '11', '0', '1', '2023-07-26', '12:00', '28', 'completed', 'undefined', '41', '2024-04-24 11:07:49', '2024-04-24 11:07:49'),
(16, '10', '13', '4', '0', '2023-07-27', '12:00', '28', 'completed', 'undefined', '41', '2024-04-24 11:08:03', '2024-04-24 11:08:03'),
(17, '11', '13', '2', '1', '2023-07-28', '12:00', '28', 'completed', 'undefined', '41', '2024-04-24 11:11:06', '2024-04-24 11:11:06');

-- --------------------------------------------------------

--
-- Table structure for table `performances`
--

CREATE TABLE `performances` (
  `id` int(11) NOT NULL,
  `user_id` varchar(255) DEFAULT NULL,
  `goals` varchar(255) DEFAULT NULL,
  `yc` varchar(255) DEFAULT NULL,
  `rc` varchar(255) DEFAULT NULL,
  `assists` varchar(255) DEFAULT NULL,
  `season` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `performances`
--

INSERT INTO `performances` (`id`, `user_id`, `goals`, `yc`, `rc`, `assists`, `season`, `created_at`, `updated_at`) VALUES
(1, '20103000', '3', '0', '0', '1', '2024', '2024-04-24 04:53:40', '2024-04-24 04:53:40'),
(2, '20103000', '3', '0', '0', '3', '2024', '2024-04-24 04:54:06', '2024-04-24 04:54:06'),
(3, '20103000', '1', '0', '0', '0', '2024', '2024-04-24 04:54:19', '2024-04-24 04:54:19'),
(4, '20103001', '2', '1', '0', '6', '2024', '2024-04-24 04:55:49', '2024-04-24 04:55:49'),
(5, '20113002', '2', '1', '1', '2', '2024', '2024-04-24 04:59:02', '2024-04-24 04:59:02'),
(6, '20113003', '1', '0', '0', '2', '2024', '2024-04-24 04:59:28', '2024-04-24 04:59:28'),
(8, '23103001', '2', '0', '0', '3', '2023', '2024-04-24 11:42:14', '2024-04-24 11:42:14'),
(9, '23103002', '3', '0', '0', '2', '2023', '2024-04-24 11:48:52', '2024-04-24 11:48:52'),
(10, '22203002', '4', '0', '0', '0', '2023', '2024-04-24 11:51:08', '2024-04-24 11:51:08');

-- --------------------------------------------------------

--
-- Table structure for table `players`
--

CREATE TABLE `players` (
  `id` int(11) NOT NULL,
  `user_id` varchar(255) DEFAULT NULL,
  `team_id` varchar(255) DEFAULT NULL,
  `uni_id` varchar(255) DEFAULT NULL,
  `position` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `owner_id` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `players`
--

INSERT INTO `players` (`id`, `user_id`, `team_id`, `uni_id`, `position`, `created_at`, `updated_at`, `owner_id`) VALUES
(3, '16', '6', '20103000', 'In-field', '2024-04-23 06:00:37', '2024-04-23 06:00:37', '14'),
(4, '13', '6', '20103001', 'In-field', '2024-04-23 11:02:11', '2024-04-23 11:02:11', '14'),
(5, '18', '5', '20113002', 'In-field', '2024-04-23 14:23:55', '2024-04-23 14:23:55', '15'),
(6, '19', '5', '20113003', 'In-field', '2024-04-23 14:24:37', '2024-04-23 14:24:37', '15'),
(7, '24', '7', '20123000', 'In-field', '2024-04-24 03:36:56', '2024-04-24 03:36:56', '22'),
(8, '25', '7', '20123001', 'In-field', '2024-04-24 03:37:13', '2024-04-24 03:37:13', '22'),
(9, '26', '8', '20133000', 'In-field', '2024-04-24 03:39:45', '2024-04-24 03:39:45', '23'),
(10, '27', '8', '20133001', 'In-field', '2024-04-24 03:39:59', '2024-04-24 03:39:59', '23'),
(11, '33', '9', '23103001', 'In-field', '2024-04-24 10:51:34', '2024-04-24 10:51:34', '29'),
(12, '34', '9', '23103002', 'In-field', '2024-04-24 10:51:51', '2024-04-24 10:51:51', '29'),
(13, '35', '10', '22203001', 'In-field', '2024-04-24 10:52:52', '2024-04-24 10:52:52', '30'),
(14, '36', '10', '22203002', 'In-field', '2024-04-24 10:53:08', '2024-04-24 10:53:08', '30'),
(15, '37', '11', '24103001', 'In-field', '2024-04-24 10:53:58', '2024-04-24 10:53:58', '31'),
(16, '38', '11', '24103002', 'In-field', '2024-04-24 10:54:14', '2024-04-24 10:54:14', '31'),
(17, '39', '13', '21203001', 'In-field', '2024-04-24 10:55:02', '2024-04-24 10:55:02', '32'),
(18, '40', '13', '21203002', 'In-field', '2024-04-24 10:55:20', '2024-04-24 10:55:20', '32');

-- --------------------------------------------------------

--
-- Table structure for table `rules`
--

CREATE TABLE `rules` (
  `id` int(11) NOT NULL,
  `match_id` varchar(255) DEFAULT NULL,
  `organizer_id` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `rules`
--

INSERT INTO `rules` (`id`, `match_id`, `organizer_id`, `title`, `description`, `created_at`, `updated_at`) VALUES
(1, '1', '12', 'Offside Rule', 'Players must not be offside when the ball is played to them by a teammate.', '2024-04-23 01:11:18', '2024-04-23 01:11:18'),
(2, '2', '12', 'Yellow Card', 'A yellow card is shown to a player to caution them for a foul.', '2024-04-23 01:13:40', '2024-04-23 01:13:40');

-- --------------------------------------------------------

--
-- Table structure for table `teams`
--

CREATE TABLE `teams` (
  `id` int(11) NOT NULL,
  `team_name` varchar(255) DEFAULT NULL,
  `owner_id` varchar(255) DEFAULT NULL,
  `organizer_id` varchar(255) DEFAULT NULL,
  `batch_year` varchar(255) DEFAULT NULL,
  `season` varchar(255) DEFAULT NULL,
  `photo` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `teams`
--

INSERT INTO `teams` (`id`, `team_name`, `owner_id`, `organizer_id`, `batch_year`, `season`, `photo`, `created_at`, `updated_at`) VALUES
(5, 'IUBAT X2', '15', '12', '2011', '2024', 'http://localhost:5000/uploads/photos/real-madrid-1713768755822.jpg', '2024-04-22 06:52:35', '2024-04-22 06:52:35'),
(6, 'IUBAT X1', '14', '12', '2010', '2024', 'http://localhost:5000/uploads/photos/barcelona-1713768842371.png', '2024-04-22 06:54:02', '2024-04-22 06:54:02'),
(7, 'IUBAT X3', '22', '12', '2012', '2024', 'http://localhost:5000/uploads/photos/liverpool-1713928701971.png', '2024-04-24 03:18:21', '2024-04-24 03:18:21'),
(8, 'IUBAT X4', '23', '12', '2013', '2024', 'http://localhost:5000/uploads/photos/manchester_united-1713928746810.png', '2024-04-24 03:19:06', '2024-04-24 03:19:06'),
(9, 'BRAVE FIGHTERS', '29', '28', '2310', '2023', 'http://localhost:5000/uploads/photos/logo1-1713953337103.png', '2024-04-24 10:08:57', '2024-04-24 10:08:57'),
(10, 'BINARY STRIKERS', '30', '28', '2220', '2023', 'http://localhost:5000/uploads/photos/logo2-1713953419546.png', '2024-04-24 10:10:19', '2024-04-24 10:10:19'),
(11, 'KICKERS', '31', '28', '2410', '2023', 'http://localhost:5000/uploads/photos/logo3-1713953467921.jpg', '2024-04-24 10:11:07', '2024-04-24 10:11:07'),
(13, 'FALCONS', '32', '28', '2120', '2023', 'http://localhost:5000/uploads/photos/logo3-1713953859427.png', '2024-04-24 10:17:39', '2024-04-24 10:17:39');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `photo` varchar(255) DEFAULT NULL,
  `user_id` varchar(255) DEFAULT NULL,
  `dept_id` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT 'user',
  `status` varchar(50) DEFAULT 'pending',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `email`, `phone`, `photo`, `user_id`, `dept_id`, `role`, `status`, `created_at`, `updated_at`) VALUES
(1, 'admin', 'sha1$5b2abb6f$1$38ddb09be48444e063ec3739c38bcde8421207c2', 'admin@gmail.com', '01912343233', 'http://localhost:5000/uploads/photos/user-1713097125601.png', '1001', '1', 'admin', 'ok', '2024-04-19 23:51:29', '2024-04-19 23:51:29'),
(12, 'Organizer1', 'sha1$26bf9090$1$ed3cb8708d8db16e4577b8f1ba7527eb78414f5c', 'organizer1@gmail.com', '01935991242', 'http://localhost:5000/uploads/photos/boy-1713675090600.jpg', '1002', '1', 'organizer', 'ok', '2024-04-21 04:51:30', '2024-04-21 04:51:30'),
(13, 'player1', 'sha1$b98601cb$1$845dd2ed607d5709e5041703de01ee336ea15dbc', 'player1@gmail.com', '01935991232', 'http://localhost:5000/uploads/photos/user-1713678901367.png', '20103001', '1', 'player', 'ok', '2024-04-21 05:55:01', '2024-04-21 05:55:01'),
(14, 'TeamOwner', 'sha1$a943960d$1$0a8067902f7411995804bfa2da51da24e6baa82d', 'owner@gmail.com', '01935991256', 'http://localhost:5000/uploads/photos/user-1713682779326.png', '1004', '1', 'owner', 'ok', '2024-04-21 06:59:39', '2024-04-21 06:59:39'),
(15, 'TeamOwner2', 'sha1$a862f0c9$1$615d3b2676d0a8e85340f2b0ee4541a136e87990', 'owner2@gmail.com', '01533191232', 'http://localhost:5000/uploads/photos/boy-1713759460682.jpg', '1005', '1', 'owner', 'ok', '2024-04-22 04:17:40', '2024-04-22 04:17:40'),
(16, 'Player2', 'sha1$e2ba6932$1$0ed696346894df15c3c8016a993fb238bf5a4df5', 'player2@gmail.com', '01613165931', 'http://localhost:5000/uploads/photos/user-1713759525199.png', '20103000', '1', 'player', 'ok', '2024-04-22 04:18:45', '2024-04-22 04:18:45'),
(17, 'Referee1', 'sha1$a51f0268$1$44ef087b5d152c1d005c2819d61568821d4409fb', 'referee1@gmail.com', '01614725417', 'http://localhost:5000/uploads/photos/user-1713781374599.png', '1007', '1', 'referee', 'ok', '2024-04-22 10:22:54', '2024-04-22 10:22:54'),
(18, 'Player3', 'sha1$0aef1f2f$1$d4e2166639acf26f224778dd2370118857a93d78', 'player3@gmail.com', '01335991211', 'http://localhost:5000/uploads/photos/user-1713862478675.png', '20113002', '1', 'player', 'ok', '2024-04-23 08:54:38', '2024-04-23 08:54:38'),
(19, 'Player4', 'sha1$98319d92$1$d78825993fbda70d258fe96807e0d45ce782ce05', 'player4@gmail.com', '01611765266', 'http://localhost:5000/uploads/photos/user-1713862534915.png', '20113003', '1', 'player', 'ok', '2024-04-23 08:55:34', '2024-04-23 08:55:34'),
(20, 'Player5', 'sha1$5a4121e8$1$3ecf1a6bc3a5e0f8a8dfad9bad5c84b7f4204dd6', 'player5@gmail.com', '01355991232', 'http://localhost:5000/uploads/photos/user-1713897478073.png', '20103002', '1', 'player', 'ok', '2024-04-23 18:37:58', '2024-04-23 18:37:58'),
(21, 'Player6', 'sha1$1d80e410$1$5eac7035746995cd1eec2565f6aae647dc467aa5', 'player6@gmail.com', '01935993331', 'http://localhost:5000/uploads/photos/user-1713927254866.png', '20113004', '1', 'player', 'ok', '2024-04-24 02:54:14', '2024-04-24 02:54:14'),
(22, 'Owner3', 'sha1$eb9066f4$1$579da8340e49bf8d3d2dae87794ffa6f7f979340', 'owner3@gmail.com', '01435931221', 'http://localhost:5000/uploads/photos/user-1713927905055.png', '1006', '1', 'owner', 'ok', '2024-04-24 03:05:05', '2024-04-24 03:05:05'),
(23, 'Owner4', 'sha1$1a75d88b$1$971ce6b079b2308e42c56988b6f4641e0ce4c776', 'owner4@gmail.com', '01553991233', 'http://localhost:5000/uploads/photos/user-1713927969139.png', '1008', '1', 'owner', 'ok', '2024-04-24 03:06:09', '2024-04-24 03:06:09'),
(24, 'Player7', 'sha1$4d438402$1$a5c19fccd36563094c7dc8093e2b81f80f3198db', 'player7@gmail.com', '01835991243', 'http://localhost:5000/uploads/photos/user-1713929075138.png', '20123000', '1', 'player', 'ok', '2024-04-24 03:24:35', '2024-04-24 03:24:35'),
(25, 'Player8', 'sha1$7e287d16$1$b020461b684230ddbc7d0869912f3ec31fce79cb', 'player8@gmail.com', '01612765957', 'http://localhost:5000/uploads/photos/user-1713929130918.png', '20123001', '1', 'player', 'ok', '2024-04-24 03:25:30', '2024-04-24 03:25:30'),
(26, 'Player9', 'sha1$d7ecd604$1$9565d32b89e67c6991088f991263de07b075eebe', 'player9@gmail.com', '01935591244', 'http://localhost:5000/uploads/photos/user-1713929209460.png', '20133000', '1', 'player', 'ok', '2024-04-24 03:26:49', '2024-04-24 03:26:49'),
(27, 'Player10', 'sha1$7ca074be$1$8dfb3e18b4a2780de78b5bfdcb9c6e7a41e3d71b', 'player10@gmail.com', '01938991267', 'http://localhost:5000/uploads/photos/user-1713929261617.png', '20133001', '1', 'player', 'ok', '2024-04-24 03:27:41', '2024-04-24 03:27:41'),
(28, 'Organizer2', 'sha1$879dffc5$1$9951c6e1db147f2a6164f5f3f3a18ad813f4a8ea', 'organizer2@gmail.com', '01615165931', 'http://localhost:5000/uploads/photos/boy-1713944667644.jpg', '1009', '1', 'organizer', 'ok', '2024-04-24 07:44:27', '2024-04-24 07:44:27'),
(29, 'Owner5', 'sha1$a3275e03$1$1c263b202b8112377f95bd47b913ff75dcbc47c0', 'owner5@gmail.com', '01535991212', 'http://localhost:5000/uploads/photos/user-1713952456045.png', '1010', '1', 'owner', 'ok', '2024-04-24 09:54:16', '2024-04-24 09:54:16'),
(30, 'Owner6', 'sha1$52693e3e$1$e37e5c21b40681777496433781992bef8f616531', 'owner6@gmail.com', '01935492232', 'http://localhost:5000/uploads/photos/img1-1713952514006.jpg', '1011', '1', 'owner', 'ok', '2024-04-24 09:55:14', '2024-04-24 09:55:14'),
(31, 'Owner7', 'sha1$47c4cf32$1$051aaee220614bda0fc033675de194f674237454', 'owner7@gmail.com', '01875991253', 'http://localhost:5000/uploads/photos/user-1713952591078.png', '1012', '1', 'owner', 'ok', '2024-04-24 09:56:31', '2024-04-24 09:56:31'),
(32, 'Owner8', 'sha1$99cef5ee$1$358cabeeec973153a866c7d05024a115dda858a0', 'owner8@gmail.com', '01621725962', 'http://localhost:5000/uploads/photos/user-1713952657022.png', '1013', '1', 'owner', 'ok', '2024-04-24 09:57:37', '2024-04-24 09:57:37'),
(33, 'Liton Das', 'sha1$ba1ee7d0$1$6d62a0328bbea409196aa74ad6da6fd5a362e3d6', 'liton@gmail.com', '01535991231', 'http://localhost:5000/uploads/photos/user-1713954030888.png', '23103001', '1', 'player', 'ok', '2024-04-24 10:20:30', '2024-04-24 10:20:30'),
(34, 'Anamul Haque', 'sha1$3ac253d0$1$2fc647d8b26286a961554d8f371dddd0e0e483fc', 'anamul@gmail.com', '01334191253', 'http://localhost:5000/uploads/photos/user-1713954089609.png', '23103002', '1', 'player', 'ok', '2024-04-24 10:21:29', '2024-04-24 10:21:29'),
(35, 'Imrul', 'sha1$a1b51b60$1$f8721ff15fe018a1db88c370e0b7a0021ddf9c69', 'imrul@gmail.com', '01955991221', 'http://localhost:5000/uploads/photos/user-1713955168321.png', '22203001', '1', 'player', 'ok', '2024-04-24 10:39:28', '2024-04-24 10:39:28'),
(36, 'Sakib', 'sha1$7edfed72$1$612179d9e343a593b8b83452fd99e433a35283c3', 'sakib@gmail.com', '01935211232', 'http://localhost:5000/uploads/photos/user-1713955240345.png', '22203002', '1', 'player', 'ok', '2024-04-24 10:40:40', '2024-04-24 10:40:40'),
(37, 'Musfiq', 'sha1$6c61f627$1$28ff04664e8e0a6979067ed9704484a001f0c3ef', 'musfiq@gmail.com', '01935491231', 'http://localhost:5000/uploads/photos/user-1713955387558.png', '24103001', '1', 'player', 'ok', '2024-04-24 10:43:07', '2024-04-24 10:43:07'),
(38, 'Ajoy', 'sha1$4183019b$1$6e9b0d3af7bd1a19e0643a8cc546fe0fdb3846d7', 'ajoy@gmail.com', '01325991257', 'http://localhost:5000/uploads/photos/user-1713955554603.png', '24103002', '1', 'player', 'ok', '2024-04-24 10:45:54', '2024-04-24 10:45:54'),
(39, 'Tawhid', 'sha1$d06be23f$1$ad96d0f7919ae2d5e6b4e060446d51fd178999a0', 'tawhid@gmail.com', '01935991299', 'http://localhost:5000/uploads/photos/user-1713955671944.png', '21203001', '1', 'player', 'ok', '2024-04-24 10:47:51', '2024-04-24 10:47:51'),
(40, 'Sohan', 'sha1$776d25f3$1$f3d206d3bc59bd7781630d1f1774c9914287ed3e', 'sohan@gmail.com', '01535991298', 'http://localhost:5000/uploads/photos/user-1713955737211.png', '21203002', '1', 'player', 'ok', '2024-04-24 10:48:57', '2024-04-24 10:48:57'),
(41, 'Referee2', 'sha1$3dfbddac$1$f7aa564000a9e45a0d254f9e4a38738d48d324fc', 'referee2@gmail.com', '01611725977', 'http://localhost:5000/uploads/photos/user-1713956291144.png', '1014', '1', 'referee', 'ok', '2024-04-24 10:58:11', '2024-04-24 10:58:11');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `announcements`
--
ALTER TABLE `announcements`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `departments`
--
ALTER TABLE `departments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `matches`
--
ALTER TABLE `matches`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `performances`
--
ALTER TABLE `performances`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `players`
--
ALTER TABLE `players`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `rules`
--
ALTER TABLE `rules`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `teams`
--
ALTER TABLE `teams`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `announcements`
--
ALTER TABLE `announcements`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `departments`
--
ALTER TABLE `departments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `matches`
--
ALTER TABLE `matches`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `performances`
--
ALTER TABLE `performances`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `players`
--
ALTER TABLE `players`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `rules`
--
ALTER TABLE `rules`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `teams`
--
ALTER TABLE `teams`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
