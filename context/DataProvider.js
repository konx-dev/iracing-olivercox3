'use client';
import { createContext, useContext, useState } from 'react';

export const DataContext = createContext(null);

export function DataProvider({ children, initialData }) {
  const [data] = useState(initialData); // Stores server-fetched data

  return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
}

// Custom Hook for easy access
export function useData() {
  return useContext(DataContext);
}
