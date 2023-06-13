// AllCards.js

import React, { useEffect, useState } from 'react';
import AphorismCardWithSignature from '../components/AphorismCardWithSignature';
import Navbar from '../components/Navbar';
import { supabase } from './api/supabase';

export default function AllCards() {
  const [allCards, setAllCards] = useState([]);

  useEffect(() => {
    fetchAllCards();
  }, []);

  const fetchAllCards = async () => {
    try {
      const { data, error } = await supabase.from('generations').select('*');

      if (error) {
        throw error;
      }

      setAllCards(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <Navbar />

      <div className="mt-8">
        <h1 className="text-3xl font-bold mb-8">All Cards</h1>

        <div className="max-w-md w-full">
          {allCards.map((card) => (
            <div className="mb-8" key={card.id}>
              <AphorismCardWithSignature
                title={card.prompt} // Use the prompt value as the title
                text={card.generated_text}
                image={card.generated_image}
                userId={card.user_id}
                model={card.model} // Pass the model value
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
