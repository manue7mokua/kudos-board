import React, { useState, useEffect } from 'react';
import image3 from '../../assets/vikings.jpeg'
import './Boardgrid.css'

import CreateBoardForm from '../CreateBoardForm/CreateBoardForm';
import axios from 'axios';
import BoardPage from '../../Pages/BoardPage/BoardPage';
import {dashboardData, addBoardData} from '../../boardapi';

import img1 from '../../assets/band4band.jpeg';
import img2 from '../../assets/studentlife.jpg';
import img3 from '../../assets/margin-call.jpeg';
import img4 from '../../assets/one-piece.jpg';
import img5 from '../../assets/suits.jpeg';
import img6 from '../../assets/vikings.jpeg';
import img7 from '../../assets/sprinter.jpg';
import img8 from '../../assets/succession.jpg';
import img9 from '../../assets/poetryclub.jpg';

const BoardGrid = () => {
  const [boards, setBoards] = useState([]);
  const [filteredBoards, setFilteredBoards] = useState(boards);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const [selectedBoard, setSelectedBoard] = useState(null);

  const [showModal, setShowModal] = useState(false);

  const handleCreateNewBoardClick = (boardInfo) => {
    setShowModal(true);
    console.log(boardInfo)
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
    window.location.href = (`/boards/${boardId}`);
    setSelectedBoard(boardId);
    console.log(selectedBoard)
  }

  // Board deletion setup
  // const deleteBoard = (boardId) => {
  //   // will make an API request to delete the board
  //   axios.delete(`/api/boards/${boardId}`)
  //     .then(response => {
  //       // update the boards state to remove the deleted board
  //       setBoards(boards.filter(board => board.id !== boardId));
  //     })
  //     .catch(error => {
  //       console.error(error);
  //     });
  // }

  const handleButtonClick = () => {
    handleCreateNewBoardClick();
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
