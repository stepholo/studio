'use client';
import { useState, useEffect } from 'react';
import { collection, onSnapshot, Query, DocumentData, query, QueryConstraint } from 'firebase/firestore';
import { useFirebase } from '@/firebase/provider';
import { useMemo } from 'react';

interface UseCollectionOptions {
    queryConstraints?: QueryConstraint[];
}

export function useCollection<T>(ref: Query | null, options?: UseCollectionOptions) {
    const [data, setData] = useState<T[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const q = useMemo(() => {
        if (!ref) return null;
        return options?.queryConstraints ? query(ref, ...options.queryConstraints) : ref;
    }, [ref, options?.queryConstraints]);

    useEffect(() => {
        if (!q) {
            setLoading(false);
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
            console.error(err);
            setError(err);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [q]);

    return { data, loading, error };
}
