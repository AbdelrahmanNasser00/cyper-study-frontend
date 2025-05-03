import * as Yup from "yup";

export const registerSchema = Yup.object({
  firstname: Yup.string().min(2).max(30).required("First name is required"),
  lastname: Yup.string().min(2).max(30).required("Last name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().min(6).required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
  role: Yup.string()
    .oneOf(["student", "instructor"], "Invalid role")
    .required("Role is required"),
});
