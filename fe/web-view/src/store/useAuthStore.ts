import { create } from 'zustand';

interface User {
  email: string;
  full_name: string;
  phone_number: number;
  photo_profile: string;
  street: string;
  city: string;
  province: string;
  country: string;
  postal_code: string;
  city_id: number;
}

interface AuthState {
  token: string | null;
  user: User | null;
  setToken: (token: string) => void;
  setUser: (user: User) => void;
  logout: () => void;
  isAuthenticated: () => boolean;
}

// const TOKEN_EXPIRATION_TIME = 1 * 60 * 1000; // 1 menit dalam milidetik
const TOKEN_EXPIRATION_TIME = 3600 * 1000; // 1 jam dalam milidetik

const useAuthStore = create<AuthState>((set, get) => {
  const isTokenExpired = () => {
    const expirationTime = localStorage.getItem('token_expiration_time');
    return expirationTime ? Date.now() > parseInt(expirationTime, 10) : true;
  };

  if (isTokenExpired()) {
    localStorage.removeItem('token');
    localStorage.removeItem('token_expiration_time');
    localStorage.removeItem('user');
    set({ token: null, user: null });
  }

  return {
    token: localStorage.getItem('token'),
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null,
    setToken: (token) => {
      const expirationDate = Date.now() + TOKEN_EXPIRATION_TIME;
      localStorage.setItem('token', token);
      localStorage.setItem('token_expiration_time', expirationDate.toString());
      set({ token });
    },
    setUser: (user) => {
      localStorage.setItem('user', JSON.stringify(user));
      set({ user });
    },
    logout: () => {
      localStorage.removeItem('token');
      localStorage.removeItem('token_expiration_time');
      localStorage.removeItem('user');
      set({ token: null, user: null });
    },
    isAuthenticated: () => !!get().token && !isTokenExpired(),
  };
});

export default useAuthStore;
