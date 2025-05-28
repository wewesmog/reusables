import { Input } from '~/components/ui/input';
import { Text } from '~/components/ui/text';
import * as React from 'react';
import { View, Pressable, Modal, ScrollView } from 'react-native';
import { Check, X } from 'lucide-react-native';
const Slider = require('@react-native-community/slider').default;

interface FormConstraint {
  min: number;
  max: number;
  step: number;
  errorMessages: {
    min: string;
    max: string;
    step?: string;
  };
}

const CATEGORIES = [
  { id: 'general', label: 'General Knowledge' },
  { id: 'science', label: 'Science' },
  { id: 'history', label: 'History' },
  { id: 'geography', label: 'Geography' },
  { id: 'entertainment', label: 'Entertainment' },
  { id: 'sports', label: 'Sports' },
  { id: 'literature', label: 'Literature' },
  { id: 'technology', label: 'Technology' },
  { id: 'arts', label: 'Arts & Culture' },
  { id: 'food', label: 'Food & Drink' }
] as const;

type Category = typeof CATEGORIES[number]['id'];

// Constants for form constraints
const FORM_CONSTRAINTS: Record<'questions' | 'difficulty', FormConstraint> = {
  questions: {
    min: 1,
    max: 20,
    step: 1,
    errorMessages: {
      min: 'Minimum 1 question required',
      max: 'Maximum 20 questions allowed'
    }
  },
  difficulty: {
    min: 0,
    max: 100,
    step: 1,
    errorMessages: {
      min: 'Invalid difficulty level',
      max: 'Invalid difficulty level'
    }
  }
} as const;

interface FormData {
  topic: string;
  category: Category;
  questions: number;
  difficulty: number;
}

type FormErrors = Partial<Record<keyof FormData, string>>;

const validateField = (key: keyof FormData, value: FormData[keyof FormData]): string | undefined => {
  if (key === 'topic') {
    if (typeof value !== 'string' || value.trim().length === 0) {
      return 'Topic is required';
    }
    return undefined;
  }

  if (key === 'category') {
    if (!CATEGORIES.find(c => c.id === value)) {
      return 'Please select a valid category';
    }
    return undefined;
  }

  if (typeof value !== 'number') {
    return 'Invalid value';
  }

  const constraints = FORM_CONSTRAINTS[key as keyof typeof FORM_CONSTRAINTS];
  if (!constraints) return undefined;

  if (value < constraints.min) {
    return constraints.errorMessages.min;
  }
  if (value > constraints.max) {
    return constraints.errorMessages.max;
  }

  return undefined;
};

export function TriviaForm() {
  const [formData, setFormData] = React.useState<FormData>({
    topic: '',
    category: 'general',
    questions: 5,
    difficulty: 50,  // 0-100 scale
  });

  const [errors, setErrors] = React.useState<FormErrors>({});
  const [isCategoryOpen, setIsCategoryOpen] = React.useState(false);
  const [pressedCategory, setPressedCategory] = React.useState<string | null>(null);

  const updateFormData = <K extends keyof FormData>(key: K, value: FormData[K]) => {
    const newValue = typeof value === 'number' ? Math.round(value) : value;
    const error = validateField(key, newValue);
    
    setErrors(prev => ({
      ...prev,
      [key]: error
    }));

    if (!error) {
      setFormData(prev => ({
        ...prev,
        [key]: newValue
      }));
    }
  };

  const getDifficultyLabel = (value: number) => {
    if (value < 33) return 'Easy';
    if (value < 66) return 'Medium';
    return 'Hard';
  };

  return (
    <View className='flex-col w-full space-y-4'> 
      {/* Topic */}
      <View className='flex-col justify-center w-full space-y-2 p-4'>
        <View className='flex-row items-center justify-between'>
          <Text className='text-lg font-fredoka-bold'>Topic</Text>
          <Text className='text-sm font-fredoka-light text-red-500'>Required</Text>
        </View>
        <Input
          placeholder='Enter quiz topic...'
          value={formData.topic}
          onChangeText={(value) => updateFormData('topic', value)}
          className='w-full'
        />
        {errors.topic && (
          <Text className='text-sm font-fredoka-light text-red-500'>{errors.topic}</Text>
        )}
        <Text className='text-sm font-fredoka-light'>This will be the title of your trivia game.</Text>
      </View>

      {/* Category */}
      <View className='flex-col justify-center w-full space-y-2 p-4'>
        <View className='flex-row items-center justify-between'>
          <Text className='text-lg font-fredoka-bold'>Category</Text>
          <Text className='text-base font-fredoka-medium text-cyan-500'>
            {CATEGORIES.find(c => c.id === formData.category)?.label}
          </Text>
        </View>
        <Pressable 
          onPress={() => setIsCategoryOpen(true)}
          className='w-full p-4 rounded-lg bg-gray-100 border border-gray-200'
        >
          <Text className='text-base font-fredoka-medium text-gray-700'>
            {CATEGORIES.find(c => c.id === formData.category)?.label}
          </Text>
        </Pressable>
        {errors.category && (
          <Text className='text-sm font-fredoka-light text-red-500'>{errors.category}</Text>
        )}
        <Text className='text-sm font-fredoka-light'>Select the main category for your quiz</Text>
      </View>

      {/* Number of Questions */}
      <View className='flex-col justify-center w-full space-y-2 p-4'>
        <View className='flex-row items-center justify-between'>
          <Text className='text-lg font-fredoka-bold'>Number of Questions</Text>
          <Text className='text-cyan-500 font-fredoka-medium'>{formData.questions}</Text>
        </View>
        <Slider
          value={formData.questions}
          onValueChange={(value: number) => updateFormData('questions', value)}
          minimumValue={FORM_CONSTRAINTS.questions.min}
          maximumValue={FORM_CONSTRAINTS.questions.max}
          step={FORM_CONSTRAINTS.questions.step}
          style={{ width: '100%', height: 40 }}
        />
        {errors.questions && (
          <Text className='text-sm font-fredoka-light text-red-500'>{errors.questions}</Text>
        )}
        <Text className='text-sm font-fredoka-light'>
          Slide to choose between {FORM_CONSTRAINTS.questions.min}-{FORM_CONSTRAINTS.questions.max} questions
        </Text>
      </View>

      {/* Difficulty Level */}
      <View className='flex-col justify-center w-full space-y-2 p-4'>
        <View className='flex-row items-center justify-between'>
          <Text className='text-lg font-fredoka-bold'>Difficulty</Text>
          <Text className='text-base font-fredoka-medium'>
            {getDifficultyLabel(formData.difficulty)}
          </Text>
        </View>
        <Slider
          value={formData.difficulty}
          onValueChange={(value: number) => updateFormData('difficulty', value)}
          minimumValue={FORM_CONSTRAINTS.difficulty.min}
          maximumValue={FORM_CONSTRAINTS.difficulty.max}
          step={FORM_CONSTRAINTS.difficulty.step}
          style={{ width: '100%', height: 40 }}
        />
        {errors.difficulty && (
          <Text className='text-sm font-fredoka-light text-red-500'>{errors.difficulty}</Text>
        )}
        <Text className='text-sm font-fredoka-light'>Slide to adjust the difficulty level</Text>
      </View>

      {/* Keep Modal at the end */}
      <Modal
        visible={isCategoryOpen}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsCategoryOpen(false)}
      >
        <Pressable 
          className='flex-1 bg-black/50 justify-center items-center'
          onPress={() => setIsCategoryOpen(false)}
        >
          <View className='w-[90%] max-h-[70%] bg-white rounded-xl overflow-hidden'>
            <View className='p-4 border-b border-gray-200 flex-row justify-between items-center'>
              <Text className='text-xl font-fredoka-bold'>Select Category</Text>
              <Pressable 
                onPress={() => setIsCategoryOpen(false)}
                className='p-2 rounded-full hover:bg-gray-200 active:bg-gray-300'
              >
                <X size={24} color="#666666" />
              </Pressable>
            </View>
            <ScrollView className='max-h-[500px]'>
              {CATEGORIES.map((category) => (
                <Pressable
                  key={category.id}
                  onPress={() => {
                    setPressedCategory(category.id);
                    setTimeout(() => {
                      updateFormData('category', category.id);
                      setIsCategoryOpen(false);
                      setPressedCategory(null);
                    }, 150);
                  }}
                  className={`flex-row items-center px-6 py-4 border-b border-gray-200 ${
                    pressedCategory === category.id ? 'bg-gray-100' : 
                    formData.category === category.id ? 'bg-gray-50' : ''
                  }`}
                >
                  <Text className='text-base font-fredoka-medium text-gray-700 flex-1'>
                    {category.label}
                  </Text>
                  {formData.category === category.id && (
                    <Check size={20} color="#4CAF50" />
                  )}
                </Pressable>
              ))}
            </ScrollView>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
} 