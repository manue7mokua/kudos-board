import React, { useState } from 'react';
import './CreateBoardForm.css'

const CreateBoardForm = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState('');
  const [author, setAuthor] = useState('');

  const [isOpen, setIsOpen] = useState(true); // Open or close the form modal

  const handleSubmit = (event) => {
    event.preventDefault();
    // Validate form data
    if (!title || !category || !image || !author) {
      alert('Please fill out all required fields');
      return;
    }
    // Create new board
    const newBoard = {
      title,
      category,
      image,
      author
    };
    // Call the onSubmit callback with the new board object
    onSubmit(newBoard);
    console.log(newBoard)
  };

  const onClose = () => {
    setIsOpen(false);
    window.location.href = '/'; // Close both the modal and the overlay
  };

  return (
    <div className='board-form-container'>
        {isOpen && (
        <form onSubmit={handleSubmit} className='create-board-form'>
          <label>
            Title:
            <input type="text" value={title} onChange={(event) => setTitle(event.target.value)} />
          </label>
          <br />
          <label>
            Category:
            <select value={category} onChange={(event) => setCategory(event.target.value)}>
              <option value="">Select a category</option>
              <option value="recent">Recent</option>
              <option value="celebration">Celebration</option>
              <option value="thank-you">Thank You</option>
            </select>
          </label>
          <br />
          <label>
            Image:
            <input type="text" value={image} onChange={(event) => setImage(event.target.value)} />
          </label>
          <br />
          <label>
            Author (optional):
            <input type="text" value={author} onChange={(event) => setAuthor(event.target.value)} />
          </label>
          <br />
          <button type="submit">Create Board</button>
          <button type="button" onClick={onClose}>Close</button>
        </form>
      )}
      {!isOpen && <p>Form is closed</p>
      }
    </div>

  );
};

export default CreateBoardForm
