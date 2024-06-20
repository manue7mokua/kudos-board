const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/boards", async (req, res) => {
    const boards = await prisma.boards.findMany();
    res.json(boards)
    console.log(res.json(boards))
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})
