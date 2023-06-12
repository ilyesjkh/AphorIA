import React, { useEffect, useState } from 'react';
import { supabase } from '../pages/api/supabase';

const AphorismCardWithSignature = ({ title, text, image, userId, model }) => {
  const [username, setUsername] = useState('');

  useEffect(() => {
    fetchUsername();
  }, []);

  const fetchUsername = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('username')
        .eq('id', userId)
        .single();

      if (error) {
        throw error;
      }

      setUsername(data.username);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-md w-full p-6 bg-white rounded-xl shadow-md">
      {image && (
        <img
          src={`data:image/png;base64,${image}`}
          alt="Generated Image"
          className="mb-4 mx-auto max-h-96"
        />
      )}
      <h2 className="text-center text-2xl font-bold mb-2">{title}</h2>
      <p className="text-gray-700 leading-relaxed mb-2">{text}</p>
      <p className="text-gray-700 italic mb-4">- {username}</p>
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-500">Model: {model}</div>
      </div>
    </div>
  );
};

export default AphorismCardWithSignature;
