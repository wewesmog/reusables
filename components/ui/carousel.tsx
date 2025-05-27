import * as React from 'react';
import {
  View,
  ScrollView,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Pressable,
} from 'react-native';
import { cn } from '~/lib/utils';
import Animated, {
  useAnimatedStyle,
  withSpring,
  useSharedValue,
} from 'react-native-reanimated';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface CarouselProps {
  data: React.ReactNode[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showDots?: boolean;
  className?: string;
  slideWidth?: number;
  dotClassName?: string;
  activeDotClassName?: string;
}

export function Carousel({
  data,
  autoPlay = true,
  autoPlayInterval = 3000,
  showDots = true,
  className,
  slideWidth = SCREEN_WIDTH,
  dotClassName,
  activeDotClassName,
}: CarouselProps) {
  const scrollViewRef = React.useRef<ScrollView>(null);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const scrollX = useSharedValue(0);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    scrollX.value = offsetX;
    const index = Math.round(offsetX / slideWidth);
    setCurrentIndex(index);
  };

  React.useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    
    if (autoPlay) {
      interval = setInterval(() => {
        const nextIndex = (currentIndex + 1) % data.length;
        scrollViewRef.current?.scrollTo({
          x: nextIndex * slideWidth,
          animated: true,
        });
      }, autoPlayInterval);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [currentIndex, data.length, autoPlay, autoPlayInterval, slideWidth]);

  const scrollTo = (index: number) => {
    scrollViewRef.current?.scrollTo({
      x: index * slideWidth,
      animated: true,
    });
  };

  return (
    <View className={cn("relative", className)}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {data.map((item, index) => (
          <View
            key={index}
            style={{ width: slideWidth }}
            className="items-center justify-center"
          >
            {item}
          </View>
        ))}
      </ScrollView>

      {showDots && (
        <View className="flex-row justify-center items-center mt-4 space-x-2">
          {data.map((_, index) => (
            <Pressable
              key={index}
              onPress={() => scrollTo(index)}
            >
              <View
                className={cn(
                  "w-2 h-2 rounded-full bg-gray-300",
                  currentIndex === index && "bg-cyan-500 w-3 h-3",
                  dotClassName,
                  currentIndex === index && activeDotClassName
                )}
              />
            </Pressable>
          ))}
        </View>
      )}
    </View>
  );
} 