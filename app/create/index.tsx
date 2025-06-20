import * as React from 'react';
import { View, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView } from 'react-native';
import { Text } from '~/components/ui/text';
import { TriviaForm } from '~/components/myui/trivia-form';
import { ChatInput } from '~/components/myui/chat-input';
import { Suggestions } from '~/components/myui/suggestions';
import { Brain, BookOpen, Pencil, Guitar, LucideIcon, Eye, Plus } from 'lucide-react-native';
import { useState } from 'react';
import { Messages } from '~/components/myui/messages';
import { Button } from '~/components/ui/button';
import { Trivia } from '~/components/myui/trivia';

type welcomeScreen = boolean;
type showQuiz = boolean;

// Suggestions data with proper typing
interface SuggestionData {
  id: string;
  title: string;
  icon: LucideIcon;
}

interface messages {
  id: string;
  content: string;
  sender: 'user' | 'ai';
}

export type QuestionType = "multiple_choice" | "true_false" | "fill_in_the_blank";

interface QuestionOption {
  label: string;
  text: string;
  is_correct: boolean;
}

export interface QuizQuestion {
  id: string;
  question_type: QuestionType;
  question: string;
  options?: QuestionOption[];  // Optional, for multiple choice questions
  correct_answer: string;
  explanation: string;
}

export interface Artifact {
  quizId: string;         // Added for quiz tracking
  response_id: string;
  content: QuizQuestion[];
  quiz_parameters: Record<string, any>;  // Dict[str, any] equivalent
  user_id: string;
  created_at: string;          // ISO datetime string
  is_published: boolean;
  published_at?: string;       // Optional ISO datetime string
  quiz_confirmation_msg?: string | null; // Optional confirmation message, can be null
}



// Suggestions data with proper typing
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

const messages: messages[] = [
  {
    id: '1',
    content: 'Hello, how are you?',
    sender: 'user',
  },
  {
    id: '2',
    content: 'I am good, thank you!',
    sender: 'ai',
  },
  {
    id: '3',
    content: 'Warning: perform a React state update on a component that has not mounted yet. This indicates that you have a side-effect in your render function that asynchronously later calls tries to update the component. Move this work to useEffect instead.',
    sender: 'user',
  },
  {
    id: '4',
    content: "Warning: Can't perform a React state update on a component that hasn't mounted yet. This indicates that you have a side-effect in your render function that asynchronously later calls tries to update the component. Move this work to useEffect instead.",
    sender: 'ai',
  },
  {
    id: '5',
    content: 'Warning: perform a React state update on a component that has not mounted yet. This indicates that you have a side-effect in your render function that asynchronously later calls tries to update the component. Move this work to useEffect instead.',
    sender: 'user',
  },
  {
    id: '6',
    content: "Warning: Can't perform a React state update on a component that hasn't mounted yet. This indicates that you have a side-effect in your render function that asynchronously later calls tries to update the component. Move this work to useEffect instead.",
    sender: 'ai',
  },
  {
    id: '7',
    content: 'Warning: perform a React state update on a component that has not mounted yet. This indicates that you have a side-effect in your render function that asynchronously later calls tries to update the component. Move this work to useEffect instead.',
    sender: 'user',
  },
  {
    id: '8',
    content: "Warning: Can't perform a React state update on a component that hasn't mounted yet. This indicates that you have a side-effect in your render function that asynchronously later calls tries to update the component. Move this work to useEffect instead.",
    sender: 'ai',
  },
  {
    id: '9',
    content: 'Warning: perform a React state update on a component that has not mounted yet. This indicates that you have a side-effect in your render function that asynchronously later calls tries to update the component. Move this work to useEffect instead.',
    sender: 'user',
  },
  {
    id: '10',
    content: "Warning: Can't perform a React state update on a component that hasn't mounted yet. This indicates that you have a side-effect in your render function that asynchronously later calls tries to update the component. Move this work to useEffect instead.",
    sender: 'ai',
  },
];

// Sample quiz data
const quizData: QuizQuestion[] = [
  {
    question_type: 'multiple_choice',
    question: 'What is the capital of France?',
    options: [
      { label: 'A', text: 'Paris', is_correct: true },
      { label: 'B', text: 'London', is_correct: false },
      { label: 'C', text: 'Berlin', is_correct: false },
      { label: 'D', text: 'Madrid', is_correct: false },
    ],
    correct_answer: 'A',
    explanation: 'Paris is the capital of France.',
  },
  // {
  //   question_type: 'true_false',
  //   question: 'Is the sky blue?',
  //   correct_answer: 'True',
  //   explanation: 'The sky is blue.',
  // },
  // {
  //   question_type: 'fill_in_the_blank',
  //   question: 'What is the capital of France?',
  //   correct_answer: 'Paris',
  //   explanation: 'Paris is the capital of France.',
  // },
  {
    id: '1',
    question_type: 'multiple_choice',
    question: 'What is a city in Europe?',
    options: [
      { label: 'A', text: 'Paris', is_correct: true },
      { label: 'B', text: 'London', is_correct: true },
      { label: 'C', text: 'Moscow', is_correct: false },
      { label: 'D', text: 'Nairobi', is_correct: false },
    ],
    correct_answer: 'A',
    explanation: 'Paris is the capital of France.',
  },
  {
    id: '2',
    question_type: 'multiple_choice',
    question: 'What is a city in Africa?',
    options: [
      { label: 'A', text: 'Paris', is_correct: false },
      { label: 'B', text: 'London', is_correct: false },
      { label: 'C', text: 'Nairobi', is_correct: true },
      { label: 'D', text: 'Madrid', is_correct: false },
    ],
    correct_answer: 'C',
    explanation: 'Nairobi is the capital of Kenya.',
  },
  {
    id: '3',
    question_type: 'multiple_choice',
    question: 'What is a city in Asia?',
    options: [
      { label: 'A', text: 'Paris', is_correct: false },
      { label: 'B', text: 'London', is_correct: false },
      { label: 'C', text: 'Moscow', is_correct: false },
      { label: 'D', text: 'Tokyo', is_correct: true },
    ],
    correct_answer: 'D',
    explanation: 'Tokyo is the capital of Japan.',
  }

];

// Sample artifact data
const artifactData: Artifact[] = [
  {
    quizId: "quiz-001",
    response_id: "response-001",
    content: quizData, // Our QuizQuestion[] array
    quiz_parameters: {
      topic: "Geography and Cities",
      difficulty: "medium",
      question_count: quizData.length
    },
    user_id: "user-123",
    created_at: new Date().toISOString(),
    is_published: true,
    published_at: new Date().toISOString(),
    quiz_confirmation_msg: "Quiz created successfully!"
  }
];

export default function CreateScreen() {
  const [welcomeScreen, setWelcomeScreen] = useState<boolean>(true);
  const [showQuiz, setShowQuiz] = useState<boolean>(false);
  const scrollViewRef = React.useRef<ScrollView>(null);

  const scrollToBottom = () => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  };

  // Scroll to bottom when messages change
  React.useEffect(() => {
    if (!welcomeScreen) {
      scrollToBottom();
    }
    console.log('Welcome Screen:', welcomeScreen);
    console.log('Show Quiz:', showQuiz);
  }, [messages, welcomeScreen, showQuiz]);
  

  return (
    <SafeAreaView className="flex-1 bg-background">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
        keyboardVerticalOffset={0}
      >
        {/* Fixed Header */}
        <View className="bg-background p-4">
          <View className='flex-row items-center justify-around'>
            {welcomeScreen ? null : (
              <>
                <View className='flex-row items-center gap-2'>
                  <Button className='text-sm font-fredoka-light'
                  onPress={() => setWelcomeScreen(true)}
                  >
                    <Plus size={16} />
                    <Text>New Quiz</Text>
                  </Button> 
                </View>
                
                <Text className='text-sm font-fredoka-light'>
                  Lets Chat
                </Text> 
                
                <View className='flex-row items-center gap-2'>
                  <Button className='text-sm font-fredoka-light' onPress={() => setShowQuiz(true)}>
                    <Eye size={16} />
                    <Text>View Quiz</Text>
                  </Button> 
                </View>
              </>
            )}
          </View>
        </View>

        {/* Main Content */}
        <View className="flex-1">
          <ScrollView 
            ref={scrollViewRef}
            className="flex-1 p-4" 
            showsVerticalScrollIndicator={false}
          >
            <View className="flex-1 justify-center">
              {welcomeScreen ? (
                <>
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
                  <View className="px-4">
                    <ChatInput welcomeScreen={welcomeScreen} setWelcomeScreen={setWelcomeScreen} showQuiz={showQuiz} setShowQuiz={setShowQuiz} />
                  </View>
                </>
              ) : showQuiz ? (
                <>
                  <Trivia artifacts={artifactData} showQuiz={showQuiz} />
                </>
              ) : (
                <>
                  <Messages messages={messages} />
                </>
              )}
            </View>
          </ScrollView>
          
          {(!welcomeScreen && !showQuiz) && (
            <View className="bg-background mx-4 mb-4">
              <ChatInput welcomeScreen={welcomeScreen} setWelcomeScreen={setWelcomeScreen} showQuiz={showQuiz} setShowQuiz={setShowQuiz} />
            </View>
          )}

          {(!welcomeScreen && showQuiz) && (
            <View className="bg-background mx-4 mb-4">
              <ChatInput welcomeScreen={welcomeScreen} setWelcomeScreen={setWelcomeScreen} showQuiz={showQuiz} setShowQuiz={setShowQuiz} />
            </View>
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
