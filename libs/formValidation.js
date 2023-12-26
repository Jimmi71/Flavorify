import * as Yup from "yup";

export const userRegisterValidation = Yup.object({
  username: Yup.string()
    .min(3)
    .max(20)
    .required("Please enter your username")
    .test(
      "no-uppercase-or-spaces",
      "Username cannot contain spaces or uppercase letters",
      (value) => {
        if (value) {
          return /^[a-z0-9]*$/.test(value);
        }
        return true;
      }
    ),
  email: Yup.string().email().required("Please enter your email"),
  password: Yup.string()
    .required("Please enter your password")
    .min(5, "Password must be at least 5 characters long")
    .matches(
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&*!])[A-Za-z\d@#$%^&*!]*$/,
      "Password should contain uppercase letter, number, and symbol"
    ),
});
