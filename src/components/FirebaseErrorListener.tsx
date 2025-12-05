'use client';

import React, { useEffect } from 'react';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';
import { useUser } from '@/firebase/auth/use-user';
import { useFirebase } from '@/firebase/provider';
import { useToast } from '@/hooks/use-toast';

/**
 * A client-side component that listens for globally emitted Firestore permission errors
 * and displays them to the developer using a toast and a detailed console error.
 * This is crucial for debugging Security Rules during development.
 */
export function FirebaseErrorListener() {
  const { user } = useUser();
  const { auth } = useFirebase();
  const { toast } = useToast();

  useEffect(() => {
    const handlePermissionError = (error: FirestorePermissionError) => {
      console.error(
        'Firestore Permission Error Context:',
        JSON.stringify(
          {
            ...error.context,
            // Including current user's auth state provides crucial context for debugging rules.
            auth: auth.currentUser
              ? {
                  uid: auth.currentUser.uid,
                  email: auth.currentUser.email,
                  displayName: auth.currentUser.displayName,
                  token: (auth.currentUser as any).stsTokenManager,
                }
              : null,
          },
          null,
          2
        )
      );
      
      toast({
        variant: 'destructive',
        title: 'Firestore: Permission Denied',
        description: `Check the console for detailed security rule debugging info for the operation on: ${error.context.path}`,
        duration: 10000,
      });
    };

    errorEmitter.on('permission-error', handlePermissionError);

    return () => {
      errorEmitter.off('permission-error', handlePermissionError);
    };
  }, [auth, user, toast]);

  return null; // This component does not render anything itself.
}
