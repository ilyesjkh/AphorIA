import React from 'react';
import Navbar from '../components/Navbar';
import AphorismCard from '../components/AphorismCard';

const CreationsPage = () => {
  return (
    <div>
      <Navbar />
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      <div className="container mx-auto py-8 grid gap-8">
        <h1 className="text-3xl font-bold mb-6">Creations</h1>
        <div className="col-span-1 sm:col-span-2 md:col-span-2 lg:col-span-3">
          <AphorismCard />
        </div>
        <div className="col-span-1 sm:col-span-2 md:col-span-2 lg:col-span-3">
          <AphorismCard />
        </div>
      </div>
    </div>
  );
};

export default CreationsPage;
