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

const deleteBoard = async (boardId) => {
    const response = await axios.delete(`http://localhost:3000/boards/${boardId}`);
    return response.data;
  }

const specificBoardCardsData = async (boardId) => {
    console.log(boardId)
    const response = await axios.get(`http://localhost:3000/boards/${boardId}`);
    return response.data;
}

const addCardData = async (cardInfo, boardId) => {
    let title = cardInfo.title;
    let description = cardInfo.description;
    let category = cardInfo.catergory;
    let author = cardInfo.author;
    let imageUrl = cardInfo.imageUrl;
    const body = JSON.stringify({title, description, category, author, imageUrl});

    const response = await axios.post(`http://localhost:3000/boards/${boardId}`, body, config)
    return response.data;
}

const deleteCard = async (boardId, cardId) => {
    const response = await axios.delete(`http://localhost:3000/boards/${boardId}/${cardId}`);
    return response.data;
  }

const upvoteCard = async (boardId, cardId) => {
    const response = await axios.post(`http://localhost:3000/boards/${boardId}/${cardId}`);
    const updatedCard = response.data;
    console.log(response.data)
  };

// export default dashboardData;B
export { dashboardData, addBoardData, specificBoardCardsData, addCardData, deleteBoard, deleteCard, upvoteCard }
