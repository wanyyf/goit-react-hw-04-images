import { useState } from 'react';
import propTypes from 'prop-types';

export function SearchBar({ onBtnSubmit }) {
  const [photosName, setphotosName] = useState('');

  const onInputChange = evt => {
    setphotosName(evt.currentTarget.value.toLowerCase());
  };
  const onClickSubmit = event => {
    event.preventDefault();
    if (photosName.trim() === '') {
      alert('Введите что-то');
      return;
    }
    onBtnSubmit(photosName);
    setphotosName('');
  };

  return (
    <header className="searchbar">
      <form className="SearchForm" onSubmit={onClickSubmit}>
        <input
          className="SearchForm-input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={photosName}
          onChange={onInputChange}
        />
        <button type="submit" className="SearchForm-button">
          <span>Search</span>
        </button>
      </form>
    </header>
  );
}
SearchBar.propTypes = {
  onBtnSubmit: propTypes.func.isRequired,
};

export default SearchBar;
