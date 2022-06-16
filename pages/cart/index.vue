<template>
  <div class="user-admin-page">
    <div class="container" style="padding-bottom: 30px">
      <div class="row" style="justify-content: space-between">
        <div class="col-md-5">
          <div class="row">
            <el-input
              v-model="search"
              style="width: 82%"
              placeholder="Nhập mã đơn hàng..."
              @change="filter"
            ></el-input>
            <el-button
              style="width: 8%; height: 40px"
              icon="el-icon-search"
              class="btn-search"
              @click="filter()"
            ></el-button>
          </div>
        </div>
        <div class="col-md-5 btn-excel" style="text-align: right">
          <el-button class="btn-primary-add" @click="handleViewStatistic"
            >Thống kê</el-button
          >
        </div>
      </div>
    </div>
    <div class="container row" style="margin-bottom: 30px; margin-left: -25px">
      <div class="col-md-2" @click="handleStatusOrder('new')">
        <el-badge :value="totalNew" class="item-status-new">
          <el-button size="small">Đơn hàng mới</el-button>
        </el-badge>
      </div>
      <div class="col-md-2" @click="handleStatusOrder('packed')">
        <el-badge :value="totalPacked" class="item-status-packed">
          <el-button size="small">Đơn đã đóng gói</el-button>
        </el-badge>
      </div>
      <div class="col-md-2" @click="handleStatusOrder('shipping')">
        <el-badge :value="totalShipping" class="item-status-shipping">
          <el-button size="small">Đơn đang giao</el-button>
        </el-badge>
      </div>
      <div class="col-md-2" @click="handleStatusOrder('done')">
        <el-badge :value="totalDone" class="item-status-done">
          <el-button size="small">Đơn đã hoàn thành</el-button>
        </el-badge>
      </div>
      <div class="col-md-2" @click="handleStatusOrder('cancel')">
        <el-badge :value="totalCancel" class="item-status-cancel">
          <el-button size="small">Đơn đã hủy</el-button>
        </el-badge>
      </div>
    </div>
    <div class="container">
      <el-table
        id="table-data"
        ref="userAdminData"
        v-loading="loading"
        :data="cart"
        style="width: 100%"
      >
        <el-table-column label="Mã đơn hàng" width="300">
          <template slot-scope="scope">
            <span>{{ scope.row._id }}</span>
          </template>
        </el-table-column>
        <el-table-column
          v-if="statusOrder === 'new'"
          label="Chức năng"
          width="100"
        >
          <template slot-scope="scope">
            <i
              style="margin-right: 15px; font-size: 20px"
              class="el-icon-refresh icon-funtion"
              @click="confirmPopupStatusOrder(statusOrder, scope.row._id)"
            ></i>
          </template>
        </el-table-column>
        <el-table-column
          v-if="statusOrder === 'packed'"
          label="Chức năng"
          width="100"
        >
          <template slot-scope="scope">
            <i
              style="margin-right: 15px; font-size: 20px"
              class="el-icon-refresh icon-funtion"
              @click="confirmPopupStatusOrder(statusOrder, scope.row._id)"
            ></i>
          </template>
        </el-table-column>
        <el-table-column
          v-if="statusOrder === 'shipping'"
          label="Chức năng"
          width="100"
        >
          <template slot-scope="scope">
            <i
              style="margin-right: 15px; font-size: 20px"
              class="el-icon-refresh icon-funtion"
              @click="confirmPopupStatusOrder(statusOrder, scope.row._id)"
            ></i>
          </template>
        </el-table-column>
        <el-table-column label="Trạng thái" width="200">
          <template slot-scope="scope">
            <span v-if="scope.row.status === 1">Đơn hàng mới</span>
            <span v-if="scope.row.status === 2">Đơn đã đóng gói</span>
            <span v-if="scope.row.status === 3">Đơn đang giao</span>
            <span v-if="scope.row.status === 4">Đơn đã hoàn thành</span>
            <span v-if="scope.row.status === 5">Đơn đã hủy</span>
          </template>
        </el-table-column>
        <el-table-column label="Trạng thái thanh toán" width="200">
          <template slot-scope="scope">
            <span v-if="scope.row.statusPayment === false"
              >Chưa thanh toán</span
            >
            <span v-if="scope.row.statusPayment === true">Đã thanh toán</span>
          </template>
        </el-table-column>
        <el-table-column label="Tổng giá" width="200">
          <template slot-scope="scope">
            <span>{{ scope.row.totalPrice }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Thời gian tạo">
          <template slot-scope="scope">
            <span>{{
              moment(scope.row.createdAt).format('HH:mm - DD-MM-YYYY')
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
import _ from 'lodash'
import { apiServices } from '~/store/apiService'

Vue.prototype.moment = moment
export default {
  layout: 'DefaultLayout',
  data() {
    return {
      search: '',
      currentPage: 1,
      cart: [],
      total: 0,
      totalNew: 0,
      totalPacked: 0,
      totalShipping: 0,
      totalDone: 0,
      totalCancel: 0,
      statusOrder: 'all',
      loading: false,
    }
  },
  async created() {
    const _this = this
    await _this.getData()
    await _this.setUpTotalStatus()
  },
  mounted() {},
  methods: {
    async setUpTotalStatus() {
      const _this = this
      for (let i = 0; i < 5; i++) {
        const params = {
          status: i + 1,
        }
        const res = await apiServices.getOrderByStatus(params)
        if (i === 0) {
          _this.totalNew = res?.data?.total
        } else if (i === 1) {
          _this.totalPacked = res?.data?.total
        } else if (i === 2) {
          _this.totalShipping = res?.data?.total
        } else if (i === 3) {
          _this.totalDone = res?.data?.total
        } else if (i === 4) {
          _this.totalCancel = res?.data?.total
        }
      }
    },
    async getData() {
      const _this = this
      _this.loading = true
      await apiServices
        .getAllOrder()
        .then((res) => {
          if (res) {
            _this.cart = res?.data?.data
            _this.total = res?.data?.total
            _this.loading = false
          }
        })
        .catch((e) => {
          _this.loading = false
        })
    },

    async getDataByStatus(status) {
      const _this = this
      _this.loading = true
      const params = {
        status: status,
      }
      await apiServices
        .getOrderByStatus(params)
        .then((res) => {
          if (res) {
            _this.cart = res?.data?.data
            _this.total = res?.data?.total
            _this.loading = false
          }
        })
        .catch((e) => {
          _this.loading = false
        })
    },

    async handleStatusOrder(type) {
      const _this = this
      _this.statusOrder = type
      switch (type) {
        case 'new':
          await _this.getDataByStatus(1)
          break
        case 'packed':
          await _this.getDataByStatus(2)
          break
        case 'shipping':
          await _this.getDataByStatus(3)
          break
        case 'done':
          await _this.getDataByStatus(4)
          break
        case 'cancel':
          await _this.getDataByStatus(5)
          break
      }
    },

    handleSizeChange(val) {
      const _this = this
      _this.size = val
    },

    handleCurrentChange(val) {
      const _this = this
      _this.from = (_this.currentPage - 1) * _this.size
    },

    filter() {
      const _this = this
      _this.cart = _.filter(_this.cart, (e) => {
        if (
          e._id != null &&
          e._id.toUpperCase().includes(_this.search.toUpperCase())
        ) {
          return e
        }
      })

      if (_this.search.toUpperCase() === '') {
        _this.getData()
      }
    },

    confirmPopupStatusOrder(statusOrder, idOrder) {
      const _this = this
      switch (statusOrder) {
        case 'new': {
          const params = {
            _id: idOrder,
            status: 2,
          }
          _this
            .$confirm(
              'Bạn muốn xác nhận đơn mới, và chuyển qua đóng gói',
              'Warning',
              {
                confirmButtonText: 'Xác nhận',
                cancelButtonText: 'Hủy bỏ',
                type: 'warning',
              }
            )
            .then(async () => {
              await apiServices
                .updateStatusOrder(params)
                .then((res) => {
                  _this.$message({
                    showClose: true,
                    message: 'Chuyển trạng thái đơn hàng thành công',
                    type: 'success',
                  })
                  setTimeout(() => {
                    _this.getDataByStatus(1)
                    _this.setUpTotalStatus()
                  }, 500)
                })
                .catch((e) => {
                  _this.$message({
                    showClose: true,
                    message: 'Chuyển trạng thái đơn hàng thất bại',
                    type: 'erroe',
                  })
                })
            })
          break
        }
        case 'packed': {
          const params = {
            _id: idOrder,
            status: 3,
          }
          _this
            .$confirm(
              'Bạn muốn xác nhận đã đóng gói, và chuyển qua giao hàng',
              'Warning',
              {
                confirmButtonText: 'Xác nhận',
                cancelButtonText: 'Hủy bỏ',
                type: 'warning',
              }
            )
            .then(async () => {
              await apiServices
                .updateStatusOrder(params)
                .then((res) => {
                  _this.$message({
                    showClose: true,
                    message: 'Chuyển trạng thái đơn hàng thành công',
                    type: 'success',
                  })
                  setTimeout(() => {
                    _this.getDataByStatus(2)
                    _this.setUpTotalStatus()
                  }, 500)
                })
                .catch((e) => {
                  _this.$message({
                    showClose: true,
                    message: 'Chuyển trạng thái đơn hàng thất bại',
                    type: 'erroe',
                  })
                })
            })
          break
        }
        case 'shipping': {
          const params = {
            _id: idOrder,
            status: 4,
          }
          _this
            .$confirm(
              'Bạn muốn xác nhận đã giao hàng thành công, và chuyển qua hoàn thành đơn',
              'Warning',
              {
                confirmButtonText: 'Xác nhận',
                cancelButtonText: 'Hủy bỏ',
                type: 'warning',
              }
            )
            .then(async () => {
              await apiServices
                .updateStatusOrder(params)
                .then((res) => {
                  _this.$message({
                    showClose: true,
                    message: 'Chuyển trạng thái đơn hàng thành công',
                    type: 'success',
                  })
                  setTimeout(() => {
                    _this.getDataByStatus(3)
                    _this.setUpTotalStatus()
                  }, 500)
                })
                .catch((e) => {
                  _this.$message({
                    showClose: true,
                    message: 'Chuyển trạng thái đơn hàng thất bại',
                    type: 'erroe',
                  })
                })
            })
          break
        }
        default: {
          break
        }
      }
    },
    handleViewStatistic(){
      const _this = this
      _this.$router.push('/cart/statistic')
    }
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

.el-badge {
  margin-right: 30px !important;
}
.el-badge .el-button {
  width: 150px !important;
  height: 50px !important;
  border: none !important;
  outline: none !important;
}

.item-status-new .el-button {
  background-color: #33cc00 !important;
  color: #fff !important;
}

.item-status-new .el-button:hover {
  background-color: #248e01 !important;
  color: #fff !important;
}

.item-status-packed .el-button {
  background-color: #dddd00 !important;
  color: #fff !important;
}

.item-status-packed .el-button:hover {
  background-color: #acac00 !important;
  color: #fff !important;
}

.item-status-shipping .el-button {
  background-color: #ff6600 !important;
  color: #fff !important;
}

.item-status-shipping .el-button:hover {
  background-color: #c95101 !important;
  color: #fff !important;
}

.item-status-done .el-button {
  background-color: #3366ff !important;
  color: #fff !important;
}

.item-status-done .el-button:hover {
  background-color: #1240ca !important;
  color: #fff !important;
}

.item-status-cancel .el-button {
  background-color: #ff0033 !important;
  color: #fff !important;
}

.item-status-cancel .el-button:hover {
  background-color: #c80229 !important;
  color: #fff !important;
}
</style>
