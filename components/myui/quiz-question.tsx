import { View, Text } from "react-native";
import { useState } from "react";
import { QuizQuestion as QuizQuestionType } from "~/app/create";
import { PressableButton } from "./pressable-button";

interface QuizQuestionProps {
  question: QuizQuestionType;
  questionNumber: number;
  totalQuestions: number;
  showAnswers?: boolean;
  selectedAnswers: string[];
  onAnswerChange: (selectedAnswers: string[]) => void;
}

// const to handle the attempt. to show the selected options
type SelectedOptions = {
  [key: string]: string[]; // selected option label(s) - array for multiple selections
};

export function QuizQuestion({ 
  question, 
  questionNumber, 
  totalQuestions, 
  showAnswers = false,
  selectedAnswers,
  onAnswerChange
}: QuizQuestionProps) {
  // number of correct answers
  const correctAnswers: number = question.options?.filter(option => option.is_correct).length || 0;

  const handleOptionPress = (optionLabel: string) => {
    console.log('Option pressed:', optionLabel, 'showAnswers:', showAnswers);
    console.log('Selected options:', selectedAnswers);
    if (showAnswers) return; // Don't allow selection when answers are shown
    
    if (correctAnswers === 1) {
      // Single selection for single correct answer
      onAnswerChange([optionLabel]);
    } else {
      // Multiple selection for multiple correct answers
      const newSelectedAnswers = selectedAnswers.includes(optionLabel)
        ? selectedAnswers.filter(label => label !== optionLabel) // Remove if already selected
        : selectedAnswers.length < correctAnswers 
          ? [...selectedAnswers, optionLabel] // Add if not at limit
          : selectedAnswers; // Don't add if at limit
      
      onAnswerChange(newSelectedAnswers);
    }
  };

  const isSelected = (optionLabel: string) => selectedAnswers.includes(optionLabel);

  const getOptionVariant = (option: any) => {
    if (showAnswers) {
      if (isSelected(option.label) && option.is_correct) return "outline"; // Cyan for correct user selection
      if (isSelected(option.label) && !option.is_correct) return "destructive"; // Red for wrong user selection
      if (!isSelected(option.label) && option.is_correct) return "default"; // Green for unselected correct answer
      return "ghost"; // Normal for unselected incorrect answers
    }
    
    if (isSelected(option.label)) return "outline"; // Blue outline for selected
    return "ghost"; // Transparent for unselected
  };

// 

  return (
    <View className="p-4 border border-gray-300 rounded-lg bg-white dark:bg-gray-800">
      {/* Question Header */}
      <View className="mb-4">
        {/* <Text className="text-sm text-gray-500 dark:text-gray-400 mb-2">
          Question {questionNumber} of {totalQuestions}
        </Text> */}
        <Text className="text-lg font-fredoka-semibold text-cyan-700 dark:text-cyan-300">
          {question.question}
        </Text>
      </View>
      
      {/* Question Type Badge */}
      {/* <View className="mb-4">
        <Text className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded self-start">
          {question.question_type.replace('_', ' ').toUpperCase()}
        </Text>
      </View> */}

       <Text className="font-fredoka-light text-cyan-700 dark:text-cyan-300 mb-4">
          Select {correctAnswers} correct {correctAnswers === 1 ? 'answer' : 'answers'}
        </Text> 
      
      {/* Render options for multiple choice questions */}
      {question.options && (
        <View className="mb-4 gap-2">
          {question.options.map((option, optionIndex) => (
            <PressableButton
              key={optionIndex}
              disabled={showAnswers}
              onPress={() => handleOptionPress(option.label)}
              variant={getOptionVariant(option)}
              size="md"
            >
              <View className="flex-row items-center justify-between w-full">
                <Text className={`font-fredoka-light ${
                  showAnswers 
                    ? isSelected(option.label) && option.is_correct
                      ? "text-cyan-700 dark:text-cyan-300" // Correct user selection - cyan
                      : isSelected(option.label) && !option.is_correct
                      ? "text-red-700 dark:text-red-300" // Wrong user selection - red  
                      : !isSelected(option.label) && option.is_correct
                      ? "text-green-700 dark:text-green-300" // Unselected correct answer - green
                      : "text-gray-700 dark:text-gray-300" // Unselected wrong answer - gray
                    : isSelected(option.label)
                    ? "text-cyan-700 dark:text-cyan-300" // Selected during quiz - cyan
                    : "text-gray-700 dark:text-gray-300" // Unselected during quiz - gray
                }`}>
                  {option.label}. {option.text}
                </Text>
                
                {/* Enhanced status indicators */}
                <View className="flex-row items-center gap-2">
                  {/* Show user selection when answers are shown and user has made attempts */}
                  {showAnswers && selectedAnswers.length > 0 && isSelected(option.label) && (
                    <View className="bg-blue-500 px-2 py-1 rounded">
                      <Text className="text-xs text-white font-medium">
                        YOU
                      </Text>
                    </View>
                  )}
                  
                  {/* Show correct/selected indicator */}
                  <Text className="text-lg">
                    {option.is_correct && showAnswers ? '✅' : 
                     isSelected(option.label) && !showAnswers ? '◉' : 
                     !isSelected(option.label) && !showAnswers ? '○' : ''}
                  </Text>
                </View>
              </View>
            </PressableButton>
          ))}
        </View>
      )}
      
      {/* Correct Answer - Only show when showAnswers is true */}
      {showAnswers && (
        <View className="mb-4 p-3 bg-blue-50 dark:bg-blue-900 rounded">
          <Text className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-1">
            Correct Answer:
          </Text>
          <Text className="text-md font-bold text-blue-900 dark:text-blue-100">
            {question.correct_answer}
          </Text>
        </View>
      )}
      
      {/* Explanation - Only show when showAnswers is true */}
      {showAnswers && (
        <View className="p-3 bg-yellow-50 dark:bg-yellow-900 rounded">
          <Text className="text-sm font-medium text-yellow-800 dark:text-yellow-200 mb-1">
            Explanation:
          </Text>
          <Text className="text-sm text-yellow-900 dark:text-yellow-100">
            {question.explanation}
          </Text>
        </View>
      )}
    </View>
  );
} 