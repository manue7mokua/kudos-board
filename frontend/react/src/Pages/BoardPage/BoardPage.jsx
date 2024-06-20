import React, { useState, useEffect } from 'react';
import axios from 'axios';
import image2 from '../../assets/sprinter.jpg'

const BoardPage= ({ boardId }) => {
  const [data, setData] = useState(null);

  // API data fetch setup
  useEffect(() => {
    axios.get(`/api/boards/${boardId}`)
      .then(response => setData(response.data))
      .catch(error => console.error(error));
  }, [boardId]);

  // Hard-coded data for testing
  const hardcodedData = {
    title: 'Test Board',
    description: 'This is a test board',
    cards: [
      { id: 1, content: 'Card 1', image: image2 },
      { id: 2, content: 'Card 2', image: image2 },
      { id: 3, content: 'Card 3', image: image2 },
    ],
  };

  return (
    <div>
      <h2>{hardcodedData.title}</h2>
      <p>{hardcodedData.description}</p>
      <ul>
        {hardcodedData.cards.map((card) => (
          <li key={card.id}>
            <img src={card.image} alt={card.content} />
            {card.content}
          </li>
        ))}
      </ul>
      <form>
        <input type="text" placeholder="Add a new card" />
        <button type="submit">Add Card</button>
      </form>
    </div>
  );
};

export default BoardPage;
