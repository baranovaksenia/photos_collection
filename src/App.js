import React, { useEffect, useState } from 'react';
import Collection from './components/Collection';
import Spinner from './components/Spinner';
import './index.scss';

const categories = [
  { name: 'All' },
  { name: 'Mountains' },
  { name: 'Sea' },
  { name: 'Architecture' },
  { name: 'Cities' },
];

function App() {
  const [collections, setCollections] = useState([]);
  const [searchCollection, setSearchCollection] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [categoryId, setCategoryId] = useState(0); //0 - ALL
  // pagination
  const [page, setPage] = useState(1);

  //fetch data from mockapi
  useEffect(() => {
    setIsLoading(true);
    // https://mockapi.io/photos_collection?category=3
    const category = categoryId ? `category=${categoryId}` : '';
    fetch(
      `https://62fcd39ab9e38585cd46caa4.mockapi.io/photos_collection?page=${page}&limit=3&${category}`,
    )
      .then((response) => response.json())
      .then((data) => setCollections(data))
      .catch((err) => {
        console.warn(err);
        alert('Error: ' + err.message);
      })
      .finally(() => setIsLoading(false));
  }, [categoryId, page]);

  return (
    <div className="App">
      <h1>My photo's collection</h1>
      <div className="top">
        <ul className="tags">
          {categories.map((obj, index) => (
            <li
              key={index}
              className={categoryId === index ? 'active' : ''}
              onClick={() => setCategoryId(index)}>
              {obj.name}
            </li>
          ))}
        </ul>
        <input
          className="search-input"
          placeholder="Search..."
          value={searchCollection}
          onChange={(e) => setSearchCollection(e.target.value)}
        />
      </div>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="content">
          {/* filtering data depends on user's input */}
          {collections
            .filter((obj) => obj.name.toLowerCase().includes(searchCollection.toLowerCase()))
            .map((obj, index) => (
              <Collection name={obj.name} key={index} images={obj.photos} />
            ))}
        </div>
      )}
      {/* from backend we get number of pages */}
      <ul className="pagination">
        {[...Array(3)].map((_, index) => (
          <li
            key={index}
            onClick={() => setPage(index + 1)}
            className={page === index + 1 ? 'active' : ''}>
            {index + 1}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
