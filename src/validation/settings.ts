import * as yup from 'yup';

export const settingsSchema = yup.object().shape({
  searchDistance: yup.string().required('Search distance required'),
});
