-- CreateEnum
CREATE TYPE "CollectionType" AS ENUM ('RAKU', 'STONEWARE');

-- CreateEnum
CREATE TYPE "PieceShape" AS ENUM ('BOWL', 'VASE', 'JUG', 'MUG', 'PLATE', 'TILE');

-- CreateTable
CREATE TABLE "Piece" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "collectionId" INTEGER NOT NULL,
    "shape" "PieceShape" NOT NULL,
    "price" INTEGER NOT NULL,
    "description" TEXT,
    "url" TEXT NOT NULL,

    CONSTRAINT "Piece_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Collection" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "type" "CollectionType" NOT NULL,

    CONSTRAINT "Collection_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Piece" ADD CONSTRAINT "Piece_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "Collection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
