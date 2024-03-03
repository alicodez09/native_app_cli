import {View, Text, StyleSheet, Alert} from 'react-native';
import React, {useState, useContext} from 'react';
import InputBox from '../../components/Forms/InputBox';
import SubmitButton from '../../components/Forms/SubmitButton';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from '../../context/auth';
const Login = ({navigation}) => {
  // Global State
  const [state, setState] = useContext(AuthContext);
  //States
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  // Functions
  const handleSubmit = async () => {
    try {
      setLoading(true);
      if (!email || !password) {
        Alert.alert('Please fill all fields');
        setLoading(false);
        return;
      }
      const {data} = await axios.post('/auth/login', {email, password});
      console.log(JSON.stringify(data, null, 2), 'data');
      setState(data);
      await AsyncStorage.setItem('@auth', JSON.stringify(data));
      setLoading(false);
      navigation.navigate('Home');

      alert(data && data.message);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.pageTitle}>Login</Text>
        <View>
          <InputBox
            inputTitle={'Email'}
            keyboardType={'email-address'}
            // autoComplete="email"
            value={email}
            setValue={setEmail}
          />
          <InputBox
            inputTitle={'Password'}
            secureTextEntry={true}
            // autoComplete="password"
            value={password}
            setValue={setPassword}
          />
        </View>
        <SubmitButton
          title="Login"
          loading={loading}
          handleSubmit={handleSubmit}
        />
        <Text style={styles.linkText}>
          Don't have an account? &nbsp;
          <Text
            style={styles.link}
            onPress={() => navigation.navigate('Register')}>
            Register
          </Text>
        </Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'whitesmoke',
  },
  pageTitle: {
    fontSize: 30,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  card: {
    backgroundColor: 'purple',
    padding: 25,
    margin: 15,
    borderRadius: 20,
  },
  inputBox: {
    height: 40,
    backgroundColor: '#fff',
    margin: 15,
    borderRadius: 7,
    padding: 10,
  },
  linkText: {
    textAlign: 'center',
    color: 'white',
  },
  link: {
    color: 'crimson',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Login;
