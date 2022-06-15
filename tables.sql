CREATE TABLE users (
  id INT AUTO_INCREMENT,
  name VARCHAR(80),
  password VARCHAR(40) NOT NULL,
  email VARCHAR(255) NOT NULL,
  PRIMARY KEY (id)
) ENGINE=INNODB;
CREATE TABLE musics (
  id INT AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  artist VARCHAR(255) NOT NULL,
  createdAt datetime DEFAULT NOW(),
  updatedAt datetime DEFAULT NOW(),
  PRIMARY KEY (id)
) ENGINE=INNODB;
CREATE TABLE user_musics (
  id INT AUTO_INCREMENT,
  user_id INT NOT NULL,
  music_id INT NOT NULL,
  PRIMARY KEY (id, user_id, music_id),
  CONSTRAINT constraint_user_fk FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT constraint_music_fk FOREIGN KEY (music_id) REFERENCES musics (id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=INNODB;