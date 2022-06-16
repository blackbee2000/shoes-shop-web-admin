<template>
  <div class="user-admin-page">
    <div class="container" style="padding-bottom: 30px">
      <div class="row" style="justify-content: space-between">
        <div class="col-md-5">
          <div class="row">
            <el-input
              v-model="search"
              style="width: 82%"
              placeholder="Nhập tên, số điện thoại, email..."
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
            :data="userAdmin"
            :fields="json_fields"
            worksheet="My Worksheet"
            name="userCustomer.xls"
          >
            Xuất excel
          </export-excel>
        </div>
      </div>
    </div>
    <div class="container">
      <el-table
        id="userAdmin"
        v-loading="loading"
        :data="userAdmin"
        style="width: 100%"
      >
        <el-table-column label="Avatar" width="150">
          <template slot-scope="scope">
            <el-avatar
              v-if="scope.row.avatar"
              :size="50"
              fit="cover"
              shape="circle"
              :src="scope.row.avatar"
            >
            </el-avatar>
          </template>
        </el-table-column>
        <el-table-column label="Chức năng" width="100">
          <template slot-scope="scope">
            <i
              style="margin-right: 15px; font-size: 20px; cursor: pointer"
              class="el-icon-view"
              @click="handleViewDetail(scope.row)"
            ></i>
          </template>
        </el-table-column>
        <el-table-column label="Họ và tên" width="200">
          <template slot-scope="scope">
            <span>{{ scope.row.fullName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Số điện thoại" width="200">
          <template slot-scope="scope">
            <span>{{ scope.row.phoneNumber }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Email" width="200">
          <template slot-scope="scope">
            <span>{{ scope.row.email }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Thời gian tạo">
          <template slot-scope="scope">
            <span>{{ moment(scope.row.createdAt).format('HH:mm - DD-MM-YYYY') }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Thời gian chỉnh sửa" width="200">
          <template slot-scope="scope">
            <span>{{ moment(scope.row.updatedAt).format('HH:mm - DD-MM-YYYY') }}</span>
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
        :total="userAdmin.length"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </div>
    <el-drawer
      title="Chi tiết khách hàng"
      :visible.sync="showDialogAdmin"
      size="30%"
      :wrapperClosable="false"
      :withHeader="false"
      :close-on-press-escape="false"
    >
      <div class="" style="min-height: 45px">
        <div
          class="
            d-flex
            py-2
            px-2
            flex-row
            justify-content-between
            align-items-center
            header
          "
          style="background: #182444"
        >
          <div class="header-text" style="color: #fff; padding-left: 20px">
            Chi tiết khách hàng
          </div>
          <div @click="showDialogAdmin = false">
            <el-icon
              style="cursor: pointer; color: #ffffff"
              class="el-icon-close font-22 text-bold pb-2"
            ></el-icon>
          </div>
        </div>
        <el-scrollbar
          v-if="userAdminDetail"
          ref="scrollbar"
          style="height: calc(100vh - 45px); background: #d9d9d9"
        >
          <div style="width: 100%; padding: 20px">
            <p><strong>Họ và tên: </strong> {{ userAdminDetail.fullName }}</p>
            <p>
              <strong>Số điện thoại: </strong>{{ userAdminDetail.phoneNumber }}
            </p>
            <p><strong>Email: </strong>{{ userAdminDetail.email }}</p>
            <label><strong>Avatar</strong></label
            ><br />
            <img
              style="width: 90%; object-fit: cover; margin-top: 10px"
              :src="userAdminDetail.avatar"
            />
          </div>
        </el-scrollbar>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import moment from 'moment'
import Vue from 'vue'
import excel from 'vue-excel-export'
import _ from 'lodash'
import { apiServices } from '~/store/apiService'
import User from '@/model/account'

Vue.prototype.moment = moment
Vue.use(excel)
export default {
  layout: 'DefaultLayout',
  data() {
    return {
      search: '',
      currentPage: 1,
      userAdmin: [],
      userAdminDetail: new User(),
      showDialogAdmin: false,
      json_fields: {
        'Họ và tên': 'fullName',
        'Số điện thoại': 'numberPhone',
        Email: 'email',
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
        .getAllAccount()
        .then((res) => {
          if (res) {
            _this.userAdmin = res?.data?.data.filter((e) => e?.role === 'ADMIN')
            _this.loading = false
          }
        })
        .catch((e) => {
          _this.loading = false
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

    handleViewDetail(row) {
      const _this = this
      _this.showDialogAdmin = true
      _this.userAdminDetail = row
    },
    filter() {
      const _this = this
      _this.userAdmin = _.filter(_this.userAdmin, (e) => {
        if (
          e.fullName != null &&
          e.fullName.toUpperCase().includes(_this.search.toUpperCase())
        ) {
          return e
        }

        if (
          e.phoneNumber != null &&
          e.phoneNumber.toUpperCase().includes(_this.search.toUpperCase())
        ) {
          return e
        }

        if (
          e.email != null &&
          e.email.toUpperCase().includes(_this.search.toUpperCase())
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
</style>
