<template>
  <div class="user-admin-page">
    <div class="container" style="padding-bottom: 30px">
      <div class="row" style="justify-content: space-between">
        <div class="col-md-5">
          <div class="row">
            <el-input
              v-model="search"
              style="width: 82%"
              placeholder="Nhập tên bài viết..."
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
            :data="blog"
            :fields="json_fields"
            worksheet="My Worksheet"
            name="blog.xls"
          >
            Xuất excel
          </export-excel>
          <el-button
            class="btn-primary-add"
            @click="createNew()"
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
        :data="blog"
        style="width: 100%"
      >
        <el-table-column label="Hình ảnh bài viết" width="150">
          <template slot-scope="scope">
            <el-avatar
              v-if="scope.row.imageBlog"
              :size="50"
              fit="cover"
              :src="scope.row.imageBlog"
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
              @click="deleteBlog(scope.row._id)"
            ></i>
          </template>
        </el-table-column>
        <el-table-column label="Tên bài viết" width="200">
          <template slot-scope="scope">
            <span>{{ scope.row.titleVi }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Mô tả bài viết" width="200">
          <template slot-scope="scope">
            <span class="threeLine">{{ scope.row.descriptionShortVi }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Nội dung bài viết" width="">
          <template slot-scope="scope">
            <span class="threeLine">{{ scope.row.contentVi }}</span>
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
        :total="total"
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
      blog: [],
      total: [],
      json_fields: {
        'Tên bài viết': 'titleVi',
        'Mô tả bài viết': 'descriptionShort',
        'Nội dung bài viết': 'content',
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
        .getAllBlog()
        .then((res) => {
          if (res) {
            _this.blog = res?.data?.data
            _this.total = res?.data?.total
            _this.loading = false
          }
        })
        .catch((e) => {
          _this.loading = false
        })
    },
    deleteBlog(id) {
      const _this = this
      _this
        .$confirm('Bạn muốn xóa bài viết này', 'Warning', {
          confirmButtonText: 'Xác nhận',
          cancelButtonText: 'Hủy bỏ',
          type: 'warning',
        })
        .then(async () => {
          await apiServices
            .deleteBlog(id)
            .then((res) => {
              _this.$message({
                showClose: true,
                message: 'Xóa bài viết thành công',
                type: 'success',
              })
              setTimeout(() => {
                _this.getData()
              }, 500)
            })
            .catch((e) => {
              _this.$message({
                showClose: true,
                message: 'Xóa bài viết thất bại',
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
      _this.$router.push('blog/id')
    },
    editDetail(id, row) {
      const _this = this
      _this.$router.push({ path: `blog/id=?${id}`, query: { blog: row } })
    },
    filter() {
      const _this = this
      _this.blog = _.filter(_this.blog, (e) => {
        if (
          e.titleVi != null &&
          e.titleVi.toUpperCase().includes(_this.search.toUpperCase())
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
.threeLine {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
}
</style>
