import { create } from 'zustand'

interface StoreState {
    email: string;
    setEmail: (email: string) => void;
    resetEmail: () => void;
}

export const useStore = create<StoreState>((set) => ({
    email: '',
    setEmail: (email) => set({ email }),
    resetEmail: () => set({ email: '' }),
}));