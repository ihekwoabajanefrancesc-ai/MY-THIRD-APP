import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { supabase } from "../lib/supabase";

export const useStore = create(
  persist(
    (set) => ({
      isDark: false,
      toggleTheme: () => set((state) => ({ isDark: !state.isDark })),
      setTheme: (theme) => set({ isDark: theme === "dark" }),

      user: null,
      setUser: (userData) => set({ user: userData }),

      logout: async () => {
        await supabase.auth.signOut();
        set({ user: null });
      },
    }),
    {
      name: "techcrush-storage",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ isDark: state.isDark, user: state.user }),
    }
  )
);

