export const Authurization = localStorage.getItem('myAuthorizationToken');
export const userr = localStorage.getItem('myUserr');

/* ******************APIs****************** */
const baseUrl = 'https://api.vitaparapharma.com';
export const loginapi = baseUrl+'/api/v2/auth/login';
export const getAllCategory = baseUrl+'/api/v1/public/category/all';
export const AddProduct = baseUrl+'/api/v2/custom/product/new';
export const Active = baseUrl+'/api/v1/public/product/all';
export const InActive = baseUrl+'/api/v1/custom/product/inactive/all';
export const AddAdvertisementapi = baseUrl+'/api/v2/custom/advertisement/new';
export const AddBlogapi = baseUrl+'/api/v2/content/post/new';
export const Addcatrgoryapi = baseUrl+'/api/v2/admin/main/category/new';
export const Addcouponapi = baseUrl+'/api/v2/admin/coupon/new';
export const Addcouponnallapi = baseUrl+'/api/v2/admin/coupon/new/customer/all';
export const getAllCustomersapi = baseUrl+'/api/v1/admin/customer/all';
export const Addcouponnsapi = baseUrl+'/api/v2/admin/coupon/new/customer';
export const getAllCategorysapi = baseUrl+'/api/v1/public/main/category/all';
export const AddSubcatrgoryapi = baseUrl+'/api/v2/admin/category/new';
export const DeactivateButtonapi = baseUrl+'/api/v1/custom/product/deactivate/';
/* ******************APIs****************** */
