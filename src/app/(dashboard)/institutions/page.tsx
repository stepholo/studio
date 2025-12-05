'use client';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, Upload, RefreshCw, Smartphone, PiggyBank, CircleDollarSign, HandCoins, Landmark, Loader2 } from "lucide-react";
import { useUser } from "@/firebase/auth/use-user";
import { useCollection } from "@/firebase/firestore/use-collection";
import { collection, doc, updateDoc } from "firebase/firestore";
import { useFirebase } from "@/firebase/provider";
import type { Institution } from "@/lib/types";
import React from "react";
import { AddInstitutionDialog } from '@/components/add-institution-dialog';
import { Skeleton } from "@/components/ui/skeleton";
import { errorEmitter } from "@/firebase/error-emitter";
import { FirestorePermissionError } from "@/firebase/errors";

const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
  Smartphone,
  Landmark,
  PiggyBank,
  CircleDollarSign,
  HandCoins,
};

export default function InstitutionsPage() {
  const { user } = useUser();
  const { db } = useFirebase();
  const [connectingId, setConnectingId] = React.useState<string | null>(null);

  const institutionsRef = React.useMemo(() => user ? collection(db, 'users', user.uid, 'institutions') : null, [user, db]);
  const { data: institutions, loading } = useCollection<Institution>(institutionsRef);

  const connectInstitution = (institution: Institution) => {
     if (!user || !institution.id) return;
    setConnectingId(institution.id);
    
    const docRef = doc(db, 'users', user.uid, 'institutions', institution.id);
    const updatedData = { status: 'Connected' };

    // In a real app, this would involve an OAuth flow.
    // Here we'll just update the status in Firestore.
    updateDoc(docRef, updatedData)
      .catch(error => {
        if (error.code === 'permission-denied') {
          errorEmitter.emit('permission-error', new FirestorePermissionError({
            path: docRef.path,
            operation: 'update',
            requestResourceData: updatedData
          }));
        }
        console.error("Failed to connect institution:", error);
      })
      .finally(() => {
        setConnectingId(null);
      });
  };


  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-headline font-bold">Your Connected Institutions</h1>
          <p className="text-muted-foreground">Manage your financial accounts to build your score.</p>
        </div>
        <AddInstitutionDialog>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" /> Add Institution
          </Button>
        </AddInstitutionDialog>
      </div>
      {loading && (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(3)].map((_, i) => (
                <Card key={i}>
                    <CardHeader>
                        <Skeleton className="h-6 w-3/4" />
                        <Skeleton className="h-4 w-1/4" />
                    </CardHeader>
                    <CardContent>
                         <Skeleton className="h-4 w-full" />
                         <Skeleton className="h-4 w-5/6 mt-2" />
                    </CardContent>
                    <CardFooter className="flex justify-end">
                        <Skeleton className="h-10 w-24" />
                    </CardFooter>
                </Card>
            ))}
        </div>
      )}
      {!loading && institutions && institutions.length === 0 && (
         <Card className="flex flex-col items-center justify-center h-64 text-center p-8 border-dashed">
            <CardHeader>
                <CardTitle>No Institutions Yet</CardTitle>
                <CardDescription>Get started by adding your financial institutions to build your credit profile.</CardDescription>
            </CardHeader>
            <CardContent>
                <AddInstitutionDialog>
                  <Button>
                      <PlusCircle className="mr-2 h-4 w-4" /> Add Your First Institution
                  </Button>
                </AddInstitutionDialog>
            </CardContent>
        </Card>
      )}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {institutions?.map((inst: Institution) => {
            const Icon = iconMap[inst.logo] || Landmark;
            const isConnecting = connectingId === inst.id;
            return (
              <Card key={inst.id} className="flex flex-col">
                <CardHeader className="flex flex-row items-start justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Icon className="h-6 w-6 text-primary" /> {inst.name}
                    </CardTitle>
                    <CardDescription>{inst.type}</CardDescription>
                  </div>
                  <Badge variant={inst.status === "Connected" ? "default" : "secondary"}>
                    {inst.status}
                  </Badge>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-sm text-muted-foreground">
                    {inst.status === "Connected" 
                      ? "Your data is being synced to build your unified score."
                      : "Connect this institution to improve your score accuracy."
                    }
                  </p>
                </CardContent>
                <CardFooter className="flex justify-end gap-2">
                  {inst.type === "M-Pesa" && inst.status === "Connected" && (
                    <Button variant="outline" size="sm">
                      <Upload className="mr-2 h-4 w-4" /> Upload Statement
                    </Button>
                  )}
                  {inst.status === "Connected" ? (
                    <Button variant="ghost" size="sm" disabled>
                      <RefreshCw className="mr-2 h-4 w-4" /> Synced
                    </Button>
                  ) : (
                    <Button size="sm" onClick={() => connectInstitution(inst)} disabled={isConnecting}>
                      {isConnecting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      {isConnecting ? 'Connecting...' : 'Connect'}
                    </Button>
                  )}
                </CardFooter>
              </Card>
            )}
        )}
      </div>
    </>
  );
}
