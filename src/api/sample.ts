import { api } from '@/api/_api';

export const sample = () => {
  return api.get('/sample');
};

export const samplePost = (data: any) => {
  return api.post('/sample', data);
};

export const samplePut = (data: any) => {
  return api.put('/sample', data);
}; 

export const sampleDelete = (data: any) => {
  return api.delete('/sample', data);
};

export const sampleFormData = (data: any) => {
  return api.formData('/sample', data);
};
