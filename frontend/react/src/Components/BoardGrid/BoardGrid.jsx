import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import image3 from '../../assets/vikings.jpeg'
import './BoardGrid.css'
import CreateBoardForm from '../CreateBoardForm/CreateBoardForm';
import axios from 'axios';
import BoardPage from '../../Pages/BoardPage/BoardPage';

const BoardGrid = () => {
  const [boards, setBoards] = useState([
    {
      id: 1,
      title: "Board 1",
      category: "Recent",
      author: "John Doe",
      image: image3
    },
    {
      id: 2,
      title: "Board 2",
      category: "Celebration",
      author: "Jane Doe",
      image: image3
    },
    {
      id: 3,
      title: "Board 3",
      category: "Thank You",
      author: "Bob Smith",
      image: image3
    }
  ]);
  const [filteredBoards, setFilteredBoards] = useState(boards);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const [selectedBoard, setSelectedBoard] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const handleCreateNewBoardClick = () => {
    setShowModal(true);
  }

  // board data setup
  useEffect(() => {
    // fetch('/api/boards')
    //   .then(response => response.json())
    //   .then(data => setBoards(data));
  }, []);

  // Filter functionality setup
  const handleFilterChange = (category) => {
    setSelectedCategory(category);
    setFilteredBoards(boards.filter(board => board.category === category));
  };

  // Search functionality setup
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setFilteredBoards(boards.filter(board => board.title.includes(searchQuery)));
  };

  const viewBoard = (boardId) => {
    // navigate to the board's details page
    window.location.href = (`/boards/${boardId}`);
    setSelectedBoard(boardId);
  }

  // Board deletion setup
  const deleteBoard = (boardId) => {
    // will make an API request to delete the board
    axios.delete(`/api/boards/${boardId}`)
      .then(response => {
        // update the boards state to remove the deleted board
        setBoards(boards.filter(board => board.id !== boardId));
      })
      .catch(error => {
        console.error(error);
      });
  }

  return (
    <div className='board-grid'>
      <h1>Board Grid</h1>
      <div className="filter-buttons">
        <button onClick={() => handleFilterChange('recent')}>Recent</button>
        <button onClick={() => handleFilterChange('celebration')}>Celebration</button>
        <button onClick={() => handleFilterChange('thank-you')}>Thank You</button>
        <button onClick={() => handleFilterChange('inspiration')}>Inspiration</button>
      </div>

      <button onClick={handleCreateNewBoardClick} >Create New Board</button>
      {showModal && (<div className='modal-overlay'>
        <CreateBoardForm onHide={() => setShowModal(false)}/></div>)}

      <input type="search" value={searchQuery} onChange={handleSearchChange} placeholder='Search for a board...'/>
      <div className="boards">
        {filteredBoards.map((board) => (
          <div key={board.id} className="board">
            <img src={board.image} alt={board.title} className='board-image'/>
            <h2>{board.title}</h2>
            <p>{board.category}</p>
            <p>{board.author}</p>
            {/* board page link setup */}
            {/* <Link to={`/boards/${board.id}`}>View Board</Link> */}
            <div className='board-buttons'>
            <button onClick={() => viewBoard(board.id)}>View Board</button>
            <button onClick={() => deleteBoard(board.id)}>Delete Board</button>
            </div>
          </div>
        ))}
      </div>
      {selectedBoard && <BoardPage boardId={selectedBoard}/>}
    </div>
  );
};

export default BoardGrid
