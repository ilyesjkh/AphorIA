// index.js

import React from 'react';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';

export default function Index() {
  const router = useRouter();

  const handleStartGenerating = () => {
    // Redirige vers la page Nietzsche
    router.push('/nietzsche');
  };

  return (
    <div>
      <Navbar />

      <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-gradient-to-b from-blue-400 to-purple-500">
        <div className="text-center text-white">
          <h1 className="text-4xl font-bold mb-8">Bienvenue dans le monde de la création littéraire !</h1>
          <p className="text-lg mb-8">
            Avez-vous toujours voulu écrire comme Nietzsche ou La Fontaine ? Maintenant, vous avez la chance de briller littérairement (vous n&apos;en aurez pas d&apos;autre). Explorez le pouvoir des mots et de la créativité avec notre générateur de textes par intelligence artificielle.
          </p>
        </div>

        <div className="mt-12">
          <button
            onClick={handleStartGenerating}
            className="mb-8 px-8 py-4 font-bold text-white bg-yellow-400 rounded hover:bg-yellow-500 focus:outline-none shadow-lg"
          >
            Commencer la génération !
          </button>
        </div>

        <div className="text-center text-white">
          <p className="text-lg mb-4">
            Nos modèles sont entraînés sur des centaines de textes de chaque auteur pour imiter leur style et émuler leur pensée.
          </p>
          <p className="text-lg">
            Vous pourrez également générer des images pour illustrer vos aphorismes.
          </p>
        </div>
      </div>
    </div>
  );
}
