import { create } from "zustand";



export const useWeatherData = create((set) => ({
  vader: null,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  updateVader: (nyVader: any) => set({vader: nyVader}),
}));



