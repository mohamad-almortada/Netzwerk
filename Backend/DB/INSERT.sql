
-- SET SQL_SAFE_UPDATES=1;

INSERT INTO users (email, title, firstname, lastname, website, tel, lat, lon, position)
VALUES ("", "", "", "", "", "", "", "", ""); 


INSERT INTO users (email, title, firstname, lastname, website, tel, lat, lon, position) 
VALUES ("user@domain.com", "Dr.", "lorem", "ispum", "uni-wuppertal.de",
 "011233445567", "51.47376774999999", "6.830884886730634", "Referndar*in");


INSERT INTO admin_user (email, password) VALUES (

);

INSERT INTO positions (position) VALUES ("");

-- insert into admins(email, admin_name, hashed_password) VALUES ("admin1@uni-wuppertal.de", "admin1", "$2y$10$CJz.Ajy5eQ/v.GQOFcGvFubLcruL1TkmJA138ghC2U5FdY1xg9fAW");




-- INTERESTS:

INSERT INTO interests (interest) VALUES ("MINT-Bildung 4.0"),
  ("Studierende und Lehrkräfte"),
  ("Bilingualer Chemieunterricht"),
  ("Außerschulische Lernorte") ;

-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`

INSERT INTO interests (interests) VALUES("Bildung 4.0");



SELECT a.public_email, a.title, a.title_secondary, a.firstname, a.lastname, a.website,
 a.tel, a.activities, a.fieldsOfResearch, a.additionalLinks, b.addressName
FROM users a join geoLocations b on b.lat = a.lat AND b.lon = a.lon;


SELECT k.keyword from keywords k WHERE k.keyword_id IN (
  SELECT keyword_Id FROM user_keywords WHERE user_id = 10;
   )

