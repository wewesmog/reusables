import * as React from 'react';
import { View, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView } from 'react-native';
import { Text } from '~/components/ui/text';
import { TriviaForm } from '~/components/myui/trivia-form';
import { ChatInput } from '~/components/myui/chat-input';
import { Suggestions } from '~/components/myui/suggestions';
import { Brain, BookOpen, Pencil, Guitar, LucideIcon } from 'lucide-react-native';

// Suggestions data with proper typing
interface SuggestionData {
  id: string;
  title: string;
  icon: LucideIcon;
}

const suggestionsData: SuggestionData[] = [
  {
    id: 'ai',
    title: 'Create a trivia game on AI',
    icon: Brain,
  },
  {
    id: 'music',
    title: 'Create a trivia game on Music',
    icon: Guitar,
  },
  {
    id: 'books',
    title: 'Create a trivia game on Books',
    icon: BookOpen,
  },
  {
    id: 'writing',
    title: 'Create a trivia game on Writing',
    icon: Pencil,
  },
];

export default function CreateScreen() {
  return (
    <SafeAreaView className="flex-1 bg-background">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
        keyboardVerticalOffset={0}
      >
        {/* Fixed Header */}
        <View className="bg-background p-4">
          {/* <Text className='text-sm font-fredoka-light'>
            Choose a topic and create a trivia game for your friends and family.
          </Text> */}
        </View>

        {/* Main Content */}
        <ScrollView className="flex-1 p-4" showsVerticalScrollIndicator={false}>
          <View className="flex-1 justify-center">
            <Text className='text-lg font-fredoka-light mb-12 text-center'>
              Let's kick off with suggested trivia, or chat with me to create your own.
            </Text>
            
            {/* Suggestions mapped from data */}
            <View className="gap-3 mb-16 items-center">
              {suggestionsData.map((suggestion) => (
                <Suggestions 
                  key={suggestion.id} 
                  title={suggestion.title} 
                  icon={suggestion.icon} 
                />
              ))}
            </View>
            
            <ChatInput />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
