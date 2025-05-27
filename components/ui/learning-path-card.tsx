import * as React from 'react';
import { View, Image, ImageSourcePropType } from 'react-native';
import { Text } from '~/components/ui/text';
import { cn } from '~/lib/utils';

interface LearningPathCardProps {
  image: ImageSourcePropType;
  title: string;
  subtitle: string;
  className?: string;
}

export function LearningPathCard({ image, title, subtitle, className }: LearningPathCardProps) {
  return (
    <View className={cn("w-full rounded-3xl overflow-hidden m-2", className)}>
      <View className="aspect-square bg-muted/20 rounded-3xl overflow-hidden">
        <Image
          source={image}
          className="w-full h-full"
          resizeMode="cover"
        />
      </View>
      <View className="mt-4">
        <Text className="text-xl font-semibold text-foreground font-fredoka-medium">{title}</Text>
        <Text className="text-base text-muted-foreground m-1 font-fredoka-light">{subtitle}</Text>
      </View>
    </View>
  );
} 