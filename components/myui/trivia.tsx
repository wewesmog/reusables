import { View, Text, Pressable } from "react-native";
import { useEffect, useState } from "react";
import { Artifact } from "~/app/create";
import { QuizQuestion } from "./quiz-question";
import { Pagination } from "./pagination";
import { PressableButton } from "./pressable-button";

export interface TriviaProps {
  artifacts: Artifact[];
  showQuiz: boolean;
}

// Type for tracking all answers
type AllAnswers = {
  [questionId: string]: string[]; // questionId -> selected option labels
};

// Type for quiz results
interface QuizResults {
  totalQuestions: number;
  correctAnswers: number;
  score: number; // percentage
  questionResults: {
    questionId: string;
    isCorrect: boolean;
    selectedAnswers: string[];
    correctAnswers: string[];
  }[];
}

export function Trivia({ artifacts, showQuiz }: TriviaProps) {
  // For now, we'll work with the first artifact
  const currentArtifact = artifacts[0];
  const questions = currentArtifact?.content || [];
  
  // Pagination state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const currentQuestion = questions[currentQuestionIndex];

  const [showAnswers, setShowAnswers] = useState(false);
  
  // Track all answers for all questions
  const [allAnswers, setAllAnswers] = useState<AllAnswers>({});
  
  // Quiz completion state
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [quizResults, setQuizResults] = useState<QuizResults | null>(null);
  const [showDetailedResults, setShowDetailedResults] = useState(false);

  useEffect(() => {
    console.log("Show answers:", showAnswers);
    console.log("All answers:", allAnswers);
  }, [showAnswers, allAnswers]);

  // Function to update answers for a specific question
  const updateQuestionAnswers = (questionId: string, selectedAnswers: string[]) => {
    setAllAnswers(prev => ({
      ...prev,
      [questionId]: selectedAnswers
    }));
  };

  // Get current question's selected answers
  const getCurrentQuestionAnswers = () => {
    return allAnswers[currentQuestion?.question || ''] || [];
  };

  // Calculate quiz score
  const calculateScore = (): QuizResults => {
    const questionResults = questions.map(question => {
      const questionId = question.question;
      const selectedAnswers = allAnswers[questionId] || [];
      const correctAnswers = question.options?.filter(opt => opt.is_correct).map(opt => opt.label) || [];
      
      // Check if answer is correct (must match exactly)
      const isCorrect = selectedAnswers.length === correctAnswers.length && 
                       selectedAnswers.every(answer => correctAnswers.includes(answer));
      
      return {
        questionId,
        isCorrect,
        selectedAnswers,
        correctAnswers
      };
    });

    const correctCount = questionResults.filter(result => result.isCorrect).length;
    const score = (correctCount / questions.length) * 100;

    return {
      totalQuestions: questions.length,
      correctAnswers: correctCount,
      score: Math.round(score),
      questionResults
    };
  };

  // Handle quiz submission
  const handleSubmitQuiz = () => {
    const results = calculateScore();
    setQuizResults(results);
    setIsQuizCompleted(true);
    setShowDetailedResults(true); // Auto-show detailed results after submission
  };

  // Check if all questions are answered
  const isAllQuestionsAnswered = () => {
    return questions.every(question => {
      const questionId = question.question;
      const answers = allAnswers[questionId];
      return answers && answers.length > 0;
    });
  };

  // Reset quiz
  const handleResetQuiz = () => {
    setAllAnswers({});
    setIsQuizCompleted(false);
    setQuizResults(null);
    setShowAnswers(false);
    setShowDetailedResults(false);
    setCurrentQuestionIndex(0);
  };

  const goToNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };
  
  const goToPrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };
  
  const goToQuestion = (index: number) => {
    if (index >= 0 && index < questions.length) {
      setCurrentQuestionIndex(index);
    }
  };

  if (!currentQuestion) {
    return (
      <View className="flex-1 justify-center items-center p-4">
        <Text className="text-lg text-gray-500">No questions available</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 p-4">
      {/* Quiz Header */}
      <View className="mb-6">
        <Text className="text-2xl font-bold text-center mb-2">Quiz Review</Text>
        <Text className="text-center text-gray-600 dark:text-gray-400">
          Quiz ID: {currentArtifact.quizId}
        </Text>
        
        {/* Quiz Results */}
        {quizResults && (
          <View className="mt-4 p-4 bg-blue-50 dark:bg-blue-900 rounded-lg">
            <Text className="text-xl font-bold text-center text-blue-800 dark:text-blue-200 mb-2">
              Quiz Complete! 🎉
            </Text>
            <Text className="text-lg text-center text-blue-700 dark:text-blue-300 mb-3">
              Score: {quizResults.correctAnswers}/{quizResults.totalQuestions} ({quizResults.score}%)
            </Text>
            
            {/* Detailed Results - Only show when showDetailedResults is true AND quiz is completed */}
            {showDetailedResults && isQuizCompleted && (
              <View className="mt-3 pt-3 border-t border-blue-200 dark:border-blue-700">
                <View className="flex-row justify-between items-center mb-2">
                  <Text className="text-md font-semibold text-blue-800 dark:text-blue-200">
                    📊 Detailed Results:
                  </Text>
                  <Pressable onPress={() => setShowDetailedResults(!showDetailedResults)}>
                    <Text className="text-sm text-blue-600 dark:text-blue-400">
                      {showDetailedResults ? 'Hide' : 'Show'}
                    </Text>
                  </Pressable>
                </View>
                {quizResults.questionResults.map((result, index) => (
                  <View key={index} className="flex-row justify-between items-center mb-1">
                    <Text className="text-sm text-blue-700 dark:text-blue-300 flex-1 mr-2">
                      Q{index + 1}: {result.questionId.slice(0, 30)}...
                    </Text>
                    <Text className={`text-sm font-bold ${
                      result.isCorrect ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {result.isCorrect ? '✓' : '✗'}
                    </Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        )}
        
        {/* Controls - Separated by functionality */}
        <View className="flex-row justify-center gap-4 mt-4 flex-wrap">
          {/* Show Answers - Available anytime */}
          <Pressable onPress={() => setShowAnswers(!showAnswers)}>
            <Text className="text-cyan-700 dark:text-cyan-300 font-medium">
              {showAnswers ? '🙈 Hide Answers' : '👀 Show Answers'}
            </Text>
          </Pressable>
          
          {/* Detailed Results Toggle - Only after completion */}
          {isQuizCompleted && (
            <Pressable onPress={() => setShowDetailedResults(!showDetailedResults)}>
              <Text className="text-blue-700 dark:text-blue-300 font-medium">
                {showDetailedResults ? '📊 Hide Details' : '📊 Show Details'}
              </Text>
            </Pressable>
          )}
          
          {/* Submit/Retake Buttons */}
          {!isQuizCompleted && (
            <PressableButton
              onPress={handleSubmitQuiz}
              disabled={!isAllQuestionsAnswered()}
              variant="default"
              size="sm"
            >
              🚀 Submit Quiz
            </PressableButton>
          )}
          
          {isQuizCompleted && (
            <PressableButton
              onPress={handleResetQuiz}
              variant="outline"
              size="sm"
            >
              🔄 Retake Quiz
            </PressableButton>
          )}
        </View>
      </View>
      
      {/* Current Question */}
      <View className="flex-1 mb-6">
        <QuizQuestion 
          key={currentQuestion.question}
          question={currentQuestion}
          questionNumber={currentQuestionIndex + 1}
          totalQuestions={questions.length}
          showAnswers={showAnswers}
          selectedAnswers={getCurrentQuestionAnswers()}
          onAnswerChange={(selectedAnswers) => updateQuestionAnswers(currentQuestion.question, selectedAnswers)}
        />
      </View>
      
      {/* Reusable Pagination Component */}
      <Pagination
        currentIndex={currentQuestionIndex}
        totalItems={questions.length}
        onNext={goToNext}
        onPrevious={goToPrevious}
        showNavigationText={true}
        showCounter={true}
        counterLabel="Question"
      />
    </View>
  );
}


