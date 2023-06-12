// ImageGenerator.js

import React, { useState } from 'react';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';
import { css } from '@emotion/react';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

export default function ImageGenerator({ onImageSelected }) {
  const [prompt, setPrompt] = useState('');
  const [images, setImages] = useState([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [n, setN] = useState(1);
  const [size, setSize] = useState('1024x1024');
  const [loading, setLoading] = useState(false);

  const generateImages = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post('/api/illustrationBotAPI', {
        text: prompt,
        n: parseInt(n),
        size,
        response_format: 'base64',
      });

      setImages(res.data.data);
      setSelectedImageIndex(null);
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  };

  const handleImageSelect = (index) => {
    setSelectedImageIndex(index);
    onImageSelected(images[index]?.b64_json);
  };

  return (
    <div>
      <form onSubmit={generateImages} className="space-y-4">
        <textarea
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Enter a text description"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />

        <div>
          Nombre d&apos;images à générer: {n}
          <input
            type="range"
            min="1"
            max="10"
            value={n}
            onChange={(e) => setN(e.target.value)}
            className="mt-1 w-full h-1 bg-blue-200 rounded overflow-hidden appearance-none"
          />
        </div>

        <div>
          Taille de l&apos;image: {size}
          <select
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            value={size}
            onChange={(e) => setSize(e.target.value)}
            required
          >
            <option value="256x256">256x256</option>
            <option value="512x512">512x512</option>
            <option value="1024x1024">1024x1024</option>
          </select>
        </div>

        <button
          type="submit"
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Générer
        </button>
      </form>

      {loading ? (
        <div className="flex items-center justify-center">
          <ClipLoader color="#3B82F6" css={override} size={35} />
        </div>
      ) : (
        images && images.length > 0 ? (
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4">Images générées</h2>
            <select
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={selectedImageIndex}
              onChange={(e) => handleImageSelect(e.target.value)}
            >
              <option value={null}>Sélectionnez une image</option>
              {images.map((_, index) => (
                <option key={index} value={index}>
                  Image {index + 1}
                </option>
              ))}
            </select>
            {selectedImageIndex !== null && (
              <div className="mt-4">
                <img
                  src={`data:image/png;base64,${images[selectedImageIndex]?.b64_json}`}
                  alt={`Generated Image ${selectedImageIndex + 1}`}
                  className="mx-auto max-h-96"
                />
              </div>
            )}
          </div>
        ) : (
          <p>Aucune image générée.</p>
        )
      )}
    </div>
  );
}
