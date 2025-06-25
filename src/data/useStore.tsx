import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware'


export interface AppState {
    currentPage: string;
    setCurrentPage: (page: string) => void;
}
export const useStore = create<AppState>()(

    persist(
        (set) => ({
            currentPage: 'home',
            setCurrentPage: (page: string) => set({ currentPage: page }),
        }),
        {
            name: 'app-state', // unique name for the storage
           
        }
    )
    
);
