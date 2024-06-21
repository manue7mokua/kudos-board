import React, { useState, useEffect } from 'react';
import axios from 'axios';
import image2 from '../../assets/sprinter.jpg'
import './BoardPage.css'
import CreateCardForm from '../../Components/CreateCardForm/CreateCardForm';
import { specificBoardCardsData } from '../../boardapi';

const BoardPage = ({ boardId }) => {
  const [cards, setCards] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const handleCreateNewCardClick = () => {
    setShowModal(true);
  };

  // API data fetch setup for the cards
  useEffect(() => {
    console.log(boardId)
    specificBoardCardsData(boardId)
      .then(response => setCards(response))
      .catch(error => console.error(error));
  }, [boardId]);
  console.log(specificBoardCardsData())

  // Hard-coded data for testing
  // const hardcodedData = {
  //   title: 'Test Board',
  //   description: 'This is a test board',
  //   cards: [
  //     { id: 1, content: 'Card 1', image: image2 },
  //     { id: 2, content: 'Card 2', image: image2 },
  //     { id: 3, content: 'Card 3', image: image2 },
  //   ],
  // };

  return (
    <div>
     <button onClick={handleCreateNewCardClick} >Create New Card</button>
      {showModal && (
        <div className='modal-overlay'>
          <CreateCardForm boardId={boardId} onHide={() =>
            setShowModal(false)} />
        </div>
      )}
      <h2>Board Cards</h2>
        <div className='board-cards'>
           {cards.map((card) => (
          <div key={card.id} className='card'>
            <img src={card.image} alt={card.description} className='board-image'/>
            <h4>{card.description}</h4>
            <p>Author: {card.author}</p>

            <div className='board-buttons'>
              <button onClick={() => upvoteCard(card.id)}>Upvote</button>
              <button onClick={() => deleteCard(card.id)}>Delete Card</button>
            </div>
          </div>
        ))}
        </div>
    </div>
  );
};

export default BoardPage;
