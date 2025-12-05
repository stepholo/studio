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

    // Serialize constraints to create a stable dependency for useMemo
    const serializedConstraints = useMemo(() => {
        if (!options?.queryConstraints) return '';
        // This is a simple serialization. A more robust one might be needed for complex objects.
        return JSON.stringify(options.queryConstraints.map(c => c.toString()));
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
            console.error(err);
            setError(err);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [q]);

    return { data, loading, error };
}
