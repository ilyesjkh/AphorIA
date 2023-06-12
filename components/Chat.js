import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Chat = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

  const apiKey = process.env.OPENAI_API_KEY;
  const apiURL = 'https://api.openai.com/v1/chat/completions';

  useEffect(() => {
    const initializeChat = async () => {
      try {
        const response = await axios.post(
          apiURL,
          {
            messages: [
              { role: 'system', content: 'You are a helpful assistant.' },
            ],
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${apiKey}`,
            },
          }
        );

        setMessages((prevMessages) => [
          ...prevMessages,
          {
            role: 'assistant',
            content: response.data.choices[0].message.content,
          },
        ]);
      } catch (error) {
        console.error(error);
      }
    };

    initializeChat();
  }, []);

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      // Send user message to the API
      const response = await axios.post(
        apiURL,
        {
          messages: [
            { role: 'user', content: input },
          ],
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`,
          },
        }
      );

      // Add the API response to the messages state
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: 'user', content: input },
        {
          role: 'assistant',
          content: response.data.choices[0].message.content,
        },
      ]);

      // Clear the input field
      setInput('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col h-full p-4">
      <div className="chat-container flex-grow overflow-y-auto">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${
              message.role === 'assistant' ? 'bg-gray-100' : 'bg-blue-200'
            } rounded-md p-2 my-2`}
          >
            {message.content}
          </div>
        ))}
      </div>
      <form onSubmit={handleFormSubmit} className="input-container mt-4">
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="Type your message..."
          className="input-field border border-gray-300 rounded-md p-2 mr-2 flex-grow focus:outline-none"
        />
        <button
          type="submit"
          className="send-button bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default Chat;
