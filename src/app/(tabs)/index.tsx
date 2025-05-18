import { dummyPosts } from '@/dummyData';
import { StatusBar } from 'expo-status-bar';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import PostListItem from '@/components/PostListItem';

export default function HomeScreen() {
  return (
    <FlatList
      data={dummyPosts}
      renderItem={({item}) => (
        <PostListItem post={item} />
      )}
      />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
