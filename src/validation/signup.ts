import * as yup from 'yup';

export const signupSchema = yup.object().shape({
  email: yup
    .string()
    .email('Valid email is required')
    .required('Email is required'),
  password: yup.string().required('Password is required'),
  passwordConfirmation: yup
    .string()
    .required('Confirm is required')
    .oneOf([yup.ref('password'), undefined], 'Passwords must match'),
});
