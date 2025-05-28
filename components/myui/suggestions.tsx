import { LucideIcon } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";

interface SuggestionsProps {
  title: string;
  icon: LucideIcon;
}

export function Suggestions({ title, icon: IconComponent }: SuggestionsProps) {
    return (
        <Pressable 
        className=""
        style={{ alignSelf: 'center' }}
        >
        <View className="flex-row gap-2 px-4 py-1 border-2 border-cyan-200 rounded-lg">
        <IconComponent className="mr-2" size={24} color="#0891b2" />
        <Text className="text-md font-fredoka-light text-cyan-600 flex-shrink">
          {title}
        </Text>
        </View>
        </Pressable>
    )
}