import React, { useState } from 'react';
import './CreateBoardForm.css'
import { useNavigate } from 'react-router-dom';

const CreateBoardForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState(null);
  const [author, setAuthor] = useState('');

  const [isOpen, setIsOpen] = useState(true); // Open or close the form modal
  const navigate= useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    // Validate form data
    if (!title || !description || !category || !image) {
      alert('Please fill out all required fields');
      return;
    }
    // Create new board
    const newBoard = {
      title,
      description,
      category,
      image,
      author: author || null
    };
    // Save new board to database or API
    // ...
  };

  const onClose = () => {
    setIsOpen(false);
    navigate.push('/'); // Go back to main home page
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
            Description:
            <textarea value={description} onChange={(event) => setDescription(event.target.value)} />
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
            <input type="file" accept="image/*" onChange={(event) => setImage(event.target.files[0])} />
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
      {!isOpen && <p>Form is closed</p>}
    </div>

  );
};

export default CreateBoardForm
