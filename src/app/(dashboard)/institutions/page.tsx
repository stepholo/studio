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
import { collection, doc, writeBatch } from "firebase/firestore";
import { useFirebase } from "@/firebase/provider";
import type { Institution } from "@/lib/types";
import { mockInstitutions } from "@/lib/data";
import React from "react";

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

  const institutionsRef = React.useMemo(() => user ? collection(db, 'users', user.uid, 'institutions') : null, [user, db]);
  const { data: institutions, loading } = useCollection<Institution>(institutionsRef);

  const connectInstitution = async (institutionName: string) => {
     if (!user || !institutionsRef) return;
    // In a real app, this would involve an OAuth flow.
    // Here we'll just update the status in Firestore.
    const institutionDoc = institutions?.find(inst => inst.name === institutionName);
    if(institutionDoc && institutionDoc.id) {
      const docRef = doc(db, 'users', user.uid, 'institutions', institutionDoc.id);
      const batch = writeBatch(db);
      batch.update(docRef, { status: 'Connected' });
      await batch.commit();
    }
  };

  const seedInstitutions = async () => {
    if (!user || !institutionsRef) return;
    const batch = writeBatch(db);
    mockInstitutions.forEach(inst => {
      const docRef = doc(institutionsRef, inst.name.toLowerCase().replace(/ /g, '-'));
      const initialStatus = inst.name === 'Equity Bank' || inst.name === 'M-Pesa' || inst.name === 'Tala' ? 'Connected' : 'Not Connected';
      batch.set(docRef, { ...inst, status: initialStatus, id: docRef.id });
    });
    await batch.commit();
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-headline font-bold">Your Connected Institutions</h1>
          <p className="text-muted-foreground">Manage your financial accounts to build your score.</p>
        </div>
        <Button onClick={seedInstitutions}>
          <PlusCircle className="mr-2 h-4 w-4" /> Add Institution
        </Button>
      </div>
      {loading && (
        <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      )}
      {!loading && institutions && institutions.length === 0 && (
         <Card className="flex flex-col items-center justify-center h-64 text-center p-8">
            <CardHeader>
                <CardTitle>No Institutions Found</CardTitle>
                <CardDescription>Get started by adding your financial institutions.</CardDescription>
            </CardHeader>
            <CardContent>
                <Button onClick={seedInstitutions}>
                    <PlusCircle className="mr-2 h-4 w-4" /> Add Your First Institution
                </Button>
            </CardContent>
        </Card>
      )}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {institutions?.map((inst: any) => {
            const Icon = iconMap[inst.logo] || Landmark;
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
                  {inst.type === "M-Pesa" && (
                    <Button variant="outline" size="sm">
                      <Upload className="mr-2 h-4 w-4" /> Upload Statement
                    </Button>
                  )}
                  {inst.status === "Connected" ? (
                    <Button variant="ghost" size="sm">
                      <RefreshCw className="mr-2 h-4 w-4" /> Auto-Sync
                    </Button>
                  ) : (
                    <Button size="sm" onClick={() => connectInstitution(inst.name)}>Connect</Button>
                  )}
                </CardFooter>
              </Card>
            )}
        )}
      </div>
    </>
  );
}
