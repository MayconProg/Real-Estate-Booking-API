-- DropForeignKey
ALTER TABLE "properties" DROP CONSTRAINT "properties_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "schedules" DROP CONSTRAINT "schedules_propertyId_fkey";

-- DropForeignKey
ALTER TABLE "schedules" DROP CONSTRAINT "schedules_userId_fkey";

-- AddForeignKey
ALTER TABLE "properties" ADD CONSTRAINT "properties_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "schedules" ADD CONSTRAINT "schedules_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "schedules" ADD CONSTRAINT "schedules_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "properties"("id") ON DELETE CASCADE ON UPDATE CASCADE;
