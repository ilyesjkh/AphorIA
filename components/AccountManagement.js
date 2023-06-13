import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../pages/api/supabase';

export default function AccountManagement() {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');

  const router = useRouter();

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      const { data, error } = await supabase
        .from('profiles')
        .select('username, avatar_url')
        .eq('id', user.id)
        .single();

      if (error) {
        throw error;
      }

      if (data) {
        setUsername(data.username);
        setAvatarUrl(data.avatar_url);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const updateProfile = async (e) => {
    e.preventDefault();

    try {
      const { error } = await supabase.from('profiles').upsert([
        {
          id: user.id,
          username: username,
          updated_at: new Date().toISOString(),
        },
      ]);

      if (error) {
        throw error;
      }

      console.log('Profile updated successfully');

      // Refresh the page
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      router.push('/'); // Redirect to the index page
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg px-8 py-6">
      <h2 className="text-2xl font-bold mb-6">Account Management</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Email:</label>
          <p className="text-gray-800">{user.email}</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Username:</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <button
          onClick={updateProfile}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Update Profile
        </button>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
