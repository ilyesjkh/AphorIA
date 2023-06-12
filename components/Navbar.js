import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { FiMenu } from 'react-icons/fi';
import { supabase } from '../pages/api/supabase';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        throw error;
      }
      setUser(data.user);
      const { data: userProfile, error: profileError } = await supabase
        .from('profiles')
        .select('username')
        .eq('id', data.user.id)
        .single();
      if (profileError) {
        throw profileError;
      }
      if (userProfile) {
        setUsername(userProfile.username);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-white fixed top-0 w-[100%] z-10">
      <div className="container mx-auto flex justify-between items-center px-20 py-4">
        <Link href="/" passHref>
          <span className="text-bold text-xl cursor-pointer">AphorIA</span>
        </Link>
        <div className="hidden md:flex gap-6">
          <Link href="/nietzsche" passHref>
            <span className="whitespace-nowrap px-4 py-2 text-lg font-medium hover:text-white hover:rounded-full hover:bg-black cursor-pointer">Générer</span>
          </Link>
          <Link href="/mycards" passHref>
            <span className="whitespace-nowrap px-4 py-2 text-lg font-medium hover:text-white hover:rounded-full hover:bg-black cursor-pointer">Mes extraits</span>
          </Link>
          <Link href="/allcards" passHref>
            <span className="whitespace-nowrap px-4 py-2 text-lg font-medium hover:text-white hover:rounded-full hover:bg-black cursor-pointer">Tous les extraits</span>
          </Link>
        </div>
        {user ? (
          <Link href="/profile" passHref>
            <span className="whitespace-nowrap px-4 py-2 text-lg font-medium hover:text-white hover:rounded-full hover:bg-black cursor-pointer">
              {username || user.email}
            </span>
          </Link>
        ) : (
          <Link href="/AuthentificationPage" passHref>
            <span className="whitespace-nowrap px-4 py-2 text-lg font-medium hover:text-white hover:rounded-full hover:bg-black cursor-pointer">
              Connexion
            </span>
          </Link>
        )}
        <div className="md:hidden text-2xl">
          <FiMenu />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
