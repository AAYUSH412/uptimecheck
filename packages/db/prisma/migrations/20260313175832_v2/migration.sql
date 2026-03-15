/*
  Warnings:

  - A unique constraint covering the columns `[userId,url]` on the table `Website` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Website" ADD COLUMN     "checkIntervalSeconds" INTEGER NOT NULL DEFAULT 60,
ADD COLUMN     "name" TEXT;

-- AlterTable
ALTER TABLE "WebsiteTick" ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "latency" DROP NOT NULL;

-- CreateIndex
CREATE INDEX "Validator_publickey_idx" ON "Validator"("publickey");

-- CreateIndex
CREATE INDEX "Website_userId_idx" ON "Website"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Website_userId_url_key" ON "Website"("userId", "url");

-- CreateIndex
CREATE INDEX "WebsiteTick_websiteId_createdAt_idx" ON "WebsiteTick"("websiteId", "createdAt");


