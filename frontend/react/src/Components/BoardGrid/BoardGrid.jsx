import React, { useState, useEffect } from 'react';
import image3 from '../../assets/vikings.jpeg'
import './Boardgrid.css'
import CreateBoardForm from '../CreateBoardForm/CreateBoardForm';
import axios from 'axios';
import BoardPage from '../../Pages/BoardPage/BoardPage';
import {dashboardData, addBoardData} from '../../boardapi';

const BoardGrid = () => {
  const [boards, setBoards] = useState([]);
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
    dashboardData().then(
      response => {
        setBoards(response)
      }
    )
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

  const handleButtonClick = () => {
    handleCreateNewBoardClick()
    addBoardData("title467545", "erhgre", "gdgd")
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

      <button onClick={handleButtonClick} >Create New Board</button>
      {showModal && (<div className='modal-overlay'>
        <CreateBoardForm onHide={() => setShowModal(false)}/></div>)}

      <input type="search" value={searchQuery} onChange={handleSearchChange} placeholder='Search for a board...'/>
      <div className="boards">
        {boards.map((board) => (
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
