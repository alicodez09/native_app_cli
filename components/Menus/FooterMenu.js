import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useNavigation, useRoute} from '@react-navigation/native';
const FooterMenu = () => {
  const navigation = useNavigation();
  const route = useRoute();
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <FontAwesome5
          name="home"
          style={styles.icons}
          color={route.name === 'Home' ? 'orange' : '#000'}
        />
        <Text style={styles.text}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('MyTodo')}>
        <FontAwesome5
          name="list"
          style={styles.icons}
          color={route.name === 'MyTodo' ? 'orange' : '#000'}
        />
        <Text style={styles.text}>My Todo</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Todo')}>
        <FontAwesome5
          name="plus-square"
          style={styles.icons}
          color={route.name === 'Todo' ? 'orange' : '#000'}
        />
        <Text style={styles.text}>Todo</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Account')}>
        <FontAwesome5
          name="user-circle"
          style={styles.icons}
          color={route.name === 'Account' ? 'orange' : '#000'}
        />
        <Text style={styles.text}>Account</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
  },
  icons: {
    marginBottom: 3,
    alignSelf: 'center',
    fontSize: 25,
  },
  text: {
    fontSize: 15,
    color: '#000',
  },
});
export default FooterMenu;
