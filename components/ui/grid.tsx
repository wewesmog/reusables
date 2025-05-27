import * as React from 'react';
import { View, ViewProps, Pressable, PressableProps } from 'react-native';
import { cn } from '~/lib/utils';

interface GridProps extends ViewProps {
  columns?: number;
  children: React.ReactNode;
  className?: string;
}

export function Grid({ 
  columns = 2, 
  children, 
  className,
  ...props 
}: GridProps) {
  return (
    <View 
      className={cn(
        "flex-row flex-wrap -mx-3",
        className
      )}
      {...props}
    >
      {React.Children.map(children, (child) => (
        <View className="w-1/2 px-3 mb-1">
          {child}
        </View>
      ))}
    </View>
  );
}

interface GridItemProps extends Omit<PressableProps, 'className'> {
  children: React.ReactNode;
  className?: string;
}

export function GridItem({ 
  children, 
  className,
  onPress,
  ...props 
}: GridItemProps) {
  return (
    <View className={cn("bg-card rounded-xl", className)}>
      <Pressable 
        onPress={onPress}
        android_ripple={{ color: 'rgba(0, 0, 0, 0.1)' }}
        className="p-4 items-center justify-center"
        style={({ pressed }) => pressed ? { opacity: 0.7 } : null}
        {...props}
      >
        {children}
      </Pressable>
    </View>
  );
} 