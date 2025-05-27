import { View, Image, SafeAreaView, Platform, Pressable } from 'react-native';
import { Slot, router, usePathname } from 'expo-router';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import { Text } from '~/components/ui/text';
import { Home, BookOpen, User, Users } from 'lucide-react-native';
import * as React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Tooltip, TooltipContent, TooltipTrigger } from '~/components/ui/tooltip';
import { cn } from '~/lib/utils';
import { LucideIcon } from 'lucide-react-native';

type NavItemProps = {
  icon: LucideIcon;
  label: string;
  route: "/dashboard/" | "/dashboard/learn" | "/dashboard/profile";
  isActive: boolean;
};

function NavItem({ icon: Icon, label, route, isActive }: NavItemProps) {
  return (
    <Pressable 
      className={cn(
        "flex-col items-center px-6 py-2 rounded-lg",
        isActive && "bg-cyan-600 rounded-full"
      )}
      onPress={() => router.push(route)}
      android_ripple={{ color: 'rgba(255, 255, 255, 0.2)' }}
    >
      {({ pressed }) => (
        <>
          <Icon 
            size={24} 
            color="white"
            style={{ opacity: pressed ? 0.8 : 1, transform: [{ scale: pressed ? 0.95 : 1 }] }}
          />
          <Text className={cn(
            "text-white mt-1 font-fredoka-medium",
            pressed && "opacity-80",
            isActive && "font-fredoka-semibold"
          )}>
            {label}
          </Text>
        </>
      )}
    </Pressable>
  );
}

const randomAvatar = `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`;
const randomName = `User ${Math.floor(Math.random() * 1000)}`;

export default function DashboardLayout() {
  const insets = useSafeAreaInsets();
  const [isPressed, setIsPressed] = React.useState(false);
  const pathname = usePathname();
  
  const contentInsets = {
    top: insets.top,
    bottom: insets.bottom,
    left: 12,
    right: 12,
  };

  const handlePress = () => {
    setIsPressed(true);
    setTimeout(() => setIsPressed(false), 150);
  };

  // Check if we're at the dashboard root
  const isHomeActive = pathname === '/dashboard';

  return (
    <SafeAreaView className="flex-1">
      {/* Fixed Header */}
      <View className="bg-cyan-500">
        <View className="flex-row items-center justify-between p-4">
          <View className="flex-row items-center gap-3">
            <Avatar className="h-10 w-10" alt="User Avatar">
              <AvatarImage source={{ uri: randomAvatar }} />
              <AvatarFallback>
                <Text>{randomName.charAt(0)}</Text>
              </AvatarFallback>
            </Avatar>
            <View>
              <Text className="font-semibold">{randomName}</Text>
              <Text className="text-sm text-white">Welcome back!</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Middle Content */}
      <View className="flex-1">
        <Slot />
      </View>

      {/* Fixed Footer - Navigation */}
      <View className="bg-cyan-500 pb-safe">
        <View className="flex-row justify-around items-center p-4">
          <NavItem 
            icon={Home}
            label="Home"
            route="/dashboard/"
            isActive={isHomeActive}
          />
          
          <NavItem 
            icon={BookOpen}
            label="Learn"
            route="/dashboard/learn"
            isActive={pathname === '/dashboard/learn'}
          />
          
          <NavItem 
            icon={User}
            label="Profile"
            route="/dashboard/profile"
            isActive={pathname === '/dashboard/profile'}
          />
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Pressable 
                onPress={handlePress}
                className="flex-col items-center px-6 py-2 rounded-lg"
                android_ripple={{ color: 'rgba(255, 255, 255, 0.2)' }}
              >
                <Users 
                  size={24} 
                  color={isPressed ? "#FFD700" : "white"} 
                  style={{ transform: [{ scale: isPressed ? 0.95 : 1 }] }}
                />
                <Text className={isPressed ? "text-yellow-400 mt-1" : "text-white mt-1"}>
                  Community
                </Text>
              </Pressable>
            </TooltipTrigger>
            <TooltipContent sideOffset={5}>
              <Text className="text-white">Coming soon! 🚀</Text>
            </TooltipContent>
          </Tooltip>
        </View>
      </View>
    </SafeAreaView>
  );
}
