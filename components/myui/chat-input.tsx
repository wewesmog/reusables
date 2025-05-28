import { Textarea } from '~/components/ui/textarea';
import { Text } from '~/components/ui/text';
import * as React from 'react';
import { View, Platform } from 'react-native';
import { Button } from '~/components/ui/button';
import { Send, Paperclip } from 'lucide-react-native';
import { Separator } from '~/components/ui/separator';
export function ChatInput() {
  const [message, setMessage] = React.useState('');
  return (
    <View className='border border-cyan-200 rounded-lg p-4  bg-white dark:bg-gray-800'>
      <Text className='text-lg font-fredoka-bold mb-2 text-black dark:text-white'>
        Tell us what you want to create?
      </Text>
      {/* <Text className='text-sm font-fredoka-light text-gray-500 dark:text-gray-400 mb-2'>
        Ensure to include all the details like tone, difficulty, etc
      </Text> */}
      <Textarea
        placeholder='Ensure to include all the details like tone, difficulty, etc'
        value={message}
        onChangeText={setMessage}
        aria-labelledby='textareaLabel'
        className='min-h-[80px] max-h-[120px] placeholder:text-gray-400 placeholder:text-sm font-fredoka-light mb-1 rounded-lg'
        multiline
        numberOfLines={Platform.OS === 'ios' ? undefined : 1}
        textAlignVertical='top'
      />
      <View className='flex-row justify-between items-center'>
        <Text className='text-sm font-fredoka-light text-cyan-600 dark:text-cyan-400'>
          {message.length} / 1000
        </Text>
        <View className='flex-row items-center gap-2'>
          <Button variant='outline' size='icon' className='w-10 h-10'>
            <Paperclip size={16} color="cyan" />
          </Button>
          <Button variant='outline' size='icon' className='w-10 h-10'>
            <Send size={16} color="cyan" />
          </Button>
        </View>
      </View>
    </View>
  );
}