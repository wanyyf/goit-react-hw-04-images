import React from 'react';
import SearchBar from './Searchbar/Searchbar';
import Loader from 'components/Loader/Loader';
import api from 'Pixabay_Api/Api';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import { useState } from 'react';
import { useEffect } from 'react';

export function App() {
  const [photosName, setPhotosName] = useState('');
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (page === 1) {
      return;
    }
    photosRequest();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  useEffect(() => {
    if (!photosName) {
      return;
    }
    photosRequest();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [photosName]);

  async function photosRequest() {
    setLoading(true);
    await api
      .dataApi({ page, photosName })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject(new Error(`!!Error!!`));
      })
      .then(data => setPhotos(prevState => [...prevState, ...data.hits]))
      .catch(error => console.log(error))
      .finally(() => setLoading(false));
  }
  const handleFormSubmit = photosName => {
    setPhotosName(photosName);
    setPage(1);
    setPhotos([]);
  };
  const onLoadBtnClick = () => {
    setPage(prevState => prevState + 1);
  };

  return (
    <div className="App">
      <SearchBar onBtnSubmit={handleFormSubmit} />
      <ImageGallery photoArray={photos} />
      {loading && <Loader />}
      {photos.length !== 0 ? (
        <Button messege={'load more'} onLoadBtnClick={onLoadBtnClick} />
      ) : (
        <h2 className="ready">Ready to search!</h2>
      )}
    </div>
  );
}
