import React, { useState, useEffect } from 'react';
import axios from 'axios';
import image2 from '../../assets/sprinter.jpg'
import './BoardPage.css'
import CreateCardForm from '../../Components/CreateCardForm/CreateCardForm';
import { specificBoardCardsData } from '../../boardapi';
import { useParams } from 'react-router-dom';
import { addCardData } from '../../boardapi';

const BoardPage = () => {
  const { boardId }= useParams();

  const [cards, setCards] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const handleCreateNewCardClick = (cardInfo) => {
    console.log(cardInfo)
    setShowModal(true);
    addCardData(cardInfo, boardId);
  };
  console.log(boardId)
  // API data fetch setup for the cards
  useEffect(() => {
    console.log(boardId)
    specificBoardCardsData(boardId)
      .then(response => setCards(response))
      .catch(error => console.error(error));
  }, [boardId]);
  console.log(specificBoardCardsData(boardId))

  const handleButtonCardClick = () => {
    handleCreateNewCardClick();
  }


  return (
    <div>
     <button onClick={handleButtonCardClick} >Create New Card</button>
      {showModal && (
        <div className='modal-overlay'>
          <CreateCardForm boardId={boardId} onSubmit={handleCreateNewCardClick} onHide={() =>
            setShowModal(false)} />
        </div>
      )}
      <h2>Board Cards</h2>
        <div className='board-cards'>
           {cards.map((card) => (
          <div key={card.id} className='card'>
            <img src={card.imageUrl} alt={card.description} className='board-image'/>
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
