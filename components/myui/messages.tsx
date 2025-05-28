import { View } from "react-native";
import { Text } from "../ui/text";
import {Brain, User} from 'lucide-react-native'

interface MessagesProps {
  messages: {
    id: string;
    content: string;
    sender: 'user' | 'ai';
  }[];
}

export const Messages = ({ messages }: MessagesProps) => {
  return (
    <View className="flex-1 gap-4 p-4">
      {messages.map((message, index) => (
        <View 
          key={message.id} 
          className={`flex-row max-w-[96%] ${index === messages.length - 1 ? 'mb-4' : ''}`}
        >
          <View 
            className={`rounded-lg p-3 ${
              message.sender === 'user' 
                ? 'bg-cyan-100 dark:bg-cyan-900' 
                : 'bg-gray-100 dark:bg-gray-800'
            }`}
          >

         
            
            <Text 
              className={`text-base font-fredoka-medium ${
                message.sender === 'user' 
                  ? 'text-cyan-900 dark:text-cyan-100' 
                  : 'text-gray-900 dark:text-gray-100'
              }`}
            > 
            {message.sender === 'user' ? (
              <Text className=' text-gray-900 dark:text-gray-100 font-fredoka-bold text-lg'>You: </Text>
            ) : (
              <Text className='text-cyan-900 dark:text-cyan-100 font-fredoka-bold text-lg'>Maswali: </Text>
            )}
            
              {message.content}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
};
