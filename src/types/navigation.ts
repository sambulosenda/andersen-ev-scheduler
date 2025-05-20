import { StackNavigationProp } from '@react-navigation/stack';

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

export type AuthScreenProps = {
  navigation: StackNavigationProp<AuthStackParamList, 'Login' | 'Register'>;
}; 