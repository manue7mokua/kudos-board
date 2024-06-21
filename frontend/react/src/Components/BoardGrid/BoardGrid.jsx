import React, { useState, useEffect } from 'react';
import './Boardgrid.css'

import CreateBoardForm from '../CreateBoardForm/CreateBoardForm';
import axios from 'axios';
import BoardPage from '../../Pages/BoardPage/BoardPage';
import {dashboardData, addBoardData, specificBoardCardsData, deleteBoard} from '../../boardapi';
import {Link} from 'react-router-dom';


const BoardGrid = () => {
  const [boards, setBoards] = useState([]);
  const [filteredBoards, setFilteredBoards] = useState(boards);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const [selectedBoardId, setSelectedBoardId] = useState(2);

  const [showModal, setShowModal] = useState(false);

  const handleCreateNewBoardClick = (boardInfo) => {
    setShowModal(true);
    addBoardData(boardInfo);
  }

  // board data setup
  useEffect(() => {
    dashboardData().then(
      response => {
        setBoards(response)
      }
    )
  }, []);
  console.log(dashboardData())
  console.log(boards)

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
    console.log(boardId)
    var boardId = boardId;
    // window.location.href = (`/boards/${boardId}`);
    setSelectedBoardId(boardId);
    console.log(boardId)
  }

  // Board deletion setup
  const deleteBoardFunc = (boardId) => {
    // will make an API request to delete the board
    // Call the new deleteBoard function
    deleteBoard(boardId).then(() => {
      // Update the boards state to remove the deleted board
      setBoards(boards.filter(board => board.id !== boardId));
    }).catch(error => {
      console.error(error);
    });
  }

  const handleButtonClick = () => {
    handleCreateNewBoardClick();
  }

  const handleDeleteClick = () => {
    deleteBoardFunc();
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
        <CreateBoardForm onSubmit={handleCreateNewBoardClick} onHide={() => setShowModal(false)}/></div>)}

      <input type="search" value={searchQuery} onChange={handleSearchChange} placeholder='Search for a board...'/>
      <div className="boards">
        {boards.map((board) => (
          <div key={board.id} className="board">
            <img src={`https://picsum.photos/200/300?random=${board.id}`} alt={board.title} className='board-image'/>
            <h2>{board.title}</h2>
            <p>{board.category}</p>
            <p>{board.author}</p>

            <div className='board-buttons'>
            <Link to={"/boards/"+board.id}>
              <button /*onClick={() => viewBoard(board.id)}*/>View Board</button>
            </Link>
            <button onClick={(handleDeleteClick) => deleteBoardFunc(board.id)}>Delete Board</button>
            </div>
          </div>
        ))}
      </div>
      {/* {selectedBoardId && <BoardPage boardId={selectedBoardId}/>} */}
    </div>
  );
};

export default BoardGrid
