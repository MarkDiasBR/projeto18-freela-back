CREATE TABLE "public"."posts" (
	"id" SERIAL NOT NULL,
	"userId" INTEGER NOT NULL,
	"imageId" INTEGER NOT NULL,
	"description" TEXT NOT NULL DEFAULT '',
	"edited" BOOLEAN NOT NULL DEFAULT FALSE,
	"createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
	"editedAt" TIMESTAMP,
	CONSTRAINT "posts_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "public"."users" (
	"id" SERIAL NOT NULL,
	"fullname" TEXT NOT NULL,
	"name" TEXT NOT NULL UNIQUE,
	"password" TEXT NOT NULL,
	"email" TEXT NOT NULL UNIQUE,
	"roleId" INTEGER NOT NULL DEFAULT 2,
	"avatarId" INTEGER NOT NULL DEFAULT 1,
	"createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
	CONSTRAINT "users_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."images" (
	"id" SERIAL NOT NULL,
	"url" TEXT NOT NULL,
	"imgTypeId" INTEGER NOT NULL DEFAULT 3,
	"createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
	CONSTRAINT "images_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."roles" (
	"id" SERIAL NOT NULL,
	"name" TEXT NOT NULL,
	CONSTRAINT "roles_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."imgType" (
	"id" SERIAL NOT NULL,
	"name" TEXT NOT NULL,
	CONSTRAINT "imgType_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."usersRole" (
	"id" SERIAL NOT NULL,
	"userId" INTEGER NOT NULL,
	"roleId" INTEGER NOT NULL,
	CONSTRAINT "usersRole_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."sessions" (
	"id" SERIAL NOT NULL,
	"userId" INTEGER NOT NULL UNIQUE,
	"token" TEXT NOT NULL,
	"createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
	CONSTRAINT "sessions_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."postLikes" (
	"id" SERIAL NOT NULL,
	"postId" INTEGER NOT NULL,
	"userId" INTEGER NOT NULL,
	CONSTRAINT "postLikes_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."userFollowers" (
	"id" SERIAL NOT NULL,
	"userId" INTEGER NOT NULL,
	"followerId" INTEGER NOT NULL,
	CONSTRAINT "userFollowers_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."comments" (
	"id" SERIAL NOT NULL,
	"postId" INTEGER NOT NULL,
	"userId" INTEGER NOT NULL,
	"content" TEXT NOT NULL,
	"edited" BOOLEAN NOT NULL DEFAULT FALSE,
	"createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
	"editedAt" TIMESTAMP,
	CONSTRAINT "comments_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."commentLikes" (
	"id" SERIAL NOT NULL,
	"userId" INTEGER NOT NULL,
	"commentId" INTEGER NOT NULL,
	CONSTRAINT "commentLikes_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



ALTER TABLE "posts" ADD CONSTRAINT "posts_fk0" FOREIGN KEY ("userId") REFERENCES "users"("id");
ALTER TABLE "posts" ADD CONSTRAINT "posts_fk1" FOREIGN KEY ("imageId") REFERENCES "images"("id");

ALTER TABLE "users" ADD CONSTRAINT "users_fk0" FOREIGN KEY ("avatarId") REFERENCES "images"("id");

ALTER TABLE "images" ADD CONSTRAINT "images_fk0" FOREIGN KEY ("imgTypeId") REFERENCES "imgType"("id");



ALTER TABLE "usersRole" ADD CONSTRAINT "usersRole_fk0" FOREIGN KEY ("userId") REFERENCES "users"("id");
ALTER TABLE "usersRole" ADD CONSTRAINT "usersRole_fk1" FOREIGN KEY ("roleId") REFERENCES "roles"("id");

ALTER TABLE "sessions" ADD CONSTRAINT "sessions_fk0" FOREIGN KEY ("userId") REFERENCES "users"("id");

ALTER TABLE "postLikes" ADD CONSTRAINT "postLikes_fk0" FOREIGN KEY ("postId") REFERENCES "posts"("id");
ALTER TABLE "postLikes" ADD CONSTRAINT "postLikes_fk1" FOREIGN KEY ("userId") REFERENCES "users"("id");

ALTER TABLE "userFollowers" ADD CONSTRAINT "userFollowers_fk0" FOREIGN KEY ("userId") REFERENCES "users"("id");
ALTER TABLE "userFollowers" ADD CONSTRAINT "userFollowers_fk1" FOREIGN KEY ("followerId") REFERENCES "users"("id");

ALTER TABLE "comments" ADD CONSTRAINT "comments_fk0" FOREIGN KEY ("postId") REFERENCES "posts"("id");
ALTER TABLE "comments" ADD CONSTRAINT "comments_fk1" FOREIGN KEY ("userId") REFERENCES "users"("id");

ALTER TABLE "commentLikes" ADD CONSTRAINT "commentLikes_fk0" FOREIGN KEY ("userId") REFERENCES "users"("id");
ALTER TABLE "commentLikes" ADD CONSTRAINT "commentLikes_fk1" FOREIGN KEY ("commentId") REFERENCES "comments"("id");

INSERT INTO "public"."imgType" VALUES (1, 'avatar');

INSERT INTO "public"."imgType" VALUES (2, 'avatarSmall');

INSERT INTO "public"."imgType" VALUES (3, 'post');

INSERT INTO "public"."roles" VALUES (1, 'admin');

INSERT INTO "public"."roles" VALUES (2, 'user');

INSERT INTO "public"."images" ("id", "url", "imgTypeId") 
VALUES (1, 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png', 1);

INSERT INTO "public"."images" ("id", "url", "imgTypeId") 
VALUES (2, 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png', 2);

INSERT INTO "public"."users" ("id", "fullname", "name", "password", "email", "roleId") 
VALUES (1, 'admin', 'admin', 'mark1324', 'markdiasbr@gmail.com', 1);


