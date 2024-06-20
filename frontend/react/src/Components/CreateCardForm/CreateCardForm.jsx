import React, { useState } from 'react';
import './CreateCardForm.css'

const CreateCardForm = (boardId) => {
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState('');
  const [author, setAuthor] = useState('');

  const [isOpen, setIsOpen] = useState(true); // Open or close the form modal

  const handleSubmit = (event) => {
    event.preventDefault();
    // Validate form data
    if (!content || !image || !category || !author) {
      alert('Please fill out all required fields');
      return;
    }
    // Create new card
    const newCard = {
      content,
      image,
      category,
      author
    };
    // Save new card to database or API
    // ...
  };

  const onClose = () => {
    setIsOpen(false);
    window.location.href = `/boards/${boardId}`; // Close both the modal and the overlay
  };

  return (
    <div className='card-form-container'>
        {isOpen && (
        <form onSubmit={handleSubmit} className='create-card-form'>
          <label>
            Content:
            <textarea value={content} onChange={(event) => setContent(event.target.value)} />
          </label>
          <br />
          <label>
            Image:
            <input type="file" accept="image/*" onChange={(event) => setImage(event.target.files[0])} />
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
            Author:
            <input type="text" value={author} onChange={(event) => setAuthor(event.target.value)} />
          </label>
          <br />
          <button type="submit">Create Card</button>
          <button type="button" onClick={onClose}>Close</button>
        </form>
      )}
      {!isOpen && <p>Card Form is closed</p>
      }
    </div>

  );
};

export default CreateCardForm;
