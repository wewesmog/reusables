import * as React from 'react';
import { View, Dimensions, Image } from 'react-native';
import { Text } from '~/components/ui/text';
import { Carousel } from '~/components/ui/carousel';
import { LearningPathCard } from '~/components/ui/learning-path-card';
import { Grid, GridItem } from '~/components/ui/grid';
import { Book, Mic, Users, Trophy } from 'lucide-react-native';
import { router } from 'expo-router';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '~/components/ui/card';
import { Pressable } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
// Card will take 50% of screen width
const CARD_WIDTH = SCREEN_WIDTH * 0.5;
// Add moderate padding between cards (24px total)
const SLIDE_WIDTH = CARD_WIDTH + 24;

export default function DashboardScreen() {
  const learningPaths = [
    {
      image: { uri: 'https://picsum.photos/seed/spanish/400/400' },
      title: 'Spanish for Beginners',
      subtitle: 'Level 1: Basic Phrases'
    },
    {
      image: { uri: 'https://picsum.photos/seed/french/400/400' },
      title: 'Advanced French',
      subtitle: 'Level 3: Conversation'
    },
    {
      image: { uri: 'https://picsum.photos/seed/german/400/400' },
      title: 'German Basics',
      subtitle: 'Level 1: Introduction'
    }
  ];

  const carouselItems = learningPaths.map((path, index) => (
    <View 
      key={index} 
      style={{ width: SLIDE_WIDTH }} 
      className="items-center px-3"
    >
      <LearningPathCard
        image={path.image}
        title={path.title}
        subtitle={path.subtitle}
        className="w-full font-fredoka-light"
      />
    </View>
  ));

  return (
    <View className="flex-1 px-4 pt-4 justify-arounf">
    {/* My Learning Paths */}
      <View>
      <View className="flex-row items-center justify-between">
        <Text className="text-2xl font-fredoka-bold mb-1">My Learning Paths</Text>
        <Text className="text-md font-fredoka-medium">View All</Text>
      </View>
  
      <Carousel
        data={carouselItems}
        autoPlay={false}
        showDots={true}
        className="w-full"
        slideWidth={SLIDE_WIDTH}
        dotClassName="bg-gray-200"
        activeDotClassName="bg-cyan-500"
      />
      </View>
      <View>
      {/* Quick Access */}
      <Text className="text-2xl font-fredoka-bold mb-4 mt-8">Quick Access</Text>
      <View className="flex-row flex-wrap -mx-3">
        <Pressable 
          className="w-1/2 px-3 mb-6"
          onPress={() => router.push("/dashboard/learn")}
        >
          <View className="flex-row items-center justify-around w-full px-4 py-2 border-2 border-cyan-500 rounded-lg">
            <Book size={24} color="#0891b2" />
            <Text className="text-md font-fredoka-medium">Lessons</Text>
          </View>
        </Pressable>

        <Pressable 
          className="w-1/2 px-3 mb-6"
          onPress={() => router.push("/dashboard/learn")}
        >
          <View className="flex-row items-center justify-around w-full px-4 py-2 border-2 border-cyan-500 rounded-lg">
            <Mic size={24} color="#0891b2" />
            <Text className="text-md font-fredoka-medium">Practice</Text>
          </View>
        </Pressable>

        <Pressable 
          className="w-1/2 px-3 mb-6"
          onPress={() => router.push("/dashboard/learn")}
        >
          <View className="flex-row items-center justify-around w-full px-4 py-2 border-2 border-cyan-500 rounded-lg">
            <Users size={24} color="#0891b2" />
            <Text className="text-md font-fredoka-medium">Community</Text>
          </View>
        </Pressable>

        <Pressable 
          className="w-1/2 px-3 mb-6"
          onPress={() => router.push("/dashboard/learn")}
        >
          <View className="flex-row items-center justify-around w-full px-4 py-2 border-2 border-cyan-500 rounded-lg">
            <Trophy size={24} color="#0891b2" />
            <Text className="text-md font-fredoka-medium">Profile</Text>
          </View>
        </Pressable>
      </View>
      </View>
    </View>
  );
}
