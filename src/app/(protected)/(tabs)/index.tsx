// import { dummyPosts } from "@/dummyData";
import { StatusBar } from "expo-status-bar";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import PostListItem from "@/components/PostListItem";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { Post } from "@/types";
import { supabase } from "@/lib/supabase";
import { useQuery } from "@tanstack/react-query";

const fetchPosts = async () => {
  // Fetch posts from your API or database
  const { data, error } = await supabase
    .from("posts")
    .select("*, user:profiles(*)")
    .throwOnError()
    .order("created_at", { ascending: false });
  return data;
};

export default function HomeScreen() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  // console.log(JSON.stringify(data, null, 2));

  if (isLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }
  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  return (
    <FlatList
      data={data}
      renderItem={({ item }) => <PostListItem post={item} />}
      ListHeaderComponent={() => (
        <>
          <Link href="/new" className="text-blue-500 p-4 text-center text-3xl">
            New Post
          </Link>
        </>
      )}
    />
  );
}
