import React from 'react';
import axios from 'axios';

const BoardDetails = ({ boardId }) => {
  const [data, setData] = useState(null);

  // API data fetch setup
useEffect(() => {
    axios.get(`/api/boards/${boardId}`)
        .then(response => setData(response.data))
        .catch(error => console.error(error));
}, [boardId]);

return (
    <div>
      <h2>{data.title}</h2>
      <p>{data.description}</p>
      <ul>
        {data.cards.map((card) => (
          <li key={card.id}>{card.content}</li>
        ))}
      </ul>
      <form>
        <input type="text" placeholder="Add a new card" />
        <button type="submit">Add Card</button>
      </form>
    </div>
  );
};

export default BoardDetails;
