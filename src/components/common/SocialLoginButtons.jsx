import { Button } from "../ui/button";

export const SocialLoginButtons = ({ isLoading }) => (
  <>
    <div className="relative mt-4">
      <div className="absolute inset-0 flex items-center">
        <span className="w-full border-t" />
      </div>
      <div className="relative flex justify-center text-xs uppercase">
        <span className="bg-background px-2 text-muted-foreground">
          Or continue with
        </span>
      </div>
    </div>

    <div className="grid grid-cols-2 gap-4 mt-4">
      <Button
        variant="outline"
        className="w-full cursor-pointer"
        disabled={isLoading}
        onClick={() => console.log("Google auth not implemented")}>
        Google
      </Button>
      <Button
        variant="outline"
        className="w-full cursor-pointer"
        disabled={isLoading}
        onClick={() => console.log("Facebook auth not implemented")}>
        Facebook
      </Button>
    </div>
  </>
);
