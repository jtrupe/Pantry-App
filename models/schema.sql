DROP DATABASE IF EXISTS recipesDB;
CREATE DATABASE recipesDB;
USE recipesDB;

CREATE TABLE users (
id INT NOT NULL auto_increment,
name VARCHAR(100) NOT NULL,
password VARCHAR(255) NOT NULL,
PRIMARY KEY (id)
);

CREATE TABLE masterPantry (
id INT NOT NULL auto_increment,
food_name VARCHAR(100) NOT NULL,
PRIMARY KEY (id)
);

CREATE TABLE userPantry (
    id INT NOT NULL AUTO_INCREMENT,
    food_arr ARRAY,
    amounts ARRAY
);

