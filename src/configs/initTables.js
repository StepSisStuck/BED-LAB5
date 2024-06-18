const pool = require('../services/db');

const SQLSTATEMENT = `
-- Drop existing tables if they exist
DROP TABLE IF EXISTS User;
DROP TABLE IF EXISTS UserAnswer;
DROP TABLE IF EXISTS SurveyQuestion;
DROP TABLE IF EXISTS Quests;
DROP TABLE IF EXISTS CharacterProgression;
DROP TABLE IF EXISTS MagicalItems;
DROP TABLE IF EXISTS Classes;
DROP TABLE IF EXISTS Spells;
DROP TABLE IF EXISTS CharacterCustomization;

-- Section A: Survey System
CREATE TABLE User (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    username TEXT,
    points INT
);

CREATE TABLE UserAnswer (
    answer_id INT PRIMARY KEY AUTO_INCREMENT,
    answered_question_id INT NOT NULL,
    participant_id INT NOT NULL,
    answer BOOL NOT NULL,
    creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    additional_notes TEXT
);

CREATE TABLE SurveyQuestion (
    question_id INT PRIMARY KEY AUTO_INCREMENT,
    creator_id INT NOT NULL,
    question TEXT NOT NULL
);

-- Insert initial data for SurveyQuestion
INSERT INTO SurveyQuestion (question_id, creator_id, question) 
VALUES
(1, 1, 'Do you buy fruits from FC6?'),
(2, 1, 'Is the fried chicken at FC5 salty?'),
(3, 2, 'Did you recycle any e-waste?'),
(4, 2, 'Do you turn off lights and appliances when not in use?'),
(5, 2, 'Have you visited the cafe at Moberly?');

-- Section B: Mystic Academy Adventures
CREATE TABLE Quests (
    quest_id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    reward_points INT NOT NULL
);

CREATE TABLE CharacterProgression (
    progress_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    quest_id INT NOT NULL,
    status VARCHAR(50) NOT NULL,
    completion_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES User(user_id),
    FOREIGN KEY (quest_id) REFERENCES Quests(quest_id)
);

CREATE TABLE MagicalItems (
    item_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    effect TEXT NOT NULL
);

CREATE TABLE Classes (
    class_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    required_points INT NOT NULL
);

CREATE TABLE Spells (
    spell_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    power INT NOT NULL
);

CREATE TABLE CharacterCustomization (
    customization_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    appearance TEXT NOT NULL,
    abilities TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES User(user_id)
);

-- Insert initial data for Quests
INSERT INTO Quests (quest_id, title, description, reward_points) 
VALUES
(1, 'Defeat the Dragon', 'Slay the dragon terrorizing the village and earn 100 points.', 100),
(2, 'Find the Lost Sword', 'Retrieve the lost sword from the ancient ruins.', 50),
(3, 'Rescue the Villagers', 'Save the villagers captured by the bandits.', 75);

-- Insert initial data for Classes
INSERT INTO Classes (class_id, name, description, required_points)
VALUES
(1, 'Alchemy', 'Learn the art of potion making.', 50),
(2, 'Enchanting', 'Master the skill of imbuing objects with magical properties.', 70);

-- Insert initial data for Spells
INSERT INTO Spells (spell_id, name, description, power)
VALUES
(1, 'Fireball', 'A powerful spell that launches a ball of fire at the enemy.', 80),
(2, 'Heal', 'A spell to heal wounds and restore health.', 50);

-- Insert initial data for MagicalItems
INSERT INTO MagicalItems (item_id, name, description, effect)
VALUES
(1, 'Potion of Strength', 'A potion that temporarily increases strength.', 'Increases strength by 50% for 1 hour.'),
(2, 'Amulet of Protection', 'An amulet that provides protection from harm.', 'Reduces damage taken by 20%.');
`;

pool.query(SQLSTATEMENT, (error, results, fields) => {
    if (error) {
        console.error("Error creating tables", error);
    } else {
        console.log("Success.", results);
    }
    process.exit();
});
