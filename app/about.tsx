import { Text } from '~/components/ui/text';
import { Button } from '~/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/components/ui/card';
import { View } from 'react-native';
import React, { useState } from 'react';

export default function About() {
  const [showMore, setShowMore] = useState<boolean>(false);

  const handlePress = () => {
    setShowMore(prev => !prev);
  };

  return (
    <View className='flex-1 justify-center items-center gap-5 p-6 bg-secondary/30'>
      <Card className='w-full max-w-sm p-6 rounded-2xl'>
        <CardHeader className='items-center'>
          <CardTitle>About Tusome</CardTitle>
          <CardDescription>Your learning companion</CardDescription>
        </CardHeader>
        <CardContent>
          <Text className='text-sm text-muted-foreground font-fredoka-regular'>
            Embark on a journey of knowledge and discovery. Earn rewards, level up, and unlock new challenges as you master new skills.
          </Text>
          <View className='py-2'>
            <Button 
              variant='default'
              className='w-full'
              onPress={handlePress}
            >
              <Text className='text-white font-fredoka-medium'>{showMore ? 'See Less' : 'See More'}</Text>
            </Button>
          </View>
          {showMore && (
            <Text className='text-sm text-muted-foreground pt-2 font-fredoka-regular'>
              This is more about the app. We use modern technologies like React Native, 
              Expo Router for navigation, and a beautiful UI system with Tailwind CSS. 
              The app is designed to provide a seamless reading experience with features 
              like progress tracking and customizable reading lists.
            </Text>
          )}
        </CardContent>
      </Card>
    </View>
  );
}
