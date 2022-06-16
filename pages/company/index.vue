<template>
  <div class="user-admin-page">
    <div class="container" style="padding-bottom: 30px">
      <div class="row" style="justify-content: space-between">
        <div class="col-md-5">
          <div class="row">
            <el-input
              v-model="search"
              style="width: 82%"
              placeholder="Nhập tên thương hiệu..."
              @change="filter()"
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
            :data="company"
            :fields="json_fields"
            worksheet="My Worksheet"
            name="company.xls"
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
        :data="company"
        style="width: 100%"
      >
        <el-table-column label="Hình ảnh thương hiệu" width="250">
          <template slot-scope="scope">
            <el-avatar
              v-if="scope.row.logoCompany"
              :size="50"
              fit="cover"
              :src="scope.row.logoCompany"
            >
            </el-avatar>
          </template>
        </el-table-column>
        <el-table-column label="Chức năng" width="100">
          <template slot-scope="scope">
            <i
              style="margin-right: 15px"
              class="el-icon-edit icon-funtion"
              @click="editDetail(scope.row._id, scope.row)"
            ></i>
            <i
              class="el-icon-delete icon-funtion"
              @click="deleteCompany(scope.row._id)"
            ></i>
          </template>
        </el-table-column>
        <el-table-column label="Tên thương hiệu" width="300">
          <template slot-scope="scope">
            <span>{{ scope.row.nameCompany }}</span>
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
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import Vue from 'vue'
import excel from 'vue-excel-export'
import _ from 'lodash'
import { apiServices } from '~/store/apiService'

Vue.prototype.moment = moment
Vue.use(excel)
export default {
  layout: 'DefaultLayout',
  data() {
    return {
      search: '',
      currentPage: 1,
      company: [],
      total: 0,
      json_fields: {
        'Tên thương hiệu': 'nameCompany',
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
        .getAllCompany()
        .then((res) => {
          if (res) {
            _this.company = res?.data?.data
            _this.total = res?.data?.total
            _this.loading = false
          }
        })
        .catch((e) => {
          _this.loading = false
        })
    },
    deleteCompany(id) {
      const _this = this
      _this
        .$confirm('Bạn muốn xóa thương hiệu này', 'Warning', {
          confirmButtonText: 'Xác nhận',
          cancelButtonText: 'Hủy bỏ',
          type: 'warning',
        })
        .then(async () => {
          await apiServices
            .deleteCompany(id)
            .then((res) => {
              _this.$message({
                showClose: true,
                message: 'Xóa thương hiệu thành công',
                type: 'success',
              })
              setTimeout(() => {
                _this.getData()
              }, 500)
            })
            .catch((e) => {
              _this.$message({
                showClose: true,
                message: 'Xóa thương hiệu thất bại',
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
      page.textContent = 'Tạo mới thương hiệu'
      localStorage.removeItem('namePage')
      localStorage.setItem('namePage', 'Tạo mới thương hiệu')
      _this.$router.push('company/id')
    },
    editDetail(id) {
      const _this = this
      localStorage.setItem('companyDetail', id)
      const page = document.querySelector('.navbar .bottom h3')
      page.textContent = 'Cập nhật thương hiệu'
      localStorage.removeItem('namePage')
      localStorage.setItem('namePage', 'Cập nhật thương hiệu')
      _this.$router.push({ path: `company/id=?${id}` })
    },
    filter() {
      const _this = this
      _this.company = _.filter(_this.company, (e) => {
        if (
          e.nameCompany != null &&
          e.nameCompany.toUpperCase().includes(_this.search.toUpperCase())
        ) {
          return e
        }
      })

      if (_this.search.toUpperCase() === '') {
        _this.getData()
      }
    },
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
</style>
