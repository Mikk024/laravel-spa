import React from 'react';
import Card from './Card';

const CardList = ({ data, isLoading }) => {
  const cards = data.map((item) => (
    <Card address={item.address} price={item.price} isLoading={isLoading} image={item.images} key={item.id} roomId={item.id} />
  ));

  return (
    <>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-10'>
        {cards}
      </div>
    </>
  );
};

export default CardList;
