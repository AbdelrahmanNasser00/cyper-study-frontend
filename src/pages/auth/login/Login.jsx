import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Lock, Mail } from "lucide-react";
import { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { loginSchema } from "@/utils/validationSchemas/loginSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useLoginMutation } from "@/services/authApi";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { handleApiError } from "@/utils/errorHandler";
import { IconField } from "@/components/common/IconField";
import { SocialLoginButtons } from "@/components/common/SocialLoginButtons";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginSuccess } from "@/store/Slices/authSlice";

const Login = () => {
  const [rememberMe, setRememberMe] = useState(false);
  const [generalError, setGeneralError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginMutation, { isLoading }] = useLoginMutation();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = useCallback(
    async (formData) => {
      try {
        setGeneralError("");
        const loginResponse = await loginMutation(formData).unwrap();
        dispatch(loginSuccess({ token: loginResponse.token, rememberMe }));
        navigate("/", { replace: true });
      } catch (error) {
        const message = handleApiError(error, setError, loginSchema);
        if (message) setGeneralError(message);
      }
    },
    [loginMutation, setError, dispatch, navigate, rememberMe]
  );

  return (
    <div className="min-h-screen flex w-full justify-center items-center">
      <div className="max-w-md w-full px-4 py-12">
        <Card className="shadow-lg border-none">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-3xl font-bold">Welcome back</CardTitle>
            <CardDescription>
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {generalError && (
                <Alert variant="destructive" className="mb-4">
                  <AlertDescription>{generalError}</AlertDescription>
                </Alert>
              )}
              <IconField
                icon={Mail}
                type="email"
                id="email"
                placeholder="Email"
                register={register}
                error={errors.email}
              />
              <IconField
                icon={Lock}
                type="password"
                id="password"
                placeholder="Password"
                register={register}
                error={errors.password}
              />
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember-me"
                    checked={rememberMe}
                    onCheckedChange={setRememberMe}
                  />
                  <label
                    htmlFor="remember-me"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                    onClick={() => setRememberMe(!rememberMe)}>
                    Remember me
                  </label>
                </div>
                <Link
                  to="/forgot-password"
                  className="text-sm text-indigo-700 hover:underline">
                  Forgot password?
                </Link>
              </div>
              <Button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-500 cursor-pointer"
                disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>
            <SocialLoginButtons isLoading={isLoading} />
          </CardContent>
          <CardFooter className="text-center">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link to="/register" className="text-indigo-700 hover:underline">
                Create account
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Login;
