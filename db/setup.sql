CREATE TABLE "users" (
  "user_id" serial NOT NULL,
  PRIMARY KEY (user_id),
  "username" text NOT NULL,
  "password_hash" text NOT NULL,
  "created_at" timestamp NOT NULL
);

CREATE TABLE "posts" (
  "post_id" serial NOT NULL,
  PRIMARY KEY (post_id),
  "user_id" serial REFERENCES users,
  "body" text NOT NULL,
  "created_at" timestamp NOT NULL
);

INSERT INTO users (username, password_hash, created_at) VALUES ('system', 'b109f3bbbc244eb82441917ed06d618b9008dd09b3befd1b5e07394c706a8bb980b1d7785e5976ec049b46df5f1326af5a2ea6d103fd07c95385ffab0cacbc86', '2018-01-01 00:00:00');
INSERT INTO posts (user_id, body, created_at) VALUES (1, 'To start posting create a username, password and login. If the username has been taken and the password supplied incorrectly the button will turn red.', '2018-01-01 00:00:00');