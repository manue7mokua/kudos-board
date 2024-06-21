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

const addBoardData = async (title, category, author) => {
    const body = JSON.stringify({title, category, author, imageUrl:""});

    const response = await axios.post("http://localhost:3000/boards", body, config)
    return response.data;
}

// export default dashboardData;
export {dashboardData, addBoardData}
