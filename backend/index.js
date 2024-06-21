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

// app.get("/boards/:boardId/cards", async (req, res) => {
//     const cards = await prisma.cards.findUnique();
//     res.json(cards)
// })

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

   // try {
        // if (card.boardId === parseInt(boardId)) {
        //     res.json(card);
        // } else {
        //     res.status(404).send("Card not found or does not belong to the specified board.");
        // }
    // } catch (error) {
    //     res.status(500).send("An error occurred while fetching the card.");
    // }
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

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})
