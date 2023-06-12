// MyCards.js

import React, { useEffect, useState } from 'react';
import AphorismCardWithSignature from '../components/AphorismCardWithSignature';
import Navbar from '../components/Navbar';
import { supabase } from '../pages/api/supabase';
import { getUser } from '../pages/utils/userUtils';

export default function MyCards() {
  const [userCards, setUserCards] = useState([]);

  useEffect(() => {
    fetchUserCards();
  }, []);

  const fetchUserCards = async () => {
    try {
      const user = await getUser();

      if (!user || !user.id) {
        throw new Error('User ID is missing.');
      }

      const { data, error } = await supabase
        .from('generations')
        .select('*')
        .eq('user_id', user.id);

      if (error) {
        throw error;
      }

      setUserCards(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <Navbar />

      <div className="mt-8">
        <h1 className="text-3xl font-bold mb-8">My Cards</h1>

        <div className="max-w-md w-full">
          {userCards.map((card) => (
            <div className="mb-8" key={card.id}>
              <AphorismCardWithSignature
                title={card.prompt}
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
