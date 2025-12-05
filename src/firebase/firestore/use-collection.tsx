'use client';
import { useState, useEffect, useMemo } from 'react';
import { onSnapshot, Query, DocumentData, query, QueryConstraint } from 'firebase/firestore';

interface UseCollectionOptions {
    queryConstraints?: QueryConstraint[];
}

export function useCollection<T>(ref: Query | null, options?: UseCollectionOptions) {
    const [data, setData] = useState<T[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const constraints = options?.queryConstraints;

    const q = useMemo(() => {
        if (!ref) return null;
        return constraints ? query(ref, ...constraints) : ref;
    }, [ref, constraints]);

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
            console.error(err);
            setError(err);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [q]);

    return { data, loading, error };
}
