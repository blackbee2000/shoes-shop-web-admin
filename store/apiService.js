import axios from 'axios'


const {
  REGISTER,
  UPDATEACCOUNT,
  RESETPASSWORD,
  CHANGEPASSWORD,
  CREATEPRODUCT,
  UPDATEPRODUCT,
  DELETEPRODUCT,
  GETALLPRODUCT,
  GETALLACCOUNT,
  GETACCOUNTBYID,
  GETPRODUCTBYID,
  CREATECOMPANY,
  UPDATECOMPANY,
  DELETECOMPANY,
  GETALLCOMPANY,
  GETCOMPANYTBYID,
  CREATEADDRESS,
  UPDATEADDRESS,
  DELETEADDRESS,
  GETALLADDRESS,
  GETADDRESSTBYID,
  CREATEBLOG,
  UPDATEBLOG,
  DELETEBLOG,
  GETALLBLOG,
  GETBLOGTBYID,
  GETSTATISTICBYYEAR,
  GETALLORDER,
  GETORDERTBYID,
  GETORDERBYSTATUS,
  CREATEVOUCHER,
  UPDATEVOUCHER,
  DELETEVOUCHER,
  GETALLVOUCHER,
  GETVOUCHERTBYID,
  LOGIN,
  UPLOADIMAGE,
  UPDATESTATUSORDER,
} = require('./apiConstant')
const { getApiWithToken, getApi } = require('./config')


export const apiServices = {
  login(params) {
    return getApi(LOGIN, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: params,
    })
  },
  createAccount(params) {
    return getApi(REGISTER, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: params,
    })
  },
  updateAccount(params) {
    return getApiWithToken(UPDATEACCOUNT, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      data: params,
    })
  },
  resetPassword(params) {
    return getApi(RESETPASSWORD, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      data: params,
    })
  },
  changePassword(params) {
    return getApiWithToken(CHANGEPASSWORD, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      data: params,
    })
  },
  getAllAccount() {
    return getApiWithToken(GETALLACCOUNT, {
      method: 'GET',
      headers: {},
    })
  },
  getAccount() {
    return getApiWithToken(GETACCOUNTBYID, {
      method: 'GET',
      headers: {},
    })
  },

  createProduct(params) {
    return getApiWithToken(CREATEPRODUCT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: params,
    })
  },
  updateProduct(params) {
    return getApiWithToken(UPDATEPRODUCT, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      data: params,
    })
  },
  deleteProduct(id) {
    return getApiWithToken(`${DELETEPRODUCT}=${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    })
  },
  getAllProduct() {
    return getApi(GETALLPRODUCT, {
      method: 'GET',
      headers: {},
    })
  },
  getProductById(id) {
    return getApi(`${GETPRODUCTBYID}=${id}`, {
      method: 'GET',
      headers: {},
    })
  },

  createCompany(params) {
    return getApiWithToken(CREATECOMPANY, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: params,
    })
  },
  updateCompany(params) {
    return getApiWithToken(UPDATECOMPANY, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      data: params,
    })
  },
  deleteCompany(id) {
    return getApiWithToken(`${DELETECOMPANY}=${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    })
  },
  getAllCompany() {
    return getApiWithToken(GETALLCOMPANY, {
      method: 'GET',
      headers: {},
    })
  },
  getCompanyById(id) {
    return getApi(`${GETCOMPANYTBYID}=${id}`, {
      method: 'GET',
      headers: {},
    })
  },

  createAddress(params) {
    return getApiWithToken(CREATEADDRESS, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: params,
    })
  },
  updateAddress(params) {
    return getApiWithToken(UPDATEADDRESS, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      data: params,
    })
  },
  deleteAddress(params, id) {
    return getApiWithToken(`${DELETEADDRESS}=${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      data: params,
    })
  },
  getAllAddress(token) {
    return axios(
      GETALLADDRESS,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }
    ).then((res) => res)
      .catch((e) => console.log(e))
  },
  getAddressById(id) {
    return getApi(`${GETADDRESSTBYID}=${id}`, {
      method: 'GET',
      headers: {},
    })
  },

  createBlog(params) {
    return getApiWithToken(CREATEBLOG, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: params,
    })
  },
  updateBlog(params) {
    return getApiWithToken(UPDATEBLOG, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      data: params,
    })
  },
  deleteBlog(id) {
    return getApiWithToken(`${DELETEBLOG}=${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    })
  },
  getAllBlog() {
    return getApiWithToken(GETALLBLOG, {
      method: 'GET',
      headers: {},
    })
  },
  getBlogById(id) {
    return getApi(`${GETBLOGTBYID}=${id}`, {
      method: 'GET',
      headers: {},
    })
  },

  getStatisticByYear(params) {
    return getApiWithToken(GETSTATISTICBYYEAR, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: params,
    })
  },
  getAllOrder() {
    return getApiWithToken(GETALLORDER, {
      method: 'GET',
      headers: {},
    })
  },
  getOrderById(id) {
    return getApiWithToken(`${GETORDERTBYID}=${id}`, {
      method: 'GET',
      headers: {},
    })
  },
  getOrderByStatus(params) {
    return getApiWithToken(GETORDERBYSTATUS, {
      method: 'POST',
      headers: {},
      data: params,
    })
  },
  updateStatusOrder(params) {
    return getApiWithToken(UPDATESTATUSORDER, {
      method: 'PUT',
      headers: {},
      data: params,
    })
  },

  createVoucher(params) {
    return getApiWithToken(CREATEVOUCHER, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: params,
    })
  },
  updateVoucher(params) {
    return getApiWithToken(UPDATEVOUCHER, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      data: params,
    })
  },
  deleteVoucher(id) {
    return getApiWithToken(`${DELETEVOUCHER}=${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    })
  },
  getAllVoucher() {
    return getApiWithToken(GETALLVOUCHER, {
      method: 'GET',
      headers: {},
    })
  },
  getVoucherById(id) {
    return getApiWithToken(`${GETVOUCHERTBYID}=${id}`, {
      method: 'GET',
      headers: {},
    })
  },

  uploadImage(params) {
    return getApiWithToken(UPLOADIMAGE, {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data;'
      },
      data: params
    })
  },
}
