import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useContext} from 'react';
import {AuthContext} from '../../context/auth';
// import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HeaderMenu = () => {
  const [state, setState] = useContext(AuthContext);
  //   handleLogout
  const handleLogout = async () => {
    setState({token: '', user: null});
    await AsyncStorage.removeItem('@auth');
    alert('Logout Successfully');
  };
  return (
    <View>
      <TouchableOpacity onPress={handleLogout}>
        <MaterialCommunityIcons
          name="exit-to-app"
          style={styles.icons}
          color={'crimson'}
        />
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
});
export default HeaderMenu;
