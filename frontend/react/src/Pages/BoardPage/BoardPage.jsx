import React, { useState, useEffect } from 'react'
import './BoardPage.css'
import CreateCardForm from '../../Components/CreateCardForm/CreateCardForm';
import { specificBoardCardsData } from '../../boardapi';
import { useParams, useNavigate } from 'react-router-dom';
import { addCardData, deleteCard, upvoteCard } from '../../boardapi';

const BoardPage = () => {
  const { boardId } = useParams();
  const [cards, setCards] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchCards();
  }, [boardId]);

  const fetchCards = () => {
    specificBoardCardsData(boardId)
      .then(response => setCards(response))
      .catch(error => console.error(error));
  };

  const handleCreateNewCardClick = (cardInfo) => {
    setShowModal(true);
    addCardData(cardInfo, boardId).then(() => {
      fetchCards();  // Refresh the cards list after adding a new card
      setShowModal(false);
    });
  };

  const handleDeleteCard = (cardId) => {
    deleteCard(boardId, cardId).then(() => {
      // Filter out the deleted card from the cards state
      setCards(cards.filter(card => card.id !== cardId));
    }).catch(error => {
      console.error('Failed to delete card:', error);
    });
  };

  const handleUpvoteCard = (cardId) => {
    upvoteCard(boardId, cardId)
    .then(updatedCard => {
      // Update the local state to reflect the new upvote count
      setCards(cards);
    }).catch(error => {
      console.error('Failed to upvote card:', error);
    });
  }

  return (
    <div>
     <button onClick={() => setShowModal(true)}>Create New Card</button>
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
              <button onClick={() => handleViewCard(card.id)}>View Card</button>
              <button onClick={() => handleUpvoteCard(card.id)}>Upvote: {card.upvote}</button>
              <button onClick={() => handleDeleteCard(card.id)}>Delete Card</button>
            </div>
          </div>
        ))}
        </div>
    </div>
  );
};

export default BoardPage;
