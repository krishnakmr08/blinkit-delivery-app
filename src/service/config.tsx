import { Platform } from 'react-native';

export const BASE_URL =
  Platform.OS === 'android'
    ? 'http://10.0.2.2:3000/api'
    : 'http://localhost:3000/api';
export const SOCKET_URL =
  Platform.OS === 'android' ? 'http://10.0.2.2:3000' : 'http://localhost:3000';
export const GOOGLE_MAP_API = 'AIzaSyBIEwsyUBLGr8whidJekwPU1Q5pw5IKYNU';
export const BRANCH_ID = '68bf2d273845635d9b08f182';
