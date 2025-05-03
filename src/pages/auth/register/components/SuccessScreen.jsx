import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

export const RegistrationSuccess = ({ onNavigate }) => (
  <div className="min-h-screen flex w-full justify-center items-center">
    <div className="max-w-md w-full px-4 py-12">
      <Card className="shadow-lg border-none">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="rounded-full bg-green-100 p-3">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold">Registration Successful!</h2>
            <p className="text-muted-foreground">
              Your account has been created successfully. You can now log in to
              access your account.
            </p>
            <Button
              className="mt-4 bg-indigo-600 hover:bg-indigo-500 cursor-pointer"
              onClick={onNavigate}>
              Go to Login
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
);
