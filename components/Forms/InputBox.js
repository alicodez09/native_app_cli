import {View, StyleSheet, TextInput} from 'react-native';
import React from 'react';

const InputBox = props => {
  return (
    <View>
      <TextInput
        style={styles.inputBox}
        placeholder={props.inputTitle}
        autoCorrect={false}
        keyboardType={props.keyboardType}
        autoComplete={props.autoComplete}
        secureTextEntry={props.secureTextEntry || false}
        value={props.value}
        onChangeText={text => props.setValue(text)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputBox: {
    height: 40,
    backgroundColor: '#fff',
    color: '#000',
    margin: 15,
    borderRadius: 7,
    padding: 10,
  },
});

export default InputBox;

// const InputBox = ({
//   inputTitle,
//   keyboardType,
//   autoComplete,
//   secureTextEntry = false,
//   value,
//   setValue,
// }) => {
//   return (
//     <View>
//       <TextInput
//         style={styles.inputBox}
//         placeholder={inputTitle}
//         autoCorrect={false}
//         keyboardType={keyboardType}
//         autoComplete={autoComplete}
//         secureTextEntry={secureTextEntry}
//         value={value}
//         onChangeText={(text) => setValue(text)}
//       />
//     </View>
//   );
// };
