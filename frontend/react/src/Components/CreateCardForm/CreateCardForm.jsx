import React, { useState } from 'react';
import './CreateCardForm.css'
import axios from 'axios';

const CreateCardForm = ({ boardId, onSubmit }) => {
  const [description, setDescription] = useState('');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [author, setAuthor] = useState('');

  const [searchQuery, setSearchQuery] = useState(''); // New state for search query
  const [searchResults, setSearchResults] = useState([]); // New state for search results
  const [selectedGif, setSelectedGif] = useState(''); // New state for selected GIF

  const [isOpen, setIsOpen] = useState(true); // Open or close the form modal

  const handleSubmit = (event) => {
    event.preventDefault();
    // Validate form data
    if (!description || !title || !category || !author) {
      alert('Please fill out all required fields');
      return;
    }
    // Create new card
    const newCard = {
      title,
      description,
      category,
      author,
      imageUrl: selectedGif
    };
    // Save new card to database or API
    // ...
    onSubmit(newCard)
    console.log(newCard)
    console.log(selectedGif)
  };

  const onClose = () => {
    setIsOpen(false);
    window.location.href = `/boards/${boardId}`; // Close both the modal and the overlay
  };

  // Add Giphy Image through API call
  const handleGiphySearch = async (searchQuery) => {
    try {
      const response = await axios.get(`https://api.giphy.com/v1/gifs/search?q=${searchQuery}&limit=8&api_key=FQUWv1npYqBlAzOxLEzkO4RUXeCdVwfi`);
      const giphyData = response.data;
      console.log(giphyData.data)
      // Update cards state with new data from Giphy API
      setSearchResults(giphyData.data);
      console.log(searchResults)
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='card-form-container'>
        {isOpen && (
        <form onSubmit={handleSubmit} className='create-card-form'>
          <label>
            Title:
            <textarea value={title} onChange={(event) => setTitle(event.target.value)} />
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
            Author:
            <input type="text" value={author} onChange={(event) => setAuthor(event.target.value)} />
          </label>
          <br />
          <label>
            Search Query:
            <input type="text" value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} />
          </label>
          <br />
          <button type="submit">Create Card</button>
          <button type="button" onClick={onClose}>Close</button>
          <button type="button" onClick={() => handleGiphySearch(searchQuery)}>Search Giphy</button>
          <div className="search-results">
            {searchResults.map((result) => (
              <div key={result.id} className="search-result-card" onClick={() => setSelectedGif(result.images.original.url)}>
                <img src={result.images.original.url} alt={result.title} />
              </div>
            ))}
          </div>
        </form>
      )}
      {!isOpen && <p>Card Form is closed</p>
      }
    </div>

  );
};

export default CreateCardForm;
