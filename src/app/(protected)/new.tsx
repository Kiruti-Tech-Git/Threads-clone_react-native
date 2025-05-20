import { supabase } from "@/lib/supabase";
import { useAuth } from "@/providers/AuthProvider";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";
import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const createPost = async (content: string, user_id: string) => {
  const { data } = await supabase
    .from("posts")
    .insert({
      content,
      user_id,
    })
    .select("*")
    .throwOnError();
  return data;
};

export default function NewPostScreen() {
  const queryClient = useQueryClient();

  const [text, setText] = useState("");
  const { user } = useAuth();

  const { mutate, isPending, error } = useMutation({
    mutationFn: () => createPost(text, user!.id),
    onSuccess: (data) => {
      setText("");
      router.back();
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: (error) => {
      Alert.alert("Error creating post: ", error.message);
    },
  });

  return (
    <SafeAreaView edges={["bottom"]} className="p-4 flex-1">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "padding"} // Use "padding" for both
        keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 80} // Adjust for Android
        style={{ flex: 1 }}
      >
        <Text className="text-white text-lg font-bold">
          {user ? user.email : ""}
        </Text>

        <TextInput
          value={text}
          onChangeText={setText}
          placeholder="What's on your mind?..."
          placeholderTextColor="gray" // 👈 This line sets the placeholder color
          className="text-white text-lg p-2"
          multiline
          numberOfLines={4}
        />
        {error && (
          <Text className="text-red-500 text-sm mt-2">{error.message}</Text>
        )}

        <View className="mt-auto">
          <Pressable
            onPress={() => mutate()}
            className={`${
              isPending ? "bg-white/50" : "bg-white"
            } p-3 px-6 self-end rounded-full mt-4`}
            disabled={isPending}
          >
            <Text className="text-black font-bold">Post</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
