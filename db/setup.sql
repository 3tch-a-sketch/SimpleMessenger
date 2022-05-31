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
