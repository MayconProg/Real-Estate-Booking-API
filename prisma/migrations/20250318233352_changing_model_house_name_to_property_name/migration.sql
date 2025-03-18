/*
  Warnings:

  - You are about to drop the column `houseId` on the `schedules` table. All the data in the column will be lost.
  - You are about to drop the `houses` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `propertyId` to the `schedules` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "houses" DROP CONSTRAINT "houses_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "schedules" DROP CONSTRAINT "schedules_houseId_fkey";

-- AlterTable
ALTER TABLE "schedules" DROP COLUMN "houseId",
ADD COLUMN     "propertyId" TEXT NOT NULL;

-- DropTable
DROP TABLE "houses";

-- CreateTable
CREATE TABLE "properties" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,

    CONSTRAINT "properties_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "properties" ADD CONSTRAINT "properties_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "schedules" ADD CONSTRAINT "schedules_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "properties"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
