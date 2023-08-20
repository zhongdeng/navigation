import {create} from 'zustand';
import Navigation from '../navigation/Navigation';

type AuthType = {
  token: string | null;
  username: string | null;
  signIn: (token: string, username: string) => void;
  signOut: () => void;
};

export const useAuthStore = create<AuthType>(set => ({
  token: null,
  username: null,
  signIn: (token, username) => set(() => ({token, username})),
  signOut: () => set(() => ({token: null, username: null})),
}));

export const generateToken = (length: number = 32) => {
  var str = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  var result = '';
  for (var i = length; i > 0; --i) {
    result += str[Math.floor(Math.random() * str.length)];
  }
  return result;
};
