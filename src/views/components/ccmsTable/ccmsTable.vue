<template>
  <div class="ccms-table" v-loading="loading">
    <el-table
      :data="tableData"
      :width="width"
      :height="height"
      :max-height="maxHeight"
      :fit="fit"
      :stripe="stripe"
      :border="border"
      :rowKey="rowKey"
      :context="context"
      :showHeader="showHeader"
      :showSummary="showSummary"
      :sumText="sumText"
      :summaryMethod="summaryMethod"
      :rowClassName="rowClassName"
      :rowStyle="rowStyle"
      :highlightCurrentRow="highlightCurrentRow"
      :currentRowKey="currentRowKey"
      :emptyText="emptyText"
      :expandRowKeys="expandRowKeys"
      :defaultExpandAll="defaultExpandAll"
      :defaultSort="defaultSort"
      :tooltipEffect="tooltipEffect"
      @select="select"
      @select-all="selectAll"
      @selection-change="selectionChange"
      @cell-mouse-enter="cellMouseEnter"
      @cell-click="cellClick"
      @cell-dblclick="cellDblClick"
      @row-click="rowClick"
      @row-contextmenu="rowContextmenu"
      @row-dblclick="rowDblClick"
      @header-click="headerClick"
      @sort-change="sortChange"
      @filter-change="filterChange"
      @current-change="currentChange"
      @header-dragend="headerDragend"
      @expand="expand"
      ref="tables">
      <template v-for="(column,index) in columnPropArr">
        <el-table-column
          v-if="column.tplName"
          :type="column.type"
          :label="column.label"
          :className="column.className"
          :labelClassName="column.labelClassName"
          :property="column.property"
          :prop="column.prop"
          :width="column.width"
          :minWidth="column.minWidth"
          :renderHeader="column.renderHeader"
          :sortable="column.sortable"
          :sortMethod="column.sortMethod"
          :resizable="column.resizable"
          :context="column.context"
          :columnKey="column.columnKey"
          :align="column.align"
          :headerAlign="column.headerAlign"
          :showTooltipWhenOverflow="column.showTooltipWhenOverflow"
          :showOverflowTooltip="column.showOverflowTooltip"
          :fixed="column.fixed"
          :formatter="column.formatter"
          :selectable="column.selectable"
          :reserveSelection="column.reserveSelection"
          :filterMethod="column.filterMethod"
          :filteredValue="column.filteredValue"
          :filters="column.filters"
          :filterPlacement="column.filterPlacement"
          :filterMultiple="column.filterMultiple"
        >
          <template slot-scope="scope">
            <components :is="column.tplName" v-on="$listeners"  :scope="scope" :customObj="Object.assign({},customObj, column.obj)"></components>
          </template>
        </el-table-column>
        <el-table-column
          v-else
          :type="column.type"
          :label="column.label"
          :className="column.className"
          :labelClassName="column.labelClassName"
          :property="column.property"
          :prop="column.prop"
          :width="column.width"
          :minWidth="column.minWidth"
          :renderHeader="column.renderHeader"
          :sortable="column.sortable"
          :sortMethod="column.sortMethod"
          :resizable="column.resizable"
          :context="column.context"
          :columnKey="column.columnKey"
          :align="column.align"
          :headerAlign="column.headerAlign"
          :showTooltipWhenOverflow="column.showTooltipWhenOverflow"
          :showOverflowTooltip="column.showOverflowTooltip"
          :fixed="column.fixed"
          :formatter="column.formatter"
          :selectable="column.selectable"
          :reserveSelection="column.reserveSelection"
          :filterMethod="column.filterMethod"
          :filteredValue="column.filteredValue"
          :filters="column.filters"
          :filterPlacement="column.filterPlacement"
          :filterMultiple="column.filterMultiple"
        ></el-table-column>
      </template>
    </el-table>
    <el-pagination
      align="center"
      :pageSize="tablePageSize"
      :small="small"
      :total="tableTotal"
      :currentPage="tableCurrentPage"
      :layout="layout"
      :pageSizes="tablePageSizes"
      @size-change="sizeChange"
      @current-change="paginationCurrentChange"
      ref="paginaton"></el-pagination>
  </div>
</template>
<script>
  import Tool from '../util/tool'
  const columnObj = {
    type: 'default',
    label: '',
    className: '',
    labelClassName: '',
    property: '',
    prop: '',
    width: {},
    minWidth: {},
    renderHeader: function () {},
    sortable: false,
    sortMethod: function () {},
    resizable: true,
    context: {},
    columnKey: '',
    align: '',
    headerAlign: '',
    showTooltipWhenOverflow: false,
    showOverflowTooltip: false,
    fixed: false,
    formatter: function () {},
    selectable: function () {},
    reserveSelection: false,
    filterMethod: function () {},
    filteredValue: [],
    filters: [],
    filterPlacement: '',
    filterMultiple: false,
    slotName: ''
  }
  import CcmsTableOperate from '../ccmsTableOperate'
  import Operate from './tpl/operate.vue'
  export default{
    name: 'CcmsTable',
    componentName: 'CcmsTable',
    components: {CcmsTableOperate, Operate},
    data () {
      return {
        loading: false,
        tableData: this.dataArr,
        tablePageSizes: this.pageSizes,
        tablePageNo: 1,
        // 查询条件
        condition: {},
        tablePageSize: 10,
        tableTotal: 0,
        tableCurrentPage: this.currentPage,
        table: this.$refs['table'],
        paginaton: this.$refs['paginaton'],
        // 行数统计
        rowCount: 0,
        // 自定义对象
        customObj: {
          index: ''
        },
        // api接口
        ajaxFun: function () {}
      }
    },
    watch: {
      dataArr: {
        deep: true,
        handle (val) {
          this.tableData = val
        }
      },
      pageSize (val) {
        this.tablePageSize = val
      },
      currentPage (val) {
        this.tableCurrentPage = val
      },
      total (val) {
        this.tableTotal = val
      },
      pageSizes: {
        deep: true,
        handel (val) {
          this.tablePageSizes = val
        }
      }
    },
    props: {
      // 控件参数
      api: [String],
      mock: [Boolean],
      // 排序规则
      sort: {
        type: Object,
        default: function () {
          return {}
        }
      },
      // 权限控制
      authPermission: {
        type: Function,
        default: function () {
          return function () {}
        }
      },
      // 表格内容
      dataArr: {
        type: Array,
        default: function () {
          return []
        }
      },
      // 表格列的字段属性
      columnPropArr: {
        type: Array,
        default: function () {
          return []
        }
      },
      width: [String, Number],
      height: [String, Array],
      maxHeight: [String, Number],
      fit: {
        type: Boolean,
        default: true
      },
      stripe: Boolean,
      border: Boolean,
      rowKey: [String, Function],
      context: {},
      showHeader: {
        type: Boolean,
        default: true
      },
      showSummary: Boolean,
      sumText: String,
      summaryMethod: Function,
      rowClassName: [String, Function],
      rowStyle: [Object, Function],
      highlightCurrentRow: Boolean,
      currentRowKey: [String, Number],
      emptyText: String,
      expandRowKeys: Array,
      defaultExpandAll: Boolean,
      defaultSort: Object,
      tooltipEffect: String,
      // 分页参数
      pageSize: {
        type: Number,
        default: 10
      },
      small: Boolean,
      total: Number,
      pageCount: Number,
      currentPage: {
        type: Number,
        default: 1
      },
      layout: {
        default: 'total, sizes, prev, pager, next, jumper'
      },
      pageSizes: {
        type: Array,
        default () {
          return [10, 15, 20]
        }
      },
      name: {
        type: String,
        default: ''
      }
    },
    mounted () {
      this.columnPropArr.map((item, index) => {
        Object.assign({}, columnObj, item)
        //   this.columnPropArr[index] = Object.assign({}, columnObj, item)
      })
      this.$on('tabOperate', this.handleTabOperate)
    },
    methods: {
      // 右边的按钮操作
      handleTabOperate (evtObj) {
        this.$emit(evtObj.evtName, evtObj.data)
      },
      // 发送ajax请求数据
      queryData ({ condition = {}, callback = function () {}, ajaxFun = '' } = {}) {
        this.condition = condition
        this.ajaxFun = typeof ajaxFun === 'function' ? ajaxFun : this.ajaxFun
        let data = {
          condition: condition,
          page: {
            pageSize: this.tablePageSize,
            totalSize: this.tableTotal,
            currentPageNo: this.tablePageNo
          },
          sort: this.sort
        }
        this.loading = true
        this.ajaxFun(data).then(val => {
          this.loading = false
          let arr = Tool.NotArrayReturnEmptyArray(val.result).map((item, index) => {
            item.index = index
            return item
          })
          let authArr = this.authPermission(arr)
          if (authArr instanceof Array) {
            this.tableData = authArr
          } else {
            this.tableData = arr
          }
          this.tableCurrentPage = val.currentPageNo
          this.tableTotal = val.totalSize
          callback()
        })
      },
      select (selection, row) {
        this.$emit('select', selection, row)
      },
      selectAll (selection) {
        this.$emit('select-all', selection)
      },
      selectionChange (selection) {
        this.$emit('selection-change', selection)
      },
      cellMouseEnter (row, column, cell, event) {
        this.$emit('cell-mouse-enter', row, column, cell, event)
      },
      cellClick (row, column, cell, event) {
        this.$emit('cell-click', row, column, cell, event)
      },
      cellDblClick (row, column, cell, event) {
        this.$emit('cell-dblclick', row, column, cell, event)
      },
      rowClick (row, event, column) {
        this.$emit('row-click', row, event, column)
      },
      rowContextmenu (row, event) {
        this.$emit('row-contextmenu', row, event)
      },
      rowDblClick (row, event) {
        this.$emit('row-dblclick', row, event)
      },
      headerClick (column, event) {
        this.$emit('header-click', column, event)
      },
      sortChange ({column, prop, order}) {
        this.$emit('sort-change', {column, prop, order})
      },
      filterChange (filters) {
        this.$emit('filter-change', filters)
      },
      currentChange (currentRow, oldCurrentRow) {
        this.$emit('current-change', currentRow, oldCurrentRow)
      },
      headerDragend (newWidth, oldWidth, column, event) {
        this.$emit('header-dragend', newWidth, oldWidth, column, event)
      },
      expand (row, expanded) {
        this.$emit('expand', row, expanded)
      },
      // 分页控件事件
      sizeChange (size) {
        this.tablePageSize = size
        this.queryData({condition: this.condition})
        this.$emit('size-change', size)
      },
      paginationCurrentChange (currentPage) {
        this.tablePageNo = currentPage
        this.customObj.index = ''
        this.queryData({condition: this.condition})
        this.$emit('pagination-current-change', currentPage)
      }
    }
  }
</script>
