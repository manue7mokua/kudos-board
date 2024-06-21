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


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})
