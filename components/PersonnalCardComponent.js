import React from 'react';

const PersonnalCardComponent = ({ profile, onDislike, onLike }) => {
  return (
    <div className="profile-card">
      <img src={profile.imageUrl} alt={profile.name} className="profile-image" />
      <h3 className="profile-name">{profile.name}</h3>
      <p className="profile-description">{profile.description}</p>
      <div className="button-group flex justify-between mt-4">
        <button
          className="swipe-button swipe-button--left bg-red-500 text-white text-lg px-8 py-2 rounded-lg"
          onClick={onDislike}
        >
          Dislike
        </button>
        <button
          className="swipe-button swipe-button--right bg-green-500 text-white text-lg px-8 py-2 rounded-lg"
          onClick={onLike}
        >
          Like
        </button>
      </div>
    </div>
  );
};

export default PersonnalCardComponent;
