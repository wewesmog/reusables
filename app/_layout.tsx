import '~/global.css';

import { DarkTheme, DefaultTheme, Theme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { Appearance, Platform, View } from 'react-native';
import { NAV_THEME } from '~/lib/constants';
import { useColorScheme } from '~/lib/useColorScheme';
import { PortalHost } from '@rn-primitives/portal';
import { ThemeToggle } from '~/components/ThemeToggle';
import { setAndroidNavigationBar } from '~/lib/android-navigation-bar';
import { Text } from '~/components/ui/text';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

const LIGHT_THEME: Theme = {
  ...DefaultTheme,
  colors: NAV_THEME.light,
};
const DARK_THEME: Theme = {
  ...DarkTheme,
  colors: NAV_THEME.dark,
};

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

const usePlatformSpecificSetup = Platform.select({
  web: useSetWebBackgroundClassName,
  android: useSetAndroidNavigationBar,
  default: noop,
});

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  usePlatformSpecificSetup();
  const { isDarkColorScheme } = useColorScheme();
  const [fontsLoaded] = useFonts({
    'Fredoka-Light': require('../assets/fonts/Fredoka-Light.ttf'),
    'Fredoka-Regular': require('../assets/fonts/Fredoka-Regular.ttf'),
    'Fredoka-Medium': require('../assets/fonts/Fredoka-Medium.ttf'),
    'Fredoka-SemiBold': require('../assets/fonts/Fredoka-SemiBold.ttf'),
    'Fredoka-Bold': require('../assets/fonts/Fredoka-Bold.ttf'),
    'Fredoka': require('../assets/fonts/Fredoka-Regular.ttf'),
    // Comic Neue
    'ComicNeue-Light': require('../assets/fonts/ComicNeue-Light.ttf'),
    'ComicNeue-Regular': require('../assets/fonts/ComicNeue-Regular.ttf'),
    'ComicNeue-Bold': require('../assets/fonts/ComicNeue-Bold.ttf'),
    'ComicNeue-Italic': require('../assets/fonts/ComicNeue-Italic.ttf'),
    'ComicNeue-BoldItalic': require('../assets/fonts/ComicNeue-BoldItalic.ttf'),
    'ComicNeue-LightItalic': require('../assets/fonts/ComicNeue-LightItalic.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
      <StatusBar style={isDarkColorScheme ? 'light' : 'dark'} />
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: isDarkColorScheme ? '#000' : '#fff',
          },
          headerTitleStyle: {
            fontWeight: '700',
            fontSize: 24,
          },
          headerShadowVisible: false,
        }}
      >
        <Stack.Screen
          name='index'
          options={{
            title: 'TUSOME',
            headerTitleAlign: 'center',
            headerRight: () => <ThemeToggle />,
          }}
        />
        <Stack.Screen
          name='about'
          options={{
            title: 'About Nexus',
            headerTitleAlign: 'center',
            presentation: 'modal',
          }}
        />
      </Stack>
      <PortalHost />
    </ThemeProvider>
  );
}

const useIsomorphicLayoutEffect =
  Platform.OS === 'web' && typeof window === 'undefined' ? React.useEffect : React.useLayoutEffect;

function useSetWebBackgroundClassName() {
  useIsomorphicLayoutEffect(() => {
    // Adds the background color to the html element to prevent white background on overscroll.
    document.documentElement.classList.add('bg-background');
  }, []);
}

function useSetAndroidNavigationBar() {
  React.useLayoutEffect(() => {
    setAndroidNavigationBar(Appearance.getColorScheme() ?? 'light');
  }, []);
}

function noop() {}
