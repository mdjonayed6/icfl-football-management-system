const usersSchema = {
    user_id: 'INT AUTO_INCREMENT PRIMARY KEY',
    username: 'VARCHAR(255) NULL',
    password: 'VARCHAR(255) NULL',
    email: 'VARCHAR(255) NULL',
    phone: 'VARCHAR(255) NULL',
    photo: 'VARCHAR(255) NULL',
    dept_id: 'VARCHAR(255) NULL',
    user_id: 'VARCHAR(255) NULL',
    role: 'VARCHAR(255) NULL',
    created_at: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP',
    updated_at: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP'
};

const deptSchema = {
    id: 'INT AUTO_INCREMENT PRIMARY KEY',
    name: 'VARCHAR(255) NULL'
}

const teamSchema = {
    id: 'INT AUTO_INCREMENT PRIMARY KEY',
    team_name: 'VARCHAR(255) NULL',
    owner_id: 'VARCHAR(255) NULL',
    organizer_id: 'VARCHAR(255) NULL',
    batch_year: 'VARCHAR(255) NULL',
    season: 'VARCHAR(255) NULL',
    logo: 'VARCHAR(255) NULL',
    created_at: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP',
    updated_at: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP'
}

const matchSchema = {
    id: 'INT AUTO_INCREMENT PRIMARY KEY',
    team1_id: 'VARCHAR(255) NULL',
    team2_id: 'VARCHAR(255) NULL',
    team1_score: 'VARCHAR(255) NULL',
    team2_score: 'VARCHAR(255) NULL',
    match_date: 'VARCHAR(255) NULL',
    match_time: 'VARCHAR(255) NULL',
    organizer_id: 'VARCHAR(255) NULL',
    match_status: "VARCHAR(255) DEFAULT 'upcoming'",
    referee_id: 'VARCHAR(255) NULL',
    created_at: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP',
    updated_at: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP'
};

const rulechema = {
    id: 'INT AUTO_INCREMENT PRIMARY KEY',
    match_id: 'VARCHAR(255) NULL',
    organizer_id: 'VARCHAR(255) NULL',
    title: 'VARCHAR(255) NULL',
    description: 'VARCHAR(255) NULL',
    created_at: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP',
    updated_at: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP'
};

const announcementSchema = {
    id: 'INT AUTO_INCREMENT PRIMARY KEY',
    organizer_id: 'VARCHAR(255) NULL',
    title: 'VARCHAR(255) NULL',
    description: 'VARCHAR(255) NULL',
    created_at: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP',
    updated_at: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP'
};

const playerSchema = {
    id: 'INT AUTO_INCREMENT PRIMARY KEY',
    user_id: 'VARCHAR(255) NULL',
    team_id: 'VARCHAR(255) NULL',
    uni_id: 'VARCHAR(255) NULL',
    owner_id: 'VARCHAR(255) NULL',
    position: 'VARCHAR(255) NULL',
    created_at: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP',
    updated_at: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP'
};
const playerPerformance = {
    id: 'INT AUTO_INCREMENT PRIMARY KEY',
    user_id: 'VARCHAR(255) NULL',
    goals: 'VARCHAR(255) NULL',
    yc: 'VARCHAR(255) NULL',
    rc: 'VARCHAR(255) NULL',
    assists: 'VARCHAR(255) NULL',
    season: 'VARCHAR(255) NULL',
    created_at: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP',
    updated_at: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP'
};


module.exports = {
    usersSchema,
    deptSchema,
    teamSchema,
    matchSchema,
    rulechema,
    announcementSchema,
    playerSchema,
    playerPerformance
};