import React, { useState } from 'react';
import PersonnalCardComponent from './PersonnalCardComponent';

const SwipeComponent = () => {
  const profiles = [
    {
      id: 1,
      name: 'Albert Einstein',
      imageUrl: 'https://dummyimage.com/300x300/ccc/fff&text=Albert+Einstein',
      description: 'Physicist',
    },
    {
      id: 2,
      name: 'Barack Obama',
      imageUrl: 'https://dummyimage.com/300x300/ccc/fff&text=Barack+Obama',
      description: 'Former President',
    },
    {
      id: 3,
      name: 'Friedrich Nietzsche',
      imageUrl: 'https://dummyimage.com/300x300/ccc/fff&text=Friedrich+Nietzsche',
      description: 'Philosopher',
    },
    {
      id: 4,
      name: 'Harry Potter',
      imageUrl: 'https://dummyimage.com/300x300/ccc/fff&text=Harry+Potter',
      description: 'Wizard',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleButtonClick = (direction) => {
    if (direction === 'left') {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    } else if (direction === 'right') {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  const renderProfile = () => {
    if (currentIndex < profiles.length) {
      const profile = profiles[currentIndex];

      return (
        <PersonnalCardComponent
          profile={profile}
          onDislike={() => handleButtonClick('left')}
          onLike={() => handleButtonClick('right')}
        />
      );
    } else {
      return <p>No more profiles to swipe!</p>;
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-80 p-4 relative bg-white rounded-lg shadow-md">
        {renderProfile()}
      </div>
    </div>
  );
};

export default SwipeComponent;
