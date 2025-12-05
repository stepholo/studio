'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Loader2, PlusCircle, Smartphone, PiggyBank, CircleDollarSign, HandCoins, Landmark } from 'lucide-react';
import { useFirebase } from '@/firebase/provider';
import { useUser } from '@/firebase/auth/use-user';
import { addDoc, collection } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';

const institutionTypes = [
  { value: 'Bank', label: 'Bank', icon: Landmark },
  { value: 'M-Pesa', label: 'M-Pesa', icon: Smartphone },
  { value: 'SACCO', label: 'SACCO', icon: PiggyBank },
  { value: 'Digital Lender', label: 'Digital Lender', icon: CircleDollarSign },
  { value: 'CRB', label: 'CRB', icon: HandCoins },
];

const iconMap: { [key: string]: string } = {
    Bank: 'Landmark',
    'M-Pesa': 'Smartphone',
    SACCO: 'PiggyBank',
    'Digital Lender': 'CircleDollarSign',
    CRB: 'HandCoins'
}

export function AddInstitutionDialog({ children }: { children: React.ReactNode }) {
  const { db } = useFirebase();
  const { user } = useUser();
  const { toast } = useToast();

  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !name || !type) {
      toast({
        variant: 'destructive',
        title: 'Missing Information',
        description: 'Please fill out all fields.',
      });
      return;
    }

    setIsLoading(true);
    try {
      const institutionsRef = collection(db, 'users', user.uid, 'institutions');
      await addDoc(institutionsRef, {
        name,
        type,
        status: 'Not Connected',
        logo: iconMap[type] || 'Landmark',
      });

      toast({
        title: 'Institution Added',
        description: `${name} has been successfully added.`,
      });
      
      // Reset form and close dialog
      setName('');
      setType('');
      setOpen(false);

    } catch (error) {
      console.error('Error adding institution:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to add institution. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add New Institution</DialogTitle>
            <DialogDescription>
              Connect a new financial account to get a more complete view of your credit.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="col-span-3"
                placeholder="e.g., KCB Bank, M-Shwari"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="type" className="text-right">
                Type
              </Label>
              <Select value={type} onValueChange={setType} required>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select institution type" />
                </SelectTrigger>
                <SelectContent>
                  {institutionTypes.map((it) => (
                    <SelectItem key={it.value} value={it.value}>
                      <div className="flex items-center gap-2">
                        <it.icon className="h-4 w-4 text-muted-foreground" />
                        <span>{it.label}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              {isLoading ? 'Adding...' : 'Add Institution'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
