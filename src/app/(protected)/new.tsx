import { supabase } from "@/lib/supabase";
import { useAuth } from "@/providers/AuthProvider";
import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function NewPostScreen() {
  const [text, setText] = useState("");
  const { user } = useAuth();

  const onSubmit = async () => {
    if (!text || !user) return;
    const { data, error } = await supabase.from("posts").insert({
      content: text,
      user_id: user.id,
    });
    if (error) {
      console.error("Error inserting post: ", error);
    }
    setText("");
  };

  return (
    <SafeAreaView edges={["bottom"]} className="p-4 flex-1">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 140 : 0}
      >
        <Text className="text-white text-lg font-bold">User name</Text>

        <TextInput
          value={text}
          onChangeText={setText}
          placeholder="What's on your mind?..."
          placeholderTextColor="gray" // 👈 This line sets the placeholder color
          className="text-white text-lg p-2"
          multiline
          numberOfLines={4}
        />

        <View className="mt-auto">
          <Pressable
            onPress={onSubmit}
            className="bg-white p-3 px-6 self-end rounded-full mt-4"
          >
            <Text className="text-black font-bold">Post</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
