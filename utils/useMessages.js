import { useToast } from '@apideck/components'
import { createContext, useContext, useEffect, useState } from 'react'
import { sendMessage } from './sendMessage'

const ChatsContext = createContext({})

export function MessagesProvider({ children }) {
  const { addToast } = useToast()
  const [messages, setMessages] = useState([])
  const [isLoadingAnswer, setIsLoadingAnswer] = useState(false)

  useEffect(() => {
    const initializeChat = () => {
      const systemMessage = {
        role: 'system',
        content: 'You are Donald Trump',
      }
      const welcomeMessage = {
        role: 'assistant',
        content: 'Hi, sir.',
      }
      setMessages([systemMessage, welcomeMessage])
    }

    if (!messages?.length) {
      initializeChat()
    }
  }, [messages?.length, setMessages])

  const addMessage = async (content) => {
    setIsLoadingAnswer(true)
    try {
      const newMessage = {
        role: 'user',
        content,
      }
      const newMessages = [...messages, newMessage]

      setMessages(newMessages)

      const { data } = await sendMessage(newMessages)
      const reply = data.choices[0].message

      setMessages([...newMessages, reply])
    } catch (error) {
      addToast({ title: 'An error occurred', type: 'error' })
    } finally {
      setIsLoadingAnswer(false)
    }
  }

  return (
    <ChatsContext.Provider value={{ messages, addMessage, isLoadingAnswer }}>
      {children}
    </ChatsContext.Provider>
  )
}

export const useMessages = () => {
  return useContext(ChatsContext)
}
