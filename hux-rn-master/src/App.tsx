import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, ScrollView } from 'react-native';
// import fetchFromAPI from './helpers/fetchFromAPI';
import FixedRatioImage from './components/FixedRatioImage';
import {ActivityIndicator, Button} from 'react-native-paper';
import {Post, PostList} from './types/types';
import fetchFromAPI from './helpers/fetchFromAPI';

const AUTH_TOKEN = "5d2f3942a7b11b000894d96d03802aaa";
export default function App() {
  let [posts, setPosts] = useState<PostList>([]);
  let [isLoading, setloading] = useState(true);
  let [error, setError] = useState('');

  async function fetchPosts() {
    setloading(true);
    let result = await fetchFromAPI('/posts', {
      headers: { 'X-Auth': AUTH_TOKEN },
    });
    setloading(false);
    if (result.isError) {
      setError(result.errorMessage);
    } else {
      setError('');
      let data: any = result.data;
      setPosts(data.posts);
    }
  }
  useEffect(() => {
    fetchPosts();
  }, []);

  if(isLoading) {
    return (
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}><ActivityIndicator/></View>
    );
  }

  if(error) {
    return (
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <Text style={{margin: 10}}>{error}</Text>
        <Button mode="contained" onPress={() => {
        fetchPosts();
      }}>Retry</Button>
      </View>
    );
  }
  return (
    <ScrollView style={{flex: 1}}>
      {
        posts.map((post: Post) => {
          return (
            <View key={post.id} style={styles.postCard}>
              <FixedRatioImage aspectRatio={1} style={styles.image} source={{ uri: post.photo }}/>
              <Text>{post.text}</Text>
            </View>
          );
        })
      }
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  postCard: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#666',

  },
  image: {
  }
});