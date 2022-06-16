import { api } from './config'

export const LOGIN = `${api}/account/login`
export const REGISTER = `${api}/account/register`
export const UPDATEACCOUNT = `${api}/account/update`
export const RESETPASSWORD = `${api}/account/reset_password`
export const CHANGEPASSWORD = `${api}/account/change_password`
export const GETALLACCOUNT = `${api}/account/all`
export const GETACCOUNTBYID = `${api}/account/getAccount`

export const CREATEPRODUCT = `${api}/product/create`
export const UPDATEPRODUCT = `${api}/product/update`
export const DELETEPRODUCT = `${api}/product/delete?getId`
export const GETALLPRODUCT = `${api}/product/all`
export const GETPRODUCTBYID = `${api}/product/?getId`


export const CREATECOMPANY = `${api}/company/create`
export const UPDATECOMPANY = `${api}/company/update`
export const DELETECOMPANY = `${api}/company/delete?getId`
export const GETALLCOMPANY = `${api}/company/getAllCompanyByAdmin`
export const GETCOMPANYTBYID = `${api}/company/?getId`

export const CREATEADDRESS = `${api}/address/create`
export const UPDATEADDRESS = `${api}/address/update`
export const DELETEADDRESS = `${api}/address/delete?getId`
export const GETALLADDRESS = `${api}/address/all`
export const GETADDRESSTBYID = `${api}/address/?getId`

export const CREATEBLOG = `${api}/blog/create`
export const UPDATEBLOG = `${api}/blog/update`
export const DELETEBLOG = `${api}/blog/delete?getId`
export const GETALLBLOG = `${api}/blog/getAllBlogByAdmin`
export const GETBLOGTBYID = `${api}/blog/?getId`

export const GETSTATISTICBYYEAR = `${api}/order/getStatictisByYear`
export const GETORDERBYSTATUS = `${api}/order/getOrderStatus`
export const GETALLORDER = `${api}/order/all`
export const GETORDERTBYID = `${api}/order/?getId`
export const UPDATESTATUSORDER = `${api}/order/updateStatus`

export const CREATEVOUCHER = `${api}/voucher/create`
export const UPDATEVOUCHER = `${api}/voucher/update`
export const DELETEVOUCHER = `${api}/voucher/delete?getId`
export const GETALLVOUCHER = `${api}/voucher/all`
export const GETVOUCHERTBYID = `${api}/voucher/?getId`

export const UPLOADIMAGE = `${api}/company/getImage`