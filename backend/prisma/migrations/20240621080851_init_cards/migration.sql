-- CreateTable
CREATE TABLE "Cards" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "searchField" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "boardId" INTEGER NOT NULL,

    CONSTRAINT "Cards_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Cards_boardId_key" ON "Cards"("boardId");

-- AddForeignKey
ALTER TABLE "Cards" ADD CONSTRAINT "Cards_boardId_fkey" FOREIGN KEY ("boardId") REFERENCES "Boards"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
