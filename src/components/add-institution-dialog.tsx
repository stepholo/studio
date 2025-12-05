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
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Loader2, PlusCircle, Smartphone, PiggyBank, CircleDollarSign, HandCoins, Landmark, ChevronsUpDown, Check } from 'lucide-react';
import { useFirebase } from '@/firebase/provider';
import { useUser } from '@/firebase/auth/use-user';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';
import { kenyanFinancialInstitutions } from '@/lib/data';
import { cn } from '@/lib/utils';

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
  const [popoverOpen, setPopoverOpen] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
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
    const institutionsRef = collection(db, 'users', user.uid, 'institutions');
    const newInstitution = {
        name,
        type,
        status: 'Not Connected',
        logo: iconMap[type] || 'Landmark',
        createdAt: serverTimestamp(),
    };

    addDoc(institutionsRef, newInstitution).then(docRef => {
      toast({
        title: 'Institution Added',
        description: `${name} has been successfully added.`,
      });
      
      setName('');
      setType('');
      setOpen(false);
    }).catch(error => {
      console.error('Error adding institution:', error);
      if (error.code === 'permission-denied') {
        errorEmitter.emit('permission-error', new FirestorePermissionError({
          path: institutionsRef.path,
          operation: 'create',
          requestResourceData: newInstitution
        }));
      } else {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Failed to add institution. Please try again.',
        });
      }
    }).finally(() => {
      setIsLoading(false);
    });
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
               <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={popoverOpen}
                    className="col-span-3 justify-between"
                  >
                    {name
                      ? kenyanFinancialInstitutions.find((inst) => inst.name.toLowerCase() === name.toLowerCase())?.name
                      : "Select institution..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[300px] p-0">
                  <Command>
                    <CommandInput placeholder="Search institution..." />
                    <CommandList>
                      <CommandEmpty>No institution found.</CommandEmpty>
                      <CommandGroup>
                        {kenyanFinancialInstitutions.map((inst) => (
                          <CommandItem
                            key={inst.name}
                            value={inst.name}
                            onSelect={(currentValue) => {
                              const selected = kenyanFinancialInstitutions.find(i => i.name.toLowerCase() === currentValue.toLowerCase());
                              if (selected) {
                                  setName(selected.name);
                                  setType(selected.type);
                              }
                              setPopoverOpen(false)
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                name.toLowerCase() === inst.name.toLowerCase() ? "opacity-100" : "opacity-0"
                              )}
                            />
                            {inst.name}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
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
            <Button type="submit" disabled={isLoading || !name || !type}>
              {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              {isLoading ? 'Adding...' : 'Add Institution'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}