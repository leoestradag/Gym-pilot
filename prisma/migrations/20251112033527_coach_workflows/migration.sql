-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('MEMBER', 'COACH', 'ADMIN');

-- CreateEnum
CREATE TYPE "CoachRole" AS ENUM ('STAFF', 'PERSONAL_TRAINER', 'SPINNING', 'PILATES', 'YOGA', 'CROSSFIT', 'NUTRITION');

-- CreateEnum
CREATE TYPE "CoachStatus" AS ENUM ('PENDING', 'APPROVED', 'SUSPENDED');

-- CreateEnum
CREATE TYPE "CoachConnectionStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "CoachClassStatus" AS ENUM ('REGISTERED', 'ATTENDED', 'CANCELLED');

-- CreateTable
CREATE TABLE "members" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "membership_type" TEXT NOT NULL,
    "membership_start" TIMESTAMP(3) NOT NULL,
    "membership_end" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'active',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "members_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_accounts" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT,
    "role" "UserRole" NOT NULL DEFAULT 'MEMBER',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "coach_profiles" (
    "id" SERIAL NOT NULL,
    "user_account_id" INTEGER NOT NULL,
    "role" "CoachRole" NOT NULL,
    "status" "CoachStatus" NOT NULL DEFAULT 'PENDING',
    "bio" TEXT,
    "certifications" TEXT,
    "experience_years" INTEGER,
    "specialties" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "gym_id" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "coach_profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "coach_user_access" (
    "id" SERIAL NOT NULL,
    "coach_id" INTEGER NOT NULL,
    "member_id" INTEGER NOT NULL,
    "status" "CoachConnectionStatus" NOT NULL DEFAULT 'PENDING',
    "requested_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "responded_at" TIMESTAMP(3),
    "notes" TEXT,

    CONSTRAINT "coach_user_access_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "coach_class_templates" (
    "id" SERIAL NOT NULL,
    "coach_id" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "day_of_week" TEXT NOT NULL,
    "start_time" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "capacity" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "coach_class_templates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "coach_class_sessions" (
    "id" SERIAL NOT NULL,
    "template_id" INTEGER,
    "coach_id" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "location" TEXT,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "capacity" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "coach_class_sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "coach_class_attendees" (
    "id" SERIAL NOT NULL,
    "session_id" INTEGER NOT NULL,
    "member_id" INTEGER NOT NULL,
    "status" "CoachClassStatus" NOT NULL DEFAULT 'REGISTERED',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "coach_class_attendees_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "instructors" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "specialty" TEXT NOT NULL,
    "bio" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "instructors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "classes" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "instructor_id" INTEGER NOT NULL,
    "day_of_week" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "capacity" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "classes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "check_ins" (
    "id" SERIAL NOT NULL,
    "member_id" INTEGER NOT NULL,
    "class_id" INTEGER,
    "checkin_time" TIMESTAMP(3) NOT NULL,
    "checkout_time" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "check_ins_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "gyms" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "hours" TEXT NOT NULL,
    "image" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "gyms_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "members_email_key" ON "members"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_accounts_email_key" ON "user_accounts"("email");

-- CreateIndex
CREATE UNIQUE INDEX "coach_profiles_user_account_id_key" ON "coach_profiles"("user_account_id");

-- CreateIndex
CREATE UNIQUE INDEX "coach_user_access_coach_id_member_id_key" ON "coach_user_access"("coach_id", "member_id");

-- CreateIndex
CREATE UNIQUE INDEX "coach_class_attendees_session_id_member_id_key" ON "coach_class_attendees"("session_id", "member_id");

-- CreateIndex
CREATE UNIQUE INDEX "instructors_email_key" ON "instructors"("email");

-- AddForeignKey
ALTER TABLE "coach_profiles" ADD CONSTRAINT "coach_profiles_user_account_id_fkey" FOREIGN KEY ("user_account_id") REFERENCES "user_accounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "coach_profiles" ADD CONSTRAINT "coach_profiles_gym_id_fkey" FOREIGN KEY ("gym_id") REFERENCES "gyms"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "coach_user_access" ADD CONSTRAINT "coach_user_access_coach_id_fkey" FOREIGN KEY ("coach_id") REFERENCES "coach_profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "coach_user_access" ADD CONSTRAINT "coach_user_access_member_id_fkey" FOREIGN KEY ("member_id") REFERENCES "members"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "coach_class_templates" ADD CONSTRAINT "coach_class_templates_coach_id_fkey" FOREIGN KEY ("coach_id") REFERENCES "coach_profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "coach_class_sessions" ADD CONSTRAINT "coach_class_sessions_coach_id_fkey" FOREIGN KEY ("coach_id") REFERENCES "coach_profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "coach_class_sessions" ADD CONSTRAINT "coach_class_sessions_template_id_fkey" FOREIGN KEY ("template_id") REFERENCES "coach_class_templates"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "coach_class_attendees" ADD CONSTRAINT "coach_class_attendees_session_id_fkey" FOREIGN KEY ("session_id") REFERENCES "coach_class_sessions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "coach_class_attendees" ADD CONSTRAINT "coach_class_attendees_member_id_fkey" FOREIGN KEY ("member_id") REFERENCES "members"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "classes" ADD CONSTRAINT "classes_instructor_id_fkey" FOREIGN KEY ("instructor_id") REFERENCES "instructors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "check_ins" ADD CONSTRAINT "check_ins_member_id_fkey" FOREIGN KEY ("member_id") REFERENCES "members"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "check_ins" ADD CONSTRAINT "check_ins_class_id_fkey" FOREIGN KEY ("class_id") REFERENCES "classes"("id") ON DELETE SET NULL ON UPDATE CASCADE;
