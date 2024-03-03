import {View, Text, StyleSheet, TextInput, Alert} from 'react-native';
import React, {useState} from 'react';
import InputBox from '../../components/Forms/InputBox';
import SubmitButton from '../../components/Forms/SubmitButton';
import axios from 'axios';
const Register = ({navigation}) => {
  //States
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  // Functions
  const handleSubmit = async () => {
    try {
      setLoading(true);
      if (!name || !email || !password) {
        Alert.alert('Please fill all fields');
        setLoading(false);
        return;
      }
      setLoading(false);
      const {data} = await axios.post('/auth/register', {
        name,
        email,
        password,
      });
      console.log(JSON.stringify(data, null, 2), 'data');
      alert(data && data.message);
      navigation.navigate('Login');
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.pageTitle}>Register</Text>
        <View>
          <InputBox inputTitle={'Name'} value={name} setValue={setName} />
          <InputBox
            inputTitle={'Email'}
            // keyboardType={"email-address"}
            autoComplete="off"
            value={email}
            setValue={setEmail}
          />
          <InputBox
            inputTitle={'Password'}
            secureTextEntry={true}
            autoComplete="off"
            value={password}
            setValue={setPassword}
          />
        </View>
        <SubmitButton
          title="Register"
          loading={loading}
          handleSubmit={handleSubmit}
        />
        {/*  &nbsp; ==>it will give some wide space */}
        <Text style={styles.linkText}>
          Already have an account? &nbsp;
          <Text
            style={styles.link}
            onPress={() => navigation.navigate('Login')}>
            Login
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

export default Register;
