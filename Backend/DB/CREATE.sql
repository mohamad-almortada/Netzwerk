
CREATE TABLE IF NOT EXISTS users(
  user_id INT NOT NULL AUTO_INCREMENT,
  email  VARCHAR(255) NOT NULL,
  public_email VARCHAR(255) DEFAULT NULL,
  title VARCHAR(127) DEFAULT NULL,
  title_secondary VARCHAR(127) DEFAULT NULL,
  firstname VARCHAR(255) NOT NULL,
  lastname VARCHAR(255) NOT NULL,
  verified BOOLEAN DEFAULT 0,
  verify_token   VARCHAR(255) NOT NULL,
  verify_expiry TIMESTAMP NOT NULL,
  website VARCHAR(255) DEFAULT NULL,
  tel VARCHAR(31) DEFAULT NULL,
  activities VARCHAR(500) DEFAULT NULL,
  fieldsOfResearch VARCHAR(500) DEFAULT NULL,
  additionalLinks VARCHAR(500) DEFAULT NULL,
  lat VARCHAR(63),
  lon VARCHAR(63),
  position VARCHAR(127) NOT NULL,
  profile_image_src VARCHAR(255) DEFAULT NULL,
  PRIMARY KEY (user_id),
  FOREIGN KEY (lat, lon) REFERENCES geoLocations(lat, lon) ON UPDATE CASCADE,
  FOREIGN KEY (position) REFERENCES positions(position) ON UPDATE CASCADE,
  UNIQUE KEY unique_email (email)
);


CREATE TABLE IF NOT EXISTS positions (
  position VARCHAR(255) NOT NULl,
  PRIMARY KEY (position)
);  


CREATE TABLE IF NOT EXISTS keywords(
    keyword_id INT AUTO_INCREMENT,
    keyword VARCHAR(255), 
    UNIQUE KEY unique_keyword(keyword),
    PRIMARY KEY (keyword_id) 
);

-- junction table: many to many relationship user <=> keyword
CREATE TABLE IF NOT EXISTS user_keywords(
    keyword_id INT,
    user_id INT,
    PRIMARY KEY(keyword_id, user_id),
    FOREIGN KEY (keyword_id) REFERENCES keywords(keyword_id) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON UPDATE CASCADE ON DELETE CASCADE
);


CREATE TABLE IF NOT EXISTS geolocations (
  addressName VARCHAR(64) NOT NULL,
  lat VARCHAR(63) NOT NULL,
  lon VARCHAR(63) NOT NULL,
  street VARCHAR(127) NOT NULL,
  buildingNr VARCHAR(10) DEFAULT NULL,
  plz VARCHAR(5) DEFAULT NULL,
  city VARCHAR(32) NOT NULL,
  typ VARCHAR(20) DEFAULT NULL,
  PRIMARY KEY (lat, lon)
);


CREATE TABLE IF NOT EXISTS admins(
  admin_id TINYINT NOT NULL AUTO_INCREMENT,
  email VARCHAR(255) NOT NULL,
  hashed_password VARCHAR(255) NOT NULL,
  hashed_token VARCHAR(255) DEFAULT NULL,
  expire TIMESTAMP DEFAULT NULL,
  UNIQUE (email),
  PRIMARY KEY (admin_id)
);

CREATE TABLE IF NOT EXISTS  otps (
  otp VARCHAR(64) NOT NULL,
  user_id INT NOT NULL,
  expire TIMESTAMP DEFAULT NULL,
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);


