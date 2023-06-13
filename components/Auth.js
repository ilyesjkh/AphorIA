import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../pages/api/supabase';

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const router = useRouter();

  const handleSignUp = async () => {
    try {
      const { user, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        setErrorMessage(error.message);
        return;
      }

      console.log('Sign up successful:', user);
      // Refresh the page after successful signup
      router.reload();
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  const handleSignIn = async () => {
    try {
      const { user, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setErrorMessage(error.message);
        return;
      }

      console.log('Sign in successful:', user);
      // Refresh the page after successful sign in
      router.reload();
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleSignIn();
  };

  return (
    <div className="max-w-sm p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">Authentication</h2>
      {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email" className="block font-medium">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full p-2 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password" className="block font-medium">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="w-full p-2 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex justify-between items-center">
          <button
            type="button"
            onClick={handleSignUp}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Sign Up
          </button>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
}
