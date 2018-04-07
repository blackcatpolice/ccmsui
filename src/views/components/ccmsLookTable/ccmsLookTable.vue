<template>
  <div class="ccms-table-detail">
  <div class="look-table" v-if="pattern === 'standard'">
    <table cellpadding="0" cellspacing="0">
      <tr v-for="(row, index) in workTableList" :key="index">
        <td  v-for="(col, index) in row" :key="index" :style="col.style" :class="[col.class]" :rowspan="col.rowspan" :colspan="col.colspan" v-html="col.content"></td>
      </tr>
    </table>
    <div class="msg" v-show="msg && !workTableList.length">{{msg}}</div>
  </div>
    <div class="table-wrap" v-if="pattern === 'detail'">
      <table class="look-table" bordercolor="#ccc" width="100%" border="1" cellspacing="0" cellpadding="0">
        <tr v-for="(row,index) in workTableList" :key="index">
          <template v-for="(col, index) in row">
          <td  class="kbgColor">{{col['label']}}</td>
          <td  :colspan="col.colspan" class="vbgColor">{{col['content']}}</td>
          </template>
        </tr>
      </table>
      <div class="msg" v-show="msg">{{msg}}</div>
    </div>
    <div class="table-wrap" v-if="pattern === 'form'">
      <table cellpadding="0" width="100%" cellspacing="0">
        <tr v-for="(row, index) in workTableList" :key="index">
          <td class="form-td-wrapper" v-for="(col, index) in row" :key="index">
              <div v-if="col.subLabel"  class="lable">
                <div v-html="col.label+' :'"></div>
                <div class="sub-label" v-html="col.subLabel"></div>
              </div>
            <div v-else class="lable" v-html="col.label+' :'"></div>
            <div class="content" v-html="col.content"></div>
          </td>
        </tr>
      </table>
      <div class="msg" v-show="msg">{{msg}}</div>
    </div>
  </div>
</template>
<script>
  import Tool from '../util/tool'
  export default{
    name: 'CcmsLookTable',
    data () {
      return {
        workTableList: this.formatterByPattern(this.tableList, this.column)
      }
    },
    props: {
      column: {
        type: Number,
        default: 2
      },
      pattern: [String],
      tableList: [Array],
      msg: [String]
    },
    watch: {
      tableList (val) {
        this.workTableList = this.formatterByPattern(val, this.column)
//        this.workTableList = Tool.turnArrToMoreArr(val, this.column)
      },
      column (val) {
        this.workTableList = this.formatterByPattern(this.tableList, val)
      }
    },
    methods: {
      // 格式化模式的数据
      formatterByPattern (list, column) {
        if (this.pattern === 'standard') {
          return this.formatterStandard(list, column)
        }
        if (this.pattern === 'detail') {
          return this.formatterDetail(Tool.turnArrToMoreArr(list, column), column)
        }
        if (this.pattern === 'form') {
          return Tool.turnArrToMoreArr(list, column)
        }
      },
      // 格式化detail模式
      formatterDetail (list, column) {
        let workList = []
        for (let i = 0; i < list.length; i++) {
          let row = list[i]
          let arr = []
          if (row.length < column) {
            for (let j = 0; j < row.length; j++) {
              row[j] = Tool.cloneObject(row[j])
              arr.push(row[j])
              if (j === row.length - 1) {
                row[j].colspan = column * 2 - row.length + 1
              }
            }
          } else {
            arr = row
          }
          workList.push(arr)
        }
        console.log(list, workList)
        return workList
      },
      // 格式化standard模式
      formatterStandard (list, column) {
        let workList = Tool.turnArrToMoreArr(list, column)
        let newList = []
        let overItemArr = []
        workList.forEach(itemArr => {
          let colspanNum = 0
          // 判断上个行有没有溢出 overItemArr 可能远大于 this.column 所以要放多次
          let arr = []
          while (overItemArr.length > 0) {
            let item = overItemArr.pop()
            arr.push(item)
            if (item.colspan) {
              colspanNum += parseInt(item.colspan)
            } else {
              colspanNum += 1
            }
            if (colspanNum >= column) {
              colspanNum = 0
              newList.push(arr)
              arr = []
            }
          }
          // 获取本次
          for (let i = 0; i < itemArr.length; i++) {
            let item = Tool.cloneObject(itemArr[i])
            arr.push(item)
            if (item.colspan) {
              colspanNum += parseInt(item.colspan)
            } else {
              colspanNum += 1
            }
            if (colspanNum >= column) {
              let startI = i + 1 === itemArr.length - 1 ? itemArr.length - 1 : i + 1
              overItemArr = itemArr.slice(startI, itemArr.length)
              newList.push(arr)
              arr = []
              break
            } else if (i === itemArr.length - 1) {
              newList.push(arr)
            }
            // 判断最后一个是不是需要合并单元格
            if (i === itemArr.length - 1 && itemArr.length < column) {
              item.colspan = (column - itemArr.length) + 1
            }
          }
        })
        return newList
      }
    }
  }
</script>
