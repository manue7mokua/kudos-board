import axios from 'axios';

const config = {
    headers: {
        "Content-Type": "application/json",
    }
};

const dashboardData = async () => {
    const response = await axios.get("http://localhost:3000/boards");
    return response.data;
}

const addBoardData = async (boardInfo) => {
    let title = boardInfo.title;
    let category = boardInfo.category;
    let author = boardInfo.author;
    let imageUrl = boardInfo.imageUrl;
    const body = JSON.stringify({title, category, author, imageUrl});

    const response = await axios.post("http://localhost:3000/boards", body, config)
    return response.data;
}

const specificBoardCardsData = async (boardId) => {
    console.log(boardId)
    const response = await axios.get(`http://localhost:3000/boards/${boardId}/cards`);
    return response.data;
}

// export default dashboardData;B
export { dashboardData, addBoardData, specificBoardCardsData }
