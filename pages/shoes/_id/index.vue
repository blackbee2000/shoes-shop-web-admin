<template>
  <div class="user-admin-page">
    <!-- <div class="container" style="padding: 30px 0">
      <h2 v-if="$route.params.id === 'id'">Tạo mới sản phẩm</h2>
      <h2 v-else>Cập nhật sản phẩm</h2>
    </div> -->
    <div class="container" style="padding-bottom: 20px">
      <div class="row" style="justify-content: flex-end">
        <el-button icon="el-icon-error" @click="backPage()" class="back-button"
          >Quay lại</el-button
        >
        <el-button
          icon="el-icon-success"
          class="save-button"
          @click="handleSave()"
          >Lưu</el-button
        >
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-md-6">
          <div class="form-item" style="margin-top: 20px">
            <label class="label">Tên sản phẩm</label>
            <el-input
              type="text"
              v-model="formData.nameProductVi"
              placeholder="Nhập tiêu đề tiếng việt"
            ></el-input>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <div class="form-item" style="margin-top: 20px">
            <label class="label">Mô tả sản phẩm (tiếng việt)</label>
            <el-input
              type="textarea"
              :rows="3"
              v-model="formData.descriptionVi"
              placeholder="Nhập mô tả sản phẩm (tiếng việt)"
            ></el-input>
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-item" style="margin-top: 20px">
            <label class="label">Mô tả sản phẩm (tiếng anh)</label>
            <el-input
              type="textarea"
              :rows="3"
              v-model="formData.descriptionEn"
              placeholder="Nhập mô tả sản phẩm (tiếng anh)"
            ></el-input>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <div class="form-item" style="margin-top: 20px">
            <label class="label">Hình ảnh sản phẩm</label>
            <div style="width: 100%">
              <div class="wrapper">
                <div class="image">
                  <img id="img-upload" :src="formData.imageProduct" alt="" />
                </div>
                <div class="content">
                  <div class="icon">
                    <i class="el-icon-upload"></i>
                  </div>
                  <div class="text">Ảnh chưa được chọn!</div>
                </div>
                <div id="cancel-btn">
                  <i class="el-icon-close"></i>
                </div>
                <div class="file-name">Tên hình ở đây</div>
              </div>
              <input id="default-btn" type="file" hidden />
              <el-button
                @click="handleUploadImage()"
                style="margin-top: 20px"
                id="custom-btn"
                >Chọn hình ảnh</el-button
              >
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-item" style="margin-top: 20px">
            <label class="label" style="margin-bottom: 0"
              >Cấu hình kích thước</label
            >
            <br />
            <el-tag
              v-for="item in typeProduct"
              :key="item.size"
              closable
              :disable-transitions="false"
              @close="handleClose(tag)"
            >
              Kích thước: {{ item.size }} - Số lượng : {{ item.quantity }}
            </el-tag>
            <br />
            <el-button
              style="margin-top: 20px"
              icon="el-icon-plus"
              @click="showDialogSize = true"
              >Thêm mới</el-button
            >
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <div class="form-item" style="margin-top: 20px">
            <label class="label">Giá sản phẩm</label>
            <el-input
              type="number"
              v-model="formData.price"
              placeholder="Nhập giá sản phẩm"
            ></el-input>
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-item" style="margin-top: 20px">
            <label class="label">Mã sản phẩm</label>
            <el-input
              type="text"
              v-model="formData.productCode"
              placeholder="Nhập mã sản phẩm"
            ></el-input>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <div class="form-item" style="margin-top: 20px">
            <label class="label">Giảm giá</label>
            <el-input
              type="number"
              v-model="formData.discount"
              placeholder="Nhập giảm giá"
            ></el-input>
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-item" style="margin-top: 20px">
            <label class="label">Thương hiệu</label>
            <br />
            <el-select
              style="width: 100%"
              v-model="idCompany"
              placeholder="Chọn thương hiệu"
            >
              <el-option
                v-for="item in listCompany"
                :key="item._id"
                :label="item.nameCompany"
                :value="item._id"
              >
              </el-option>
            </el-select>
          </div>
        </div>
      </div>
    </div>
    <div class="container" style="padding-top: 20px">
      <div class="row" style="justify-content: flex-end">
        <el-button icon="el-icon-error" @click="backPage()" class="back-button"
          >Quay lại</el-button
        >
        <el-button
          icon="el-icon-success"
          class="save-button"
          @click="handleSave()"
          >Lưu</el-button
        >
      </div>
    </div>
    <el-dialog
      title="Thêm cấu hình kích thức"
      :visible.sync="showDialogSize"
      width="30%"
      :before-close="handleClose"
    >
      <div class="row">
        <div class="col-md-12">
          <div class="form-item" style="margin-top: 20px">
            <label class="label">Kích thước</label>
            <br />
            <el-select
              style="width: 100%"
              v-model="formSizeData.size"
              placeholder="Chọn kích thước"
            >
              <el-option
                v-for="item in sizeList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <div class="form-item" style="margin-top: 20px">
            <label class="label">Số lượng</label>
            <el-input
              type="number"
              v-model="formSizeData.quantity"
              placeholder="Nhập số lượng"
            ></el-input>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose = false">Hủy bỏ</el-button>
        <el-button type="primary" @click="handleSaveAddSize"
          >Xác nhận</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
import Product from '@/model/product'
import { apiServices } from '~/store/apiService'
export default {
  data() {
    return {
      config: {
        headers: {
          'content-type': 'multipart/form-data',
        },
      },
      formData: new Product(),
      colors: ['#99A9BF', '#F7BA2A', '#FF9900'],
      typeProduct: [],
      formSizeData: {
        size: '',
        quantity: '',
      },
      showDialogSize: false,
      sizeList: [
        {
          label: '35',
          value: '35',
        },
        {
          label: '36',
          value: '36',
        },
        {
          label: '37',
          value: '37',
        },
        {
          label: '38',
          value: '38',
        },
        {
          label: '39',
          value: '39',
        },
        {
          label: '40',
          value: '40',
        },
        {
          label: '41',
          value: '41',
        },
        {
          label: '42',
          value: '42',
        },
      ],
      listCompany: [],
      idCompany: '',
    }
  },
  async created() {
    const _this = this
    await _this.getData()
    await _this.getListCompany()
  },
  methods: {
    async getData() {
      const _this = this
      const shoesDetailId = localStorage.getItem('shoesDetail')
      if (_this.$route?.params?.id === 'id') {
        _this.formData = new Product()
        _this.typeProduct = []
      } else {
        await apiServices
          .getProductById(shoesDetailId)
          .then((res) => {
            _this.formData = res?.data?.data
            _this.typeProduct = res?.data?.data?.type
            _this.idCompany = res?.data?.data?.idCompany
            console.log(_this.formData)
          })
          .catch((e) => {
            console.log('Lỗi')
          })
      }
    },
    async getListCompany() {
      const _this = this
      await apiServices
        .getAllCompany()
        .then((res) => {
          _this.listCompany = res?.data?.data
        })
        .catch((e) => {
          console.log('Có lỗi xảy ra')
        })
    },
    backPage() {
      const _this = this
      const page = document.querySelector('.navbar .bottom h3')
      page.textContent = 'Quản lí giày'
      localStorage.removeItem('namePage')
      localStorage.setItem('namePage', 'Quản lí giày')
      localStorage.removeItem('menu')
      localStorage.setItem('menu', 'Giày')
      _this.$router.push('/shoes')
    },
    async handleSave() {
      const _this = this
      _this.formData.nameProductEn = _this.formData.nameProductVi
      _this.formData.type = _this.typeProduct
      _this.formData.idCompany = _this.idCompany
      if (_this.$route?.params?.id === 'id') {
        _this.formData.rating = 0.0
        await apiServices
          .createProduct(_this.formData)
          .then((res) => {
            _this.$message({
              showClose: true,
              message: 'Thêm sản phẩm thành công',
              type: 'success',
            })
            setTimeout(() => {
              _this.$router.push('/shoes')
            }, 1000)
            console.log(res)
          })
          .catch((e) => {
            _this.$message({
              showClose: true,
              message: 'Thêm sản phẩm thất bại',
              type: 'error',
            })
          })
      } else {
        await apiServices
          .updateProduct(_this.formData)
          .then((res) => {
            _this.$message({
              showClose: true,
              message: 'Cập nhật sản phẩm thành công',
              type: 'success',
            })
            setTimeout(() => {
              _this.$router.push('/shoes')
            }, 1000)
            console.log(res)
          })
          .catch((e) => {
            _this.$message({
              showClose: true,
              message: 'Cập nhật sản phẩm thất bại',
              type: 'error',
            })
          })
      }
    },
    async uploadImage(image) {
      const _this = this
      const bodyFormData = new FormData()
      bodyFormData.append('Image', image)
      await apiServices
        .uploadImage(bodyFormData)
        .then((res) => {
          _this.formData.imageProduct = res?.data?.data
        })
        .catch((e) => {
          console.log(e)
        })
    },
    handleUploadImage() {
      const _this = this
      const defaulBtn = document.querySelector('#default-btn')
      const fileName = document.querySelector('.file-name')
      const img = document.querySelector('#img-upload')
      const cancelBtn = document.querySelector('#cancel-btn')
      defaulBtn.click()
      defaulBtn.addEventListener('change', function () {
        const file = this.files[0]
        if (file) {
          const reader = new FileReader()
          reader.onload = function () {
            const result = reader.result
            img.src = result
            _this.uploadImage(file)
            console.log(file.name)
          }
          cancelBtn.addEventListener('click', function () {
            img.src = ''
          })
          reader.readAsDataURL(file)
        }
        if (this.value) {
          const valueStore = this.value
          fileName.textContent = valueStore
        }
      })
    },
    handleClose(done) {
      done()
    },
    handleSaveAddSize() {
      const _this = this
      _this.typeProduct.push({
        size: _this.formSizeData.size,
        quantity: _this.formSizeData.quantity,
      })
      _this.showDialogSize = false
    },
  },
}
</script>
<style scoped>
.label {
  font-size: 16px;
  font-weight: 500;
  color: #182444;
  margin-bottom: 10px;
}

.back-button {
  width: 100px;
  background-color: #f56c6c !important;
  border: none !important;
  outline: none !important;
  color: #fff;
}
.back-button:hover {
  color: #fff;
  background-color: #f64141 !important;
}

.save-button {
  width: 100px;
  background-color: #409eff;
  color: #fff;
}
.save-button:hover {
  width: 100px;
  background-color: #409eff;
  color: #fff;
}
.wrapper {
  width: 100%;
  height: 300px;
  border: 2px dashed #182444;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  position: relative;
}
.wrapper .image {
  position: absolute;
  width: 100%;
  height: 100%;
}
.wrapper .image img {
  width: 100%;
  height: 100%;
  object-fit: fill;
}
.wrapper .icon {
  font-size: 100px;
  color: #182444;
  text-align: center;
}
.wrapper .text {
  font-size: 16px;
  font-weight: 500;
  color: #182444;
}
.wrapper #cancel-btn {
  position: absolute;
  right: 10px;
  top: 5px;
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  transform: translateX(130%);
  transition: 0.5s;
}
.wrapper .file-name {
  position: absolute;
  bottom: 0;
  background: #182444;
  width: 100%;
  padding: 8px 0;
  font-size: 16px;
  text-align: center;
  color: #fff;
  transform: translateY(102%);
  transition: 0.5s;
}
.wrapper:hover .file-name {
  transform: translateY(0%);
  transition: 0.5s;
}
.wrapper:hover #cancel-btn {
  transform: translateX(0%);
  transition: 0.5s;
}
.el-tag {
  margin-top: 15px;
  margin-right: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
