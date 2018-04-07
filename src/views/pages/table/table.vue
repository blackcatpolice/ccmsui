<template>
  <div>
    <div>表单的基本form</div>
    <ccms-table :dataArr="dataArr" :columnPropArr="columnPropArr"></ccms-table>
    <el-collapse>
      <el-collapse-item title="显示代码">
    <pre>
      <code>
        {{code}}
        {{script}}
      </code>
    </pre>
      </el-collapse-item>
    </el-collapse>
    <div>从后台请求数据</div>
    <ccms-table
      @btnClick="btnClick"
      @clickResetPwd="clickIconBtn"
      @clickRecover="clickIconBtn"
      @clickParent="clickIconBtn"
      @clickLook="clickIconBtn"
      @clickEdit="clickIconBtn"
      @clickDel="clickIconBtn"
      @clickExchange="clickIconBtn"
      @clickIntoSubSys="clickIconBtn"
      @clickUnLockUser="clickIconBtn"
      ref="ccms-table"
      :authPermission="authPermission"
      :columnPropArr="columnPropArr"></ccms-table>
    <el-button @click="getData">点击请求数据</el-button>
    <el-collapse>
      <el-collapse-item title="显示代码">
    <pre>
      <code>
        {{code2}}
        {{script2}}
      </code>
    </pre>
      </el-collapse-item>
    </el-collapse>
    <div>table attribute</div>
    <ccms-table :dataArr="tableData" :columnPropArr="tableColumnPropArr"></ccms-table>
    <div>方法(通过ref调用) Events(@evt调用)</div>
    <ccms-table :dataArr="tableFunData" :columnPropArr="tableColumnPropArr"></ccms-table>
  </div>

</template>
<script>
  export default{
    data () {
      return {
        tableData: [
          {prop: 'dataArr', desc: '列表的data数据', type: 'Array'},
          {prop: 'columnPropArr', desc: '对应饿了么列的值【[{},{}]】', type: 'Array'},
          {prop: 'authPermission', desc: '列表的权限控制【(dataArr) dataArr是这次请求返回的所有后台列表数据 这个函数必须返回一个数组】', type: 'Function'},
          {prop: 'tplName', desc: '列为【label===操作】 ', type: 'String', hasSelect: 'Operate'},
          {prop: 'obj', desc: '列为【label===操作】 ', type: 'Object'},
          {prop: 'obj.type', desc: '列为【label===操作】 按钮类型', type: 'String', hasSelect: 'text-btn/icon-btn'},
          {prop: 'obj.btnList', desc: '列为【label===操作】 按钮类型为text-btn', type: 'Array'},
          {prop: 'name', desc: '按钮的文本 列为【label===操作】 按钮类型为text-btn obj.btnList中的json对象 btnList: [{name: 编辑}]', type: 'String'},
          {prop: 'flagId', desc: '按钮的显示隐藏控制的唯一id 列为【label===操作】 按钮类型为text-btn obj.btnList中的json对象 btnList: [{name: 编辑,flagId: editFlag}]', type: 'String'},
          {prop: 'icon-btn', desc: '列为【label===操作】 obj.type===icon-btn 显示的是图片按钮', type: 'String', hasSelect: 'parentFlag【上级主管】/recoverFlag【恢复】/lookFlag【查看】/editFlag【编辑】/delFlag【删除】/resetPwdFlag【重置密码】/unLockUserFlag【解锁用户】/exchangeFlag【调岗】/intoSubSysFlag【进入子系统】'}
        ],
        tableFunData: [
          {prop: 'queryData', desc: '方法对象 没有返回 ({condition: {}, ajaxFun: function(){}, callback}) condition要执行的查询条件 ajaxFun要发送的api callback 回调函数'},
          {prop: 'clickResetPwd', desc: 'event对象 obj.type === icon-btn 点击重置密码的按钮 返回这一行数据', type: 'Function'},
          {prop: 'clickRecover', desc: 'event对象 obj.type === icon-btn点击恢复按钮 返回这一行数据', type: 'Function'},
          {prop: 'clickParent', desc: 'event对象 obj.type === icon-btn点击上级主管按钮 返回这一行数据', type: 'Function'},
          {prop: 'clickLook', desc: 'event对象 obj.type === icon-btn点击查看按钮 返回这一行数据', type: 'Function'},
          {prop: 'clickEdit', desc: 'event对象 obj.type === icon-btn点击编辑按钮 返回这一行数据', type: 'Function'},
          {prop: 'clickDel', desc: 'event对象 obj.type === icon-btn点击删除按钮 返回这一行数据', type: 'Function'},
          {prop: 'clickExchange', desc: 'event对象 obj.type === icon-btn点击调岗按钮 返回这一行数据', type: 'Function'},
          {prop: 'clickIntoSubSys', desc: 'event对象 obj.type === icon-btn点击进入子系统按钮 返回这一行数据', type: 'Function'},
          {prop: 'clickUnLockUser', desc: 'event对象 obj.type === icon-btn点击解锁按钮 返回这一行数据', type: 'Function'},
          {prop: 'clickUnLockUser', desc: 'event对象 obj.type === icon-btn点击解锁按钮 返回这一行数据', type: 'Function'},
          {prop: 'btnClick', desc: 'event对象 obj.type === text-btn点击解锁按钮 返回{row:row,btnItem}', type: 'Function'}
        ],
        tableColumnPropArr: [{prop: 'prop', label: '参数'},
          {prop: 'desc', label: '说明'},
          {prop: 'type', label: '类型'},
          {prop: 'hasSelect', label: '可选值'},
          {prop: 'default', label: '默认'}],
        code: `<ccms-table :dataArr=dataArr :columnPropArr=columnPropArr></ccms-table>`,
        script: `
        export default{
          data () {
            return {
              dataArr: [{a: 1, b: 2, c: 3}, {a: 1, b: 2, c: 3}, {a: 1, b: 2, c: 3}],
              columnPropArr: [{prop: 'a', label: 'a'}, {prop: 'b', label: 'b'}, {prop: 'c', label: 'c'}]
            }
          }
        }`,
        dataArr: [{a: 1, b: 2, c: 3}, {a: 1, b: 2, c: 3}, {a: 1, b: 2, c: 3}],
        columnPropArr: [{prop: 'a', label: 'a'}, {prop: 'b', label: 'b'}, {prop: 'c', label: 'c'}, {label: '操作',
          tplName: 'Operate',
          obj: {
            type: 'text-btn',
            btnList: [
              {name: '按钮1', flagId: '1Flag'},
              {name: '按钮2', flagId: '2Flag'},
              {name: '按钮3', flagId: '3Flag'},
              {name: '按钮4', flagId: '4Flag'},
              {name: '按钮5', flagId: '5Flag'}]
          }},
          {label: '操作',
            tplName: 'Operate',
            obj: {
              type: 'icon-btn'
            }}],
        code2: `<ccms-table ref=ccms-table :authPermission=authPermission :columnPropArr=columnPropArr></ccms-table>`,
        script2: `
        data () {
          return {
          columnPropArr: [{prop: 'a', label: 'a'}, {prop: 'b', label: 'b'}, {prop: 'c', label: 'c'}, {label: '操作',
          tplName: 'Operate',
          obj: {
            type: 'text-btn',
            btnList: [
              {name: '按钮1', flagId: '1Flag'},
              {name: '按钮2', flagId: '2Flag'},
              {name: '按钮3', flagId: '3Flag'},
              {name: '按钮4', flagId: '4Flag'},
              {name: '按钮5', flagId: '5Flag'}]
          }}]
          }
        },
        methods: {
                  getData () {
                    this.$refs['ccms-table'].queryData({condition: {},
                      ajaxFun: function () {
                        let result = [{a: 1, b: 1, c: 1}]
                        let currentPageNo = '1'
                        let totalSize = '100'
                        return new Promise(resolve => {
                          setTimeout(() => {
                            resolve({result, currentPageNo, totalSize})
                          }, 500)
                        })
                      }})
                  }
                       authPermission (dataArr) {
                        return dataArr.map(item => {
                          item['1Flag'] = true
                          item['2Flag'] = true
                          item['3Flag'] = true
                          item['4Flag'] = true
                          item['5Flag'] = true
                          return item
                        })
                      }
    }`
      }
    },
    methods: {
      authPermission (dataArr) {
        return dataArr.map(item => {
          item['1Flag'] = true
          item['2Flag'] = true
          item['3Flag'] = true
          item['4Flag'] = true
          item['5Flag'] = true
          item.parentFlag = true
          item.recoverFlag = true
          item.lookFlag = true
          item.editFlag = true
          item.delFlag = true
          item.resetPwdFlag = true
          item.unLockUserFlag = true
          item.exchangeFlag = true
          item.intoSubSysFlag = true
          return item
        })
      },
      getData () {
        this.$refs['ccms-table'].queryData({condition: {},
          ajaxFun: function () {
            let result = [{a: 1, b: 1, c: 1}]
            let currentPageNo = 1
            let totalSize = 100
            return new Promise(resolve => {
              setTimeout(() => {
                resolve({result, currentPageNo, totalSize})
              }, 500)
            })
          }})
      },
      clickIconBtn (data) {},
      btnClick (data) {}
    }
  }
</script>
<style>
  .el-collapse-item__header{
    text-align: center;
  }
</style>
