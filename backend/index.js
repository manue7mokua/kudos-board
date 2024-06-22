const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
var cors = require('cors');

const express = require('express');
const app = express();
const PORT = 3000;

app.use(cors())
app.use(express.json({ extended: false }));


app.get("/boards", async (req, res) => {
    const boards = await prisma.boards.findMany();
    res.json(boards)
});

app.post("/boards", async (req, res) => {
    const {title, category, imageUrl, author} = req.body;
    const newBoard = await prisma.boards.create({
        data: {
            title,
            category,
            imageUrl,
            author
        }
    });
    res.json(newBoard);
});

app.delete("/boards/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    await prisma.boards.delete({ where: { id } });
    res.json({ message: "Board deleted successfully" });
});

app.get("/boards/:boardId", async (req, res) => {
    const boardId = parseInt(req.params.boardId);

    // console.log(boardId)

    const cards = await prisma.cards.findMany(
        {
            where: {
                boardId
            }
        }
    );
    res.json(cards);
});

app.post("/boards/:boardId", async (req, res) => {
    const {title, description, upvote, author, imageUrl} = req.body;
    const boardId = parseInt(req.params.boardId);

    const newCard = await prisma.cards.create({
        data: {
            title,
            description,
            upvote,
            author,
            imageUrl,
            boardId
        }
    });
    res.json(newCard);
});

app.delete("/boards/:boardId/:cardId", async (req, res) => {
    const boardId = parseInt(req.params.boardId);
    const id = parseInt(req.params.cardId);

    await prisma.cards.delete({
      where: {
        id,
        boardId
      }
    });

    res.json({ message: "Card deleted successfully" });
  });

app.post("/boards/:boardId/:cardId", async (req, res) => {
    const boardId = parseInt(req.params.boardId);
    const id = parseInt(req.params.cardId);
    try {
      const updatedCard = await prisma.cards.update({
        where: { id, boardId },
        data: {
          upvote: { increment: 1 }
        }
      });
      res.json(updatedCard);
    } catch (error) {
      res.status(500).json({ error: "Could not upvote the card" });
    }
  });

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})
