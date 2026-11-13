import React, { createContext, useCallback, useContext, useMemo, useState, ReactNode } from 'react';
import { User } from '../types';

interface QuoteState {
  quote: number[];
  saved: number[];
  user: User | null;
  setUser: (user: User | null) => void;
  toggleQuote: (id: number) => void;
  removeFromQuote: (id: number) => void;
  toggleSaved: (id: number) => void;
}

const QuoteContext = createContext<QuoteState | undefined>(undefined);

const toggle = (list: number[], id: number): number[] =>
  list.includes(id) ? list.filter(x => x !== id) : [...list, id];

export function QuoteProvider({ children }: { children: ReactNode }) {
  const [quote, setQuote] = useState<number[]>([]);
  const [saved, setSaved] = useState<number[]>([]);
  const [user, setUser] = useState<User | null>(null);

  const toggleQuote = useCallback((id: number) => setQuote(q => toggle(q, id)), []);
  const removeFromQuote = useCallback((id: number) => setQuote(q => q.filter(x => x !== id)), []);
  const toggleSaved = useCallback((id: number) => setSaved(s => toggle(s, id)), []);

  const value = useMemo(
    () => ({ quote, saved, user, setUser, toggleQuote, removeFromQuote, toggleSaved }),
    [quote, saved, user, toggleQuote, removeFromQuote, toggleSaved],
  );
  return <QuoteContext.Provider value={value}>{children}</QuoteContext.Provider>;
}

export function useQuote(): QuoteState {
  const ctx = useContext(QuoteContext);
  if (!ctx) throw new Error('useQuote must be used inside QuoteProvider');
  return ctx;
}
