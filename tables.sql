CREATE TABLE users (
  user_id INT AUTO_INCREMENT,
  name VARCHAR(80),
  password VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  admin INT DEFAULT 0,
  PRIMARY KEY (user_id)
) ENGINE=INNODB;
CREATE TABLE musics (
  music_id INT AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  artist VARCHAR(255) NOT NULL,
  createdAt datetime DEFAULT NOW(),
  updatedAt datetime DEFAULT NOW() ON UPDATE NOW(),
  PRIMARY KEY (music_id)
) ENGINE=INNODB;
CREATE TABLE user_musics (
  _id INT AUTO_INCREMENT,
  user_id INT NOT NULL,
  music_id INT NOT NULL,
  PRIMARY KEY (_id),
  CONSTRAINT constraint_user_fk FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT constraint_music_fk FOREIGN KEY (music_id) REFERENCES musics (music_id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=INNODB;