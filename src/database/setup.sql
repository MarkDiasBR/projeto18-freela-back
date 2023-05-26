CREATE TABLE "public"."posts" (
	"id" serial NOT NULL,
	"userId" integer NOT NULL,
	"description" TEXT NOT NULL,
	"edited" BOOLEAN NOT NULL,
	"createdAt" TIMESTAMP NOT NULL,
	"editedAt" TIMESTAMP NOT NULL,
	CONSTRAINT "posts_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."users" (
	"id" serial NOT NULL,
	"fullname" TEXT NOT NULL,
	"name" TEXT NOT NULL UNIQUE,
	"password" TEXT NOT NULL,
	"email" TEXT NOT NULL UNIQUE,
	"roleId" integer NOT NULL,
	"avatarId" integer NOT NULL,
	"createdAt" TIMESTAMP NOT NULL,
	CONSTRAINT "users_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."images" (
	"id" serial NOT NULL,
	"userId" integer NOT NULL,
	"url" TEXT NOT NULL,
	"imgTypeId" integer NOT NULL,
	"createdAt" TIMESTAMP NOT NULL,
	CONSTRAINT "images_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."roles" (
	"id" serial NOT NULL,
	"name" TEXT NOT NULL,
	CONSTRAINT "roles_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."imgType" (
	"id" serial NOT NULL,
	"name" TEXT NOT NULL,
	CONSTRAINT "imgType_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."usersRole" (
	"id" serial NOT NULL,
	"userId" integer NOT NULL,
	"roleId" integer NOT NULL,
	CONSTRAINT "usersRole_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."sessions" (
	"id" serial NOT NULL,
	"userId" integer NOT NULL,
	"token" TEXT NOT NULL,
	"createdAt" TIMESTAMP NOT NULL,
	CONSTRAINT "sessions_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."postLikes" (
	"id" serial NOT NULL,
	"postId" integer NOT NULL,
	"userId" integer NOT NULL,
	CONSTRAINT "postLikes_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."userFollowers" (
	"id" serial NOT NULL,
	"userId" integer NOT NULL,
	"followerId" integer NOT NULL,
	CONSTRAINT "userFollowers_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."comments" (
	"id" serial NOT NULL,
	"postId" integer NOT NULL,
	"userId" integer NOT NULL,
	"content" TEXT NOT NULL,
	"edited" BOOLEAN NOT NULL,
	"createdAt" TIMESTAMP NOT NULL,
	"editedAt" TIMESTAMP NOT NULL,
	CONSTRAINT "comments_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."commentLikes" (
	"id" serial NOT NULL,
	"userId" integer NOT NULL,
	"commentId" integer NOT NULL,
	CONSTRAINT "commentLikes_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



ALTER TABLE "posts" ADD CONSTRAINT "posts_fk0" FOREIGN KEY ("userId") REFERENCES "users"("id");

ALTER TABLE "users" ADD CONSTRAINT "users_fk0" FOREIGN KEY ("avatarId") REFERENCES "images"("id");

ALTER TABLE "images" ADD CONSTRAINT "images_fk0" FOREIGN KEY ("userId") REFERENCES "users"("id");
ALTER TABLE "images" ADD CONSTRAINT "images_fk1" FOREIGN KEY ("imgTypeId") REFERENCES "imgType"("id");



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
