import {View, Text, StyleSheet, ScrollView, RefreshControl} from 'react-native';
import React, {useCallback, useContext, useEffect, useState} from 'react';
import FooterMenu from '../../components/Menus/FooterMenu';
import {TodoContext} from '../../context/todo';
import TodoCard from './TodoCard';

const Home = () => {
  const [todos, getAllPosts] = useContext(TodoContext);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getAllPosts();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);
  return (
    <View style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <TodoCard todos={todos} />
        {/* <Text>{JSON.stringify(todos, null, 4)}</Text> */}
      </ScrollView>
      <View style={{backgroundColor: '#ffffff'}}>
        <FooterMenu />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    margin: 10,
    color: '#000',
  },
});
export default Home;
