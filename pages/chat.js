import React from 'react';
import Navbar from '../components/Navbar';
import Chat from '../components/Chat';
import Layout from '../components/Layout';
import MessagesList from '../components/MessagesList';
import MessageForm from '../components/MessageForm';
import { MessagesProvider } from 'utils/useMessages'
import { ToastProvider } from '@apideck/components';

const ChatPage = () => {
  return (
    <div>
      <header style={{ paddingBottom: '10vh' }}>
        <Navbar />
      </header>

      <MessagesProvider>
        <Layout>
          <MessagesList />
          <div className="fixed bottom-0 right-0 left-0">
            <MessageForm />
          </div>
        </Layout>
      </MessagesProvider>
    </div>
  );
};

export default ChatPage;
