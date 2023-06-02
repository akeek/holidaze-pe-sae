import * as yup from "yup";

const email = /^[\w\-.]+@(stud\.)?noroff\.no$/;

export const schemaReg = yup.object().shape({
  name: yup
    .string()
    .required("Enter full name")
    .max(25, "Maximum 25 characters"),
  email: yup
    .string()
    .required("Enter email address")
    .matches(email, "Enter a valid Noroff email"),
  avatar: yup.string().url("Avatar must be url"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be more than 8 characters"),
});

export const schemaLogin = yup.object().shape({
  email: yup
    .string()
    .required("Enter your email address")
    .matches(email, "Enter a valid Noroff email"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Enter correct password"),
});
