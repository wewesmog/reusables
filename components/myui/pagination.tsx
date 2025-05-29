import { View, Text } from "react-native";
import { Button } from "~/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react-native";

interface PaginationProps {
  currentIndex: number;
  totalItems: number;
  onNext: () => void;
  onPrevious: () => void;
  onGoTo?: (index: number) => void;
  showNavigationText?: boolean;
  showCounter?: boolean;
  disabled?: boolean;
  counterLabel?: string;
}

export function Pagination({ 
  currentIndex, 
  totalItems, 
  onNext, 
  onPrevious, 
  showNavigationText = true,
  showCounter = true,
  disabled = false,
  counterLabel = "Question"
}: PaginationProps) {
  
  const isFirstPage = currentIndex === 0;
  const isLastPage = currentIndex === totalItems - 1;

  if (totalItems <= 1) {
    return null; // Don't show pagination for single item
  }

  return (
    <View className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 shadow-sm">
      <View className="flex-row justify-between items-center">
        {/* Previous Button */}
        <Button
          variant="outline"
          onPress={onPrevious}
          disabled={isFirstPage || disabled}
          className={`flex-row items-center gap-2 px-4 py-2 ${
            isFirstPage || disabled ? "opacity-40" : "opacity-100"
          }`}
        >
          <ChevronLeft 
            size={18} 
            color={isFirstPage || disabled ? "#9CA3AF" : "#4B5563"} 
          />
          {showNavigationText && (
            <Text className={`font-fredoka-light ${
              isFirstPage || disabled ? "text-cyan-400" : "text-cyan-700 dark:text-cyan-300"
            }`}>
              Previous
            </Text>
          )}
        </Button>
        
        {/* Counter */}
        {showCounter && (
          <View className="flex-1 items-center px-4">
            <Text className="text-lg font-fredoka-light semibold text-cyan-800 dark:text-cyan-200">
              {counterLabel} {currentIndex + 1}
            </Text>
            <View className="flex-row items-center mt-1">
              <View className="flex-row gap-1">
                {Array.from({ length: totalItems }, (_, index) => (
                  <View
                    key={index}
                    className={`w-2 h-2 rounded-full ${
                      index === currentIndex 
                        ? "bg-blue-600" 
                        : "bg-gray-300 dark:bg-gray-600"
                    }`}
                  />
                ))}
              </View>
              <Text className="text-sm text-gray-500 dark:text-gray-400 ml-3">
                of {totalItems}
              </Text>
            </View>
          </View>
        )}
        
        {/* Next Button */}
        <Button
          variant="outline"
          onPress={onNext}
          disabled={isLastPage || disabled}
          className={`flex-row items-center gap-2 px-4 py-2 ${
            isLastPage || disabled ? "opacity-40" : "opacity-100"
          }`}
        >
          {showNavigationText && (
            <Text className={`font-medium ${
              isLastPage || disabled ? "text-gray-400" : "text-gray-700 dark:text-gray-300"
            }`}>
              Next
            </Text>
          )}
          <ChevronRight 
            size={18} 
            color={isLastPage || disabled ? "#9CA3AF" : "#4B5563"} 
          />
        </Button>
      </View>
    </View>
  );
} 