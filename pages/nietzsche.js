import { useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import TextGenerator from '../components/TextGenerator';
import ImageGenerator from '../components/ImageGenerator';
import AphorismCard from '../components/AphorismCard';
import PdfGeneration from '../components/PdfGeneration';
import { supabase } from '../pages/api/supabase';
import { getUser } from '../pages/utils/userUtils';

export default function Nietzsche() {
  const [generatedText, setGeneratedText] = useState('');
  const [generatedImage, setGeneratedImage] = useState(null);
  const [prompt, setPrompt] = useState('');
  const [model, setModel] = useState('nietzsche'); // Default model is 'nietzsche'

  const handleGenerateCard = async () => {
    // Only proceed if a text is generated
    if (!generatedText) return;

    try {
      // Get the current user
      const user = await getUser();

      if (!user || !user.id) {
        throw new Error('User ID is missing.');
      }

      // Insert the generated text and image data into the "generations" table
      const { data, error } = await supabase
        .from('generations')
        .insert([
          {
            user_id: user.id,
            generated_text: generatedText,
            prompt: prompt, // Use the prompt value from state
            generated_image: generatedImage,
            model: model, // Add the model value
          },
        ]);

      if (error) {
        throw error;
      }

      console.log('Generation data added to the table:', data);

      // Clear the generated text, image, prompt, and model after saving
      setGeneratedText('');
      setGeneratedImage(null);
      setPrompt('');
      setModel('nietzsche'); // Reset the model to 'nietzsche'
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Navbar />

      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-3xl font-bold mb-8">Nietzsche Generator</h1>

        <div className="max-w-md w-full p-6 bg-white rounded-xl shadow-md mb-8">
          <TextGenerator
            onGeneratePdf={setGeneratedText}
            onPrompt={setPrompt}
            onModelChange={setModel}
            selectedModel={model}
          />
        </div>

        <div className="max-w-md w-full p-6 bg-white rounded-xl shadow-md mb-8">
          <ImageGenerator onImageSelected={setGeneratedImage} />
        </div>

        <div className="max-w-md w-full p-6 bg-white rounded-xl shadow-md mb-8">
          <AphorismCard text={generatedText} image={generatedImage} />
        </div>

        <button
          onClick={handleGenerateCard}
          disabled={!generatedText}
          className={`w-full py-2 px-4 rounded font-medium text-white bg-indigo-500 ${
            !generatedText ? 'cursor-not-allowed opacity-50' : 'hover:bg-indigo-700'
          }`}
        >
          Genérer l'extrait
        </button>
      </div>
    </div>
  );
}
