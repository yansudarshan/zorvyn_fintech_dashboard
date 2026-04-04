import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { dummyTransactions } from '../data/dummyData';

export const useStore = create(
  persist(
    (set, get) => ({
      theme: 'dark', // 'dark' | 'light'
      toggleTheme: () => {
        const newTheme = get().theme === 'dark' ? 'light' : 'dark';
        if (newTheme === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
        set({ theme: newTheme });
      },
      initTheme: () => {
        if (get().theme === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      },
      
      role: 'Admin', // 'Admin' | 'Viewer'
      toggleRole: () => set((state) => ({ role: state.role === 'Admin' ? 'Viewer' : 'Admin' })),
      
      transactions: dummyTransactions,
      
      addTransaction: (tx) => set((state) => ({ transactions: [tx, ...state.transactions] })),
      updateTransaction: (id, updatedTx) => set((state) => ({
        transactions: state.transactions.map(tx => tx.id === id ? { ...tx, ...updatedTx } : tx)
      })),
      deleteTransaction: (id) => set((state) => ({
        transactions: state.transactions.filter(tx => tx.id !== id)
      })),
      
      filters: { search: '', type: 'All', category: 'All', sort: 'date-desc' },
      setFilters: (newFilters) => set((state) => ({ filters: { ...state.filters, ...newFilters } })),
    }),
    {
      name: 'finance-dashboard-storage',
      partialize: (state) => ({ theme: state.theme, role: state.role, transactions: state.transactions }),
    }
  )
);
