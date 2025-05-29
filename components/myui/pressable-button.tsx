import { Pressable, Text, View, Animated } from "react-native";
import { useRef, ReactNode } from "react";

interface PressableButtonProps {
  children: ReactNode;
  onPress?: () => void;
  disabled?: boolean;
  variant?: "default" | "outline" | "ghost" | "destructive";
  size?: "sm" | "md" | "lg";
  className?: string;
  style?: any;
  flashColor?: string;
  animationDuration?: number;
}

export function PressableButton({
  children,
  onPress,
  disabled = false,
  variant = "default",
  size = "md",
  className = "",
  style,
  flashColor,
  animationDuration = 150,
}: PressableButtonProps) {
  const animatedValue = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    if (disabled) return;
    
    Animated.sequence([
      Animated.timing(animatedValue, {
        toValue: 0.95,
        duration: animationDuration / 2,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handlePressOut = () => {
    if (disabled) return;
    
    Animated.sequence([
      Animated.timing(animatedValue, {
        toValue: 1.05,
        duration: animationDuration / 4,
        useNativeDriver: true,
      }),
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: animationDuration / 4,
        useNativeDriver: true,
      }),
    ]).start();
  };

  // Variant styles
  const getVariantStyles = () => {
    switch (variant) {
      case "outline":
        return "border-2 border-cyan-500 bg-cyan-50 dark:bg-cyan-950";
      case "ghost":
        return "bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600";
      case "destructive":
        return "bg-red-500 border-red-600";
      default:
        return "bg-cyan-500 border-cyan-600";
    }
  };

  // Size styles
  const getSizeStyles = () => {
    switch (size) {
      case "sm":
        return "px-3 py-2";
      case "lg":
        return "px-6 py-4";
      default:
        return "px-4 py-3";
    }
  };

  // Text color based on variant
  const getTextColor = () => {
    switch (variant) {
      case "outline":
        return "text-cyan-700 dark:text-cyan-300";
      case "ghost":
        return "text-gray-700 dark:text-gray-300";
      case "destructive":
        return "text-white";
      default:
        return "text-white";
    }
  };

  // Flash overlay color
  const getFlashColor = () => {
    if (flashColor) return flashColor;
    switch (variant) {
      case "outline":
        return "rgba(6, 182, 212, 0.2)"; // cyan-500 with more opacity
      case "ghost":
        return "rgba(156, 163, 175, 0.3)"; // gray-400 with opacity
      case "destructive":
        return "rgba(255, 255, 255, 0.2)";
      default:
        return "rgba(255, 255, 255, 0.3)";
    }
  };

  return (
    <Animated.View
      style={[
        {
          transform: [{ scale: animatedValue }],
        },
        style,
      ]}
    >
      <Pressable
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled}
        className={`
          rounded-lg
          ${getVariantStyles()}
          ${getSizeStyles()}
          ${disabled ? "opacity-50" : "opacity-100"}
          ${className}
        `}
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? getFlashColor() : undefined,
          },
        ]}
      >
        <View className="flex-row items-center justify-center gap-2">
          {typeof children === "string" ? (
            <Text className={`font-fredoka-medium ${getTextColor()}`}>
              {children}
            </Text>
          ) : (
            children
          )}
        </View>
      </Pressable>
    </Animated.View>
  );
} 