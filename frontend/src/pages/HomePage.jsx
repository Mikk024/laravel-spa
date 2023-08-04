import React, { useState, useEffect } from 'react';
import CardList from '../components/CardList';
import Search from '../components/Search';
import LoadingSpinner from '../components/LoadingSpinner';
import axios from '../api/axios';

const HomePage = () => {
  const [cards, setCards] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const handleQuery = (e) => {
    setQuery([]);
    setPage(1);
    setQuery(e.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`api/v1/rooms?page=${page}&address=${query}`);
        if (page === 1) {
          setCards(response.data.data);
        } else {
          setCards((prevCards) => [...prevCards, ...response.data.data]);
        }
      } catch (e) {
        console.log(e);
      }
    };

    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.scrollHeight) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener('scroll', handleScroll);

    setTimeout(() => {
      fetchData();
      setIsLoading(false);
    }, 500);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [page, query]);

  return (
    <div className='px-4 md:px-32 mt-10 space-y-6'>
      <Search query={query} handleQuery={handleQuery} />
      <CardList data={cards} isLoading={isLoading} image={Image} />
      {isLoading ? <LoadingSpinner /> : null}
    </div>
  );
};

export default HomePage;
