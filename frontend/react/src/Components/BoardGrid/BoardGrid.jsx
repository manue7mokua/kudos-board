import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import image3 from '../../assets/vikings.jpeg'
import './BoardGrid.css'

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

  return (
    <div className='board-grid'>
      <h1>Board Grid</h1>
      <div className="filter-buttons">
        <button onClick={() => handleFilterChange('recent')}>Recent</button>
        <button onClick={() => handleFilterChange('celebration')}>Celebration</button>
        <button onClick={() => handleFilterChange('thank-you')}>Thank You</button>
        <button onClick={() => handleFilterChange('inspiration')}>Inspiration</button>
      </div>
      <input type="search" value={searchQuery} onChange={handleSearchChange} />
      <div className="boards">
        {filteredBoards.map((board) => (
          <div key={board.id} className="board">
            <img src={board.image} alt={board.title} className='board-image'/>
            <h2>{board.title}</h2>
            <p>{board.category}</p>
            <p>{board.author}</p>
            {/* board page link setup */}
            {/* <Link to={`/boards/${board.id}`}>View Board</Link> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BoardGrid
