<template>
  <div class="user-admin-page">
    <div class="container" style="padding-bottom: 30px">
      <div class="row" style="justify-content: space-between">
        <div class="col-md-5">
          <div class="row">
            <el-input
              v-model="search"
              style="width: 82%"
              placeholder="Nhập tên sản phẩm..."
            ></el-input>
            <el-button
              style="width: 8%; height: 40px"
              icon="el-icon-search"
              class="btn-search"
              @click="filter()"
            ></el-button>
          </div>
        </div>
        <div class="col-md-2"></div>
        <div class="col-md-5 btn-excel" style="text-align: right">
          <export-excel
            class="btn btn-default btn-primary-web"
            :data="product"
            :fields="json_fields"
            worksheet="My Worksheet"
            name="product.xls"
          >
            Xuất excel
          </export-excel>
          <el-button class="btn-primary-add" @click="createNew()"
            >Tạo mới</el-button
          >
        </div>
      </div>
    </div>
    <div class="container">
      <el-table
        id="table-data"
        ref="userAdminData"
        v-loading="loading"
        :data="product"
        style="width: 100%"
      >
        <el-table-column label="Hình ảnh sản phẩm" width="250">
          <template slot-scope="scope">
            <el-avatar
              v-if="scope.row.imageProduct"
              :size="50"
              fit="cover"
              :src="scope.row.imageProduct"
            >
            </el-avatar>
          </template>
        </el-table-column>
        <el-table-column label="Chức năng" width="100">
          <template slot-scope="scope">
            <i
              style="margin-right: 15px; font-size: 20px"
              class="el-icon-edit icon-funtion"
              @click="editDetail(scope.row._id, scope.row)"
            ></i>
            <i
              style="font-size: 20px"
              class="el-icon-delete icon-funtion"
              @click="deleteProduct(scope.row._id)"
            ></i>
          </template>
        </el-table-column>
        <el-table-column label="Mã sản phẩm" width="200">
          <template slot-scope="scope">
            <span>{{ scope.row.productCode }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Tên sản phẩm" width="200">
          <template slot-scope="scope">
            <span>{{ scope.row.nameProductVi }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Mô tả sản phẩm" width="400">
          <template slot-scope="scope">
            <span class="threeLine">{{ scope.row.descriptionVi }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Đánh giá" width="200">
          <template slot-scope="scope">
            <span>{{ scope.row.rating }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Số lượng đã bán" width="200">
          <template slot-scope="scope">
            <span>{{ scope.row.quantitySold }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Giá sản phẩm" width="200">
          <template slot-scope="scope">
            <span>{{ scope.row.price }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Thời gian tạo" width="200">
          <template slot-scope="scope">
            <span>{{
              moment(scope.row.createdAt).format('HH:mm - DD-MM-YYYY')
            }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Thời gian chỉnh sửa" width="200">
          <template slot-scope="scope">
            <span>{{
              moment(scope.row.updatedAt).format('HH:mm - DD-MM-YYYY')
            }}</span>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        style="padding-top: 20px"
        :current-page.sync="currentPage"
        :page-sizes="[1, 10, 20, 50, 100]"
        background
        layout="prev, pager, next"
        :page-size="10"
        :total="totalProdcut"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </div>
    <div class="over-lay"></div>
  </div>
</template>

<script>
import moment from 'moment'
import Vue from 'vue'
import excel from 'vue-excel-export'
import { apiServices } from '~/store/apiService'

Vue.prototype.moment = moment
Vue.use(excel)
export default {
  layout: 'DefaultLayout',
  data() {
    return {
      search: '',
      currentPage: 1,
      product: [],
      totalProdcut: 0,
      json_fields: {
        'Mã sản phẩm': 'productCode',
        'Tên sản phẩm': 'nameProductVi',
        'Giá sản phẩm': 'price',
        'Mô tả sản phẩm': 'descriptionVi',
        'Đánh giá': 'rating',
        'Số lượng đã bán': 'quantitySold',
      },
      loading: false,
    }
  },
  async created() {
    const _this = this
    await _this.getData()
  },
  mounted() {},
  methods: {
    async getData() {
      const _this = this
      _this.loading = true
      await apiServices
        .getAllProduct()
        .then((res) => {
          if (res) {
            _this.product = res?.data?.data
            _this.totalProdcut = res?.data?.totalProdcut
            _this.loading = false
          }
        })
        .catch((e) => {
          _this.loading = false
        })
    },
    deleteProduct(id) {
      const _this = this
      _this
        .$confirm('Bạn muốn xóa sản phẩm này', 'Warning', {
          confirmButtonText: 'Xác nhận',
          cancelButtonText: 'Hủy bỏ',
          type: 'warning',
        })
        .then(async () => {
          await apiServices
            .deleteProduct(id)
            .then((res) => {
              _this.$message({
                showClose: true,
                message: 'Xóa sản phẩm thành công',
                type: 'success',
              })
              setTimeout(() => {
                _this.getData()
              }, 500)
            })
            .catch((e) => {
              _this.$message({
                showClose: true,
                message: 'Xóa sản phẩm thất bại',
                type: 'erroe',
              })
            })
        })
    },

    handleSizeChange(val) {
      const _this = this
      _this.size = val
    },

    handleCurrentChange(val) {
      const _this = this
      _this.from = (_this.currentPage - 1) * _this.size
    },
    createNew() {
      const _this = this
      const page = document.querySelector('.navbar .bottom h3')
      page.textContent = 'Tạo mới sản phẩm'
      localStorage.removeItem('namePage')
      localStorage.setItem('namePage', 'Tạo mới sản phẩm')
      _this.$router.push('shoes/id')
    },
    editDetail(id) {
      const _this = this
      localStorage.setItem('shoesDetail', id)
      const page = document.querySelector('.navbar .bottom h3')
      page.textContent = 'Cập nhật sản phẩm'
      localStorage.removeItem('namePage')
      localStorage.setItem('namePage', 'Cập nhật sản phẩm')
      _this.$router.push('shoes/id')
      _this.$router.push({ path: `shoes/id=?${id}` })
    },
    filter() {},
  },
}
</script>
<style scoped>
.actionIcon {
  font-size: 16px;
  color: #182444;
  background: transparent !important;
}
.actionIcon:hover {
  color: #091023 !important;
}

.btn-excel .btn {
  padding: 0.375rem 2.7rem;
  border: 1px solid #dcdfe6;
  font-size: 16px;
  font-weight: 500;
  background: #fff;
  color: #606266;
}
.btn-excel .el-button {
  margin-left: 20px;
  padding: 0.375rem 2.7rem;
  font-size: 16px;
  font-weight: 500;
}
.threeLine {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
}
</style>
