import React, { useState } from 'react';
import { StyleSheet, Text, KeyboardAvoidingView, Platform } from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements';

import { Input, Button, ErrorText } from '../components/Form';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    paddingHorizontal: 40
  },
  headerText: {
    color: '#353031',
    fontWeight: 'bold',
    fontSize: 34,
    marginBottom: 10
  }
});

const useLoginFormState = ({ navigation }: any) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [submit, setSubmit] = useState(false);

  let isUsernameValid: boolean = false;
  let isPasswordValid: boolean = false;

  if (username === 'example') {
    isUsernameValid = true;
  }

  if (password === 'asdf') {
    isPasswordValid = true;
  }

  return {
    username: {
      value: username,
      set: setUsername,
      valid: isUsernameValid
    },
    password: {
      value: password,
      set: setPassword,
      valid: isPasswordValid
    },
    submit: {
      value: submit,
      set: () => {
        setSubmit(true);

        if (isUsernameValid && isPasswordValid) {
          fetch('https://jsonplaceholder.typicode.com/users', {
            method: 'POST',
            body: JSON.stringify({
              username,
              password
            })
          })
            .then(response => response.json())
            .then(() => {
              navigation.push('App');
            })
            .catch(error => {
              console.log('error', error);
            });
        }
      }
    }
  };
};

export default ({ navigation }: any) => {
  const { username, password, submit } = useLoginFormState({ navigation });

  const headerVerticalOffset = useHeaderHeight();

  let usernameErrorMsg;
  let passwordErrorMsg;

  if (submit.value && !username.valid) {
    usernameErrorMsg = 'Invalid username.';
  }

  if (submit.value && !password.valid) {
    passwordErrorMsg = 'Invalid password.';
  }

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={headerVerticalOffset}
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Text style={styles.headerText}>Login</Text>
      <Input
        label="Username"
        placeholder="example"
        onChangeText={username.set}
        error={usernameErrorMsg}
        testID="SignIn.usernameInput"
      />
      <Input
        label="Password"
        placeholder="***"
        secureTextEntry
        onChangeText={password.set}
        error={passwordErrorMsg}
        testID="SignIn.passwordInput"
      />
      <ErrorText messages={[usernameErrorMsg, passwordErrorMsg]} />
      <Button testID="SignIn.Button" text="Login" onPress={submit.set} />
    </KeyboardAvoidingView>
  );
};
