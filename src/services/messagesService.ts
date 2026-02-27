export interface Message {
  id: string;
  type: 'Appointment' | 'Inquiry' | 'Newsletter';
  subject: string;
  content: string;
  timestamp: string;
  to: string;
}

const STORAGE_KEY = 'vitalis_sent_messages';

export const messagesService = {
  getMessages: (): Message[] => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  },

  saveMessage: async (message: Omit<Message, 'id' | 'timestamp'>) => {
    const messages = messagesService.getMessages();
    const newMessage: Message = {
      ...message,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date().toISOString(),
    };
    
    // Save to local storage for dashboard log
    localStorage.setItem(STORAGE_KEY, JSON.stringify([newMessage, ...messages]));

    // Call backend API to send real email
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: message.to,
          subject: message.subject,
          content: message.content
        })
      });
      
      if (!response.ok) {
        console.error('Failed to send real email via backend');
      }
    } catch (err) {
      console.error('Error calling send-email API:', err);
    }

    return newMessage;
  }
};
