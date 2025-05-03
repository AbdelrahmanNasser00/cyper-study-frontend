import { Input } from "../ui/input";

export const IconField = ({
  icon: Icon, 
  id,
  register,
  error,
  ...rest 
}) => (
  <div className="space-y-2">
    <div className="relative">
      {Icon && ( 
        <Icon className="absolute left-3 top-2 h-5 w-5 text-muted-foreground" />
      )}
      <Input
        id={id} 
        className="pl-10"
        {...rest} 
        {...register(id)} 
      />
      {error && (
        <p className="text-red-500 text-xs mt-1">{error.message}</p>
      )}
    </div>
  </div>
);
