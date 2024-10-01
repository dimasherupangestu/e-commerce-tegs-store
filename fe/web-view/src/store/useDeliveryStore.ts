/* eslint-disable @typescript-eslint/no-explicit-any */
import {create} from 'zustand';

interface DeliveryState {
  selectedCourier: string;
  selectedService: any | null;
  setSelectedCourier: (courier: string) => void;
  setSelectedService: (service: any) => void;
}

const useDeliveryStore = create<DeliveryState>((set) => ({
  selectedCourier: '',
  selectedService: null,
  setSelectedCourier: (courier) => set({ selectedCourier: courier }),
  setSelectedService: (service) => set({ selectedService: service }),
}));

export default useDeliveryStore;
