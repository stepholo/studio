'use client';
import { useState, useEffect, useMemo } from 'react';
import { onSnapshot, Query, DocumentData, query, QueryConstraint } from 'firebase/firestore';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

interface UseCollectionOptions {
    queryConstraints?: QueryConstraint[];
}

export function useCollection<T>(ref: Query | null, options?: UseCollectionOptions) {
    const [data, setData] = useState<T[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const serializedConstraints = useMemo(() => {
        if (!options?.queryConstraints) return '';
        // A simple but effective way to create a stable dependency string.
        // It's imperfect but good enough for common `where` clauses.
        return options.queryConstraints.map(c => (c as any)._field + (c as any)._op + (c as any)._value).join(',');
    }, [options?.queryConstraints]);

    const q = useMemo(() => {
        if (!ref) return null;
        return options?.queryConstraints ? query(ref, ...options.queryConstraints) : ref;
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ref, serializedConstraints]);

    useEffect(() => {
        if (!q) {
            setLoading(false);
            setData(null);
            return;
        }

        setLoading(true);

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const result: T[] = [];
            snapshot.forEach((doc) => {
                result.push({ id: doc.id, ...doc.data() } as T);
            });
            setData(result);
            setLoading(false);
            setError(null);
        }, (err) => {
            console.error("Error subscribing to collection:", err);
            if (err.code === 'permission-denied') {
                errorEmitter.emit('permission-error', new FirestorePermissionError({
                    path: ref!.path,
                    operation: 'list',
                }));
            }
            setError(err);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [q, ref]);

    return { data, loading, error };
}
