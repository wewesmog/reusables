import * as React from 'react';
import { Image, View, Dimensions } from 'react-native';
import { Link, router } from 'expo-router';
import Animated, { FadeInUp, FadeOutDown, LayoutAnimationConfig } from 'react-native-reanimated';
import { Info } from '~/lib/icons/Info';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import { Button } from '~/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/components/ui/card';
import { Progress } from '~/components/ui/progress';
import { Text } from '~/components/ui/text';
import { Tooltip, TooltipContent, TooltipTrigger } from '~/components/ui/tooltip';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

//get random image from online
const randomImage = `https://picsum.photos/200/300?random=${Math.random()}`;

const readImage = require('../assets/images/read.png');
const bgImage =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBTH6UI_sC_xZvkWKIb2pdPuE7Hk143AT9osuC_5a-uWFfWf0FsVP9YUUHfEc5pSEndfUgKKxmf37YgOsS8eN7f_kPQ9pmN1CJJFfP9B9HRTzli5_UDVIQthrv0esoYhbfl2oc8w_XMGPBprFpu0FieltYO7vfCRyHDHBQ_oesE75w9s_ICgo-mNVz5SRUJkIGl17yJm9K4FzEjaeikITq4KjCRXfxCjy7U82QnhgEPKfOoAMR30rxcgkTyVBNA55z3LqQxoEauhIo"

export default function Screen() {
  const [progress, setProgress] = React.useState(78);

  function updateProgressValue() {
    setProgress(Math.floor(Math.random() * 100));
  }
  return (
    <View className='flex-1 bg-secondary/30'>
      {/* Top Content Container */}
      <View className='flex-1 items-center p-6 gap-5'>
        <Card className='w-full max-w-sm rounded-2xl overflow-hidden'>
          <Image 
            source={{ uri: bgImage }} 
            style={{ 
              width: '100%',
              height: SCREEN_HEIGHT * 0.4,
              resizeMode: 'cover'
            }} 
          />
        </Card>
        <Text className='text-3xl font-bold py-10 text-center'>Your AI Learning Sidekick</Text>
        <Text className='text-xl text-muted-foreground text-center px-2'>
          Ready to supercharge your learning? 🚀 Team up with AI to explore, create, and master new skills in ways you never imagined. It's like having a genius friend who's always excited to help you grow!
        </Text>
      </View>

      {/* Bottom Button Container */}
      <View className='p-6 pb-12'>
        <Button 
          variant='default' 
          className='shadow shadow-foreground/5 w-full max-w-sm mx-auto'
          onPress={() => router.push('/dashboard')}
        >
          <Text>Get Started</Text>
        </Button>
      </View>
    </View>
  );
}
