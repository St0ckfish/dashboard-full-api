export const Authurization = localStorage.getItem('myAuthorizationToken');
export const userr = localStorage.getItem('myUserr');

/* ******************APIs****************** */
const baseUrl = 'https://api.vitaparapharma.com';

export const loginapi = baseUrl+'/api/v2/auth/login';
export const getTagsUrl = baseUrl+'/api/v4/public/tag';
export const getAllCategory = baseUrl+'/api/v1/public/category/all';
export const AddProduct = baseUrl+'/api/v4/custom/product';
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
export const ActivateButtonapi = baseUrl+'/api/v1/custom/product/activate/';
export const GetAdvertisementStatusapi = baseUrl+'/api/v1/custom/advertisement/status/all';
export const PutAdvertisementStatusapi = baseUrl+'/api/v1/custom/advertisement/status';
export const GetAllAdvertisementapi = baseUrl+'/api/v1/public/advertisement/all';
export const GetAllAdvertisementDataapi = baseUrl+'/api/v2/custom/advertisement/';
export const DeleteAdvertisementapi = baseUrl+'/api/v1/custom/advertisement/delete/';
export const UpdateAdvertisementapi = baseUrl+'/api/v2/custom/advertisement/update/';
export const DeleteAdvertisementImgapi = baseUrl+'/api/v1/custom/advertisement/picture/delete/';
export const PutAdvertisementImgapi = baseUrl+'/api/v1/custom/advertisement/picture/add/';
export const DeleteCategoryBtn = baseUrl+'/api/v1/admin/main/category/delete/';
export const GetAllCategoryDataapi = baseUrl+'/api/v1/public/main-category/all-lang/';
export const UpdateAllCategoryDataapi = baseUrl+'/api/v2/admin/main/category/update/';
export const UpdateProductImgapi = baseUrl+'/api/v1/custom/product/picture/add/';
export const GetAllProductDataapi = baseUrl+'/api/v2/public/product/';
export const UpdateProductDataapi = baseUrl+'/api/v2/custom/product/update/';
export const DeleteProductImgapi = baseUrl+'/api/v1/custom/product/picture/delete/';
export const DeleteSubCategoryBtnapi = baseUrl+'/api/v1/admin/category/delete/';
export const UpdateSubCategoryDataapi = baseUrl+'/api/v2/admin/category/update/';
export const GetAllSubCategoryDataapi = baseUrl+'/api/v1/public/category/all-lang/';
export const GetAllBlogsapi = baseUrl+'/api/v1/public/post/all';
export const GetAllBlogsDataapi = baseUrl+'/api/v2/content/post/';
export const DeleteBlogsBtnapi = baseUrl+'/api/v1/content/post/delete/';
export const DeleteBlogsImgBtnapi = baseUrl+'/api/v1/content/post/picture/delete/';
export const PutBlogsImgBtnapi = baseUrl+'/api/v1/content/post/picture/add/';
export const UpdateBlogsapi = baseUrl+'/api/v2/content/post/update/';
/* ******************APIs****************** */