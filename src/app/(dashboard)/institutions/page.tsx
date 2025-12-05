import { mockInstitutions } from "@/lib/data";
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
import { PlusCircle, Upload, RefreshCw } from "lucide-react";

export default function InstitutionsPage() {
  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-headline font-bold">Your Connected Institutions</h1>
          <p className="text-muted-foreground">Manage your financial accounts to build your score.</p>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" /> Add Institution
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {mockInstitutions.map((inst) => (
          <Card key={inst.name} className="flex flex-col">
            <CardHeader className="flex flex-row items-start justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <inst.logo className="h-6 w-6 text-primary" /> {inst.name}
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
                <Button size="sm">Connect</Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
}
