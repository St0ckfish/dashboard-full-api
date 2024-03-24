export const Authurization = localStorage.getItem('myAuthorizationToken');
export const userr = localStorage.getItem('myUserr');
const baseUrl = 'https://api.vitaparapharma.com';
export const getAllCategory = baseUrl+'/api/v1/public/category/all';
export const AddProduct = baseUrl+'/api/v2/custom/product/new';
export const Active = baseUrl+'/api/v1/public/product/all';
export const InActive = baseUrl+'/api/v1/custom/product/inactive/all';
