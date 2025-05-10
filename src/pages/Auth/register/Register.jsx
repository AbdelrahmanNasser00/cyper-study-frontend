import { useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "@/utils/validationSchemas/registerSchema";
import { useRegisterMutation } from "@/services/authApi";
import { handleApiError } from "@/utils/errorHandler";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Lock, Mail, User } from "lucide-react";
import { SocialLoginButtons } from "@/components/common/SocialLoginButtons";
import { IconField } from "@/components/common/IconField";
import { PasswordRequirements } from "./components/PasswordRequirments";
import { RegistrationSuccess } from "./components/SuccessScreen";

const Register = () => {
  const navigate = useNavigate();
  const [registerMutation, { isLoading }] = useRegisterMutation();
  const [generalError, setGeneralError] = useState("");
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [showPasswordRequirements, setShowPasswordRequirements] =
    useState(false);

  const {
    register,
    handleSubmit,
    control,
    reset,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "student",
    },
  });

  const onSubmit = useCallback(
    async (data) => {
      try {
        setGeneralError("");
        setRegistrationSuccess(false);

        await registerMutation(data).unwrap();
        setRegistrationSuccess(true);
        reset();
      } catch (error) {
        const message = handleApiError(error, setError, registerSchema);
        setGeneralError(message);
      }
    },
    [registerMutation, reset, setError]
  );

  const handleNavigateToLogin = useCallback(() => {
    navigate("/login");
  }, [navigate]);

  if (registrationSuccess) {
    return <RegistrationSuccess onNavigate={handleNavigateToLogin} />;
  }

  return (
    <div className="min-h-screen flex w-full justify-center items-center">
      <div className="max-w-md w-full px-4 py-12">
        <Card className="shadow-lg border-none">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-3xl font-bold">
              Create an account
            </CardTitle>
            <CardDescription>
              Enter your information to create your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              <Controller
                name="role"
                control={control}
                render={({ field }) => (
                  <Tabs
                    defaultValue={field.value}
                    onValueChange={field.onChange}>
                    <TabsList className="w-full rounded-md h-11">
                      <TabsTrigger
                        value="student"
                        className="text-muted-foreground rounded-md data-[state=active]:text-primary cursor-pointer">
                        Student
                      </TabsTrigger>
                      <TabsTrigger
                        value="instructor"
                        className="text-muted-foreground rounded-md data-[state=active]:text-primary cursor-pointer">
                        Instructor
                      </TabsTrigger>
                    </TabsList>
                    <TabsContent value="student">
                      <p className="text-sm text-muted-foreground mt-2 mb-4">
                        Create a student account to enroll in courses and track
                        your learning progress.
                      </p>
                    </TabsContent>
                    <TabsContent value="instructor">
                      <p className="text-sm text-muted-foreground mt-2 mb-4">
                        Create an instructor account to publish courses and
                        reach students worldwide.
                      </p>
                    </TabsContent>
                  </Tabs>
                )}
              />

              {/* Error alert */}
              {generalError && (
                <Alert variant="destructive" className="mb-4">
                  <AlertDescription>{generalError}</AlertDescription>
                </Alert>
              )}

              <div className="grid grid-cols-2 gap-4">
                <IconField
                  icon={User}
                  type="text"
                  id="firstname"
                  placeholder="First name"
                  register={(fieldName) => register(fieldName)}
                  error={errors.firstname}
                />
                <IconField
                  icon={User}
                  type="text"
                  id="lastname"
                  placeholder="Last name"
                  register={(fieldName) => register(fieldName)}
                  error={errors.lastname}
                />
              </div>

              <IconField
                icon={Mail}
                type="email"
                id="email"
                placeholder="Email"
                register={(fieldName) => register(fieldName)}
                error={errors.email}
              />

              <div>
                <IconField
                  icon={Lock}
                  type="password"
                  id="password"
                  placeholder="Password"
                  register={(fieldName) => register(fieldName)}
                  error={errors.password}
                />
                <div
                  className="text-xs text-indigo-600 cursor-pointer mt-1"
                  onClick={() =>
                    setShowPasswordRequirements(!showPasswordRequirements)
                  }>
                  {showPasswordRequirements ? "Hide" : "Show"} password
                  requirements
                </div>
                {showPasswordRequirements && <PasswordRequirements />}
              </div>

              <IconField
                icon={Lock}
                type="password"
                id="confirmPassword"
                placeholder="Confirm password"
                register={(fieldName) => register(fieldName)}
                error={errors.confirmPassword}
              />

              <div className="text-sm text-muted-foreground">
                By registering, you agree to our{" "}
                <Link to="/terms" className="text-indigo-700 hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link to="/privacy" className="text-indigo-700 hover:underline">
                  Privacy Policy
                </Link>
                .
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="bg-indigo-600 hover:bg-indigo-500 w-full cursor-pointer">
                {isLoading ? "Creating account..." : "Create account"}
              </Button>
            </form>

            <SocialLoginButtons isLoading={isLoading} />
          </CardContent>

          <CardFooter className="text-center">
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link to="/login" className="text-indigo-700 hover:underline">
                Log in
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Register;
