import React, { useEffect } from 'react';
import * as Facebook from 'expo-facebook';
import {
  Icon,
  Container,
  Content,
  Header,
  Left,
  Body,
  Right,
  Button,
  Text
} from 'native-base';
import { Auth } from 'aws-amplify';

export default function({ navigation }) {
  navigation.setOptions({
    headerRight: () => (
      <Button
        transparent
        onPress={() => {
          navigation.navigate('Add');
        }}
      >
        <Icon name='ios-add' />
      </Button>
    )
  });

  useEffect(() => {
    checkAuth();
  });

  async function checkAuth() {
    return await Auth.currentAuthenticatedUser()
      .then(user => {
        if (user) {
          console.log(user);
        } else {
          console.error('something went wrong with auth');
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  async function signIn() {
    await Facebook.initializeAsync('2860544543992003');
    const {
      type,
      token,
      expires
    } = await Facebook.logInWithReadPermissionsAsync({
      permissions: ['public_profile']
    });
    if (type === 'success') {
      // need to get other info before calling Auth
      // sign in with federated identity
      Auth.federatedSignIn(
        'facebook',
        { token, expires_at: expires },
        { name: 'USER_NAME' }
      )
        .then(() => {
          console.log('successful login with cognito');
          checkAuth();
        })
        .catch(e => {
          console.log(e);
        });
    }
  }

  return (
    <Container
      style={{ flex: 1, alignItems: 'center', alignContent: 'center' }}
    >
      <Content>
        <Text style={{ textAlign: 'center' }}>HomeScreen</Text>
        <Button onPress={() => signIn()}>
          <Text>Facebook Login</Text>
        </Button>
        <Button onPress={() => Auth.signOut()}>
          <Text>Sign out</Text>
        </Button>
      </Content>
    </Container>
  );
}
