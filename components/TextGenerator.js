// TextGenerator.js

import React, { useState } from 'react';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';
import { css } from '@emotion/react';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

export default function TextGenerator({ onGeneratePdf, onPrompt }) {
  const [text, setText] = useState('');
  const [output, setOutput] = useState('');
  const [maxTokens, setMaxTokens] = useState(60);
  const [temperature, setTemperature] = useState(0.5);
  const [model, setModel] = useState('nietzsche'); // Default model is 'nietzsche'
  const [loading, setLoading] = useState(false);

  const generateText = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post('/api/nietzscheBotAPI', {
        text,
        max_tokens: parseInt(maxTokens),
        temperature: parseFloat(temperature),
        model, // Pass the selected model
      });

      const generatedText = res.data.choices[0].text;
      let cleanedText = '';

      const primaryPunctuations = ['.', '?', '!'];
      const secondaryPunctuations = [',', ';', ')'];

      let lastPrimaryPunctuationIndex = -1;

      for (let i = primaryPunctuations.length - 1; i >= 0; i--) {
        const punctuation = primaryPunctuations[i];
        lastPrimaryPunctuationIndex = generatedText.lastIndexOf(punctuation);

        if (lastPrimaryPunctuationIndex !== -1) {
          break;
        }
      }

      if (lastPrimaryPunctuationIndex !== -1) {
        cleanedText = generatedText.slice(0, lastPrimaryPunctuationIndex + 1);
      } else {
        let lastSecondaryPunctuationIndex = -1;

        for (let i = secondaryPunctuations.length - 1; i >= 0; i--) {
          const punctuation = secondaryPunctuations[i];
          lastSecondaryPunctuationIndex = generatedText.lastIndexOf(punctuation);

          if (lastSecondaryPunctuationIndex !== -1) {
            break;
          }
        }

        if (lastSecondaryPunctuationIndex !== -1) {
          cleanedText = generatedText.slice(0, lastSecondaryPunctuationIndex + 1);
        } else {
          cleanedText = generatedText;
        }

        if (!cleanedText.endsWith('...')) {
          cleanedText += '...';
        }
      }

      setOutput(cleanedText);
      onGeneratePdf(cleanedText);
      onPrompt(text); // Pass the prompt value to the parent component
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  };

  return (
    <div>
      <form onSubmit={generateText} className="space-y-4">
        <div>
          <label htmlFor="text" className="block text-sm font-medium text-gray-700">
            Titre
          </label>
          <input
            id="text"
            type="text"
            required
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label htmlFor="max-tokens" className="block text-sm font-medium text-gray-700">
            Max tokens
          </label>
          <input
            id="max-tokens"
            type="number"
            required
            value={maxTokens}
            onChange={(e) => setMaxTokens(e.target.value)}
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label htmlFor="temperature" className="block text-sm font-medium text-gray-700">
            Créativité (temperature)
          </label>
          <input
            id="temperature"
            type="number"
            step="0.1"
            required
            value={temperature}
            onChange={(e) => setTemperature(e.target.value)}
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label htmlFor="model" className="block text-sm font-medium text-gray-700">
            Auteur à émuler
          </label>
          <select
            id="model"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          >
            <option value="nietzsche">Nietzsche</option>
            <option value="fontaine">Fontaine</option>
          </select>
        </div>

        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Genérer
          </button>
        </div>
      </form>

      {loading ? (
        <div className="flex items-center justify-center">
          <ClipLoader color="#3B82F6" css={override} size={35} />
        </div>
      ) : (
        output && (
          <div className="max-w-md w-full p-6 bg-white rounded-xl shadow-md">
            <p className="text-gray-700">{output}</p>
          </div>
        )
      )}
    </div>
  );
}
