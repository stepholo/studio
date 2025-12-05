'use client';

import { createContext, useContext } from 'react';
import { Auth, getAuth } from 'firebase/auth';
import { FirebaseApp } from 'firebase/app';
import { Firestore, getFirestore } from 'firebase/firestore';
import { app } from './config';

interface IFirebaseContext {
  app: FirebaseApp;
  auth: Auth;
  db: Firestore;
}

const FirebaseContext = createContext<IFirebaseContext | null>(null);

export function FirebaseProvider({ children }: { children: React.ReactNode }) {
  const auth = getAuth(app);
  const db = getFirestore(app);

  return (
    <FirebaseContext.Provider value={{ app, auth, db }}>
      {children}
    </FirebaseContext.Provider>
  );
}

export const useFirebase = () => {
  const context = useContext(FirebaseContext);
  if (context === null) {
    throw new Error('useFirebase must be used within a FirebaseProvider');
  }
  return context;
};
