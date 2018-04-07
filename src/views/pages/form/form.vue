<template>
  <div>
    <div>表单组件 包含表单验证 权限控制</div>
    <ccms-form ref="ccmsForm" :formList="formList"></ccms-form>
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
    <div>form attribute</div>
    <ccms-table :dataArr="formTableData" :columnPropArr="columnPropArr"></ccms-table>
    <div>item attribute</div>
    <ccms-table :dataArr="tableData" :columnPropArr="columnPropArr"></ccms-table>
    <div>方法(通过ref调用) Events(@evt调用)</div>
    <ccms-table :dataArr="formFunData" :columnPropArr="columnPropArr"></ccms-table>
  </div>
</template>
<script>
  export default{
    data () {
      return {
        code: `<ccms-form ref="ccmsForm" :formList="formList"></ccms-form>`,
        script: `export default {
        data () {
          return {
        formList: [
          {
            itemType: 'select',
            label: '用户来源',
            prop: 'vfla',
            model: '',
            options: [{label: '虚拟用户', value: '1'}, {label: 'EHR用户', value: '0'}],
            show: true,
            disabled: false,
            dataAuth: function () {
            },
            change: function (val) {
            }
          },
          {
            itemType: 'input',
            label: 'ehr号',
            prop: 'employeeehrnum',
            model: '',
            dataAuth: function () {
            },
            placeholder: '请输入ehr号',
            disabled: false,
            show: true
          },
          {
            itemType: 'radioGroup',
            label: '性别',
            prop: 'gender',
            model: '',
            disabled: false,
            show: true,
            radios: [{label: '1', value: '男'}, {label: '0', value: '女'}]
          },
          {
            itemType: 'dialogTree',
            label: '机构树',
            prop: 'orgId',
            model: '',
            treeStyle: {height: '60vh', overflow: 'auto'},
            data: [],
            title: '机构树',
            show: true,
            rules: [
              {required: true, message: '请填写机构树', trigger: 'change'}
            ],
            load: function (node, resolve) {
            },
            clickConfrim: function (data) {
            }
          },
          {
            itemType: 'pullTree',
            label: '部门',
            prop: 'dept',
            model: '',
            rules: [{required: true, message: '请填写部门', trigger: 'change'}],
            data: [],
            show: true,
            nodeClick: function (data) {
            },
            dropStyle: {height: '30vh', overflow: 'auto'},
            load: function (node, resolve) {
            }
          },
          {
            itemType: 'pullTree',
            label: '钻石团队',
            prop: 'diamondTeamno',
            model: '',
            data: [],
            show: true,
            defaultProps: {
              children: 'children',
              label: 'treeName',
              icon: 'icon',
              disabled: 'disabled'
            }
          }
        ]
        }
        }
        }`,
        formList: [
          {
            itemType: 'select',
            label: '用户来源',
            prop: 'vfla',
            model: '',
            options: [{label: '虚拟用户', value: '1'}, {label: 'EHR用户', value: '0'}],
            show: true,
            disabled: false,
            dataAuth: function () {
            },
            change: function (val) {
            }
          },
          {
            itemType: 'input',
            label: 'ehr号',
            prop: 'employeeehrnum',
            model: '',
            dataAuth: function () {
            },
            placeholder: '请输入ehr号',
            disabled: false,
            show: true
          },
          {
            itemType: 'input',
            label: '虚拟用户名',
            prop: 'usrUid',
            model: '',
            dataAuth: function () {
            },
            placeholder: '请输入虚拟用户名',
            disabled: false,
            show: true
          },
          {
            itemType: 'radioGroup',
            label: '性别',
            prop: 'gender',
            model: '',
            disabled: false,
            show: true,
            radios: [{label: '1', value: '男'}, {label: '0', value: '女'}]
          },
          {
            itemType: 'dialogTree',
            label: '机构树',
            prop: 'orgId',
            model: '',
            treeStyle: {height: '60vh', overflow: 'auto'},
            data: [],
            title: '机构树',
            show: true,
            rules: [
              {required: true, message: '请填写机构树', trigger: 'change'}
            ],
            load: function (node, resolve) {
            },
            clickConfrim: function (data) {
            }
          },
          {
            itemType: 'input',
            label: '用户名',
            prop: 'usrName',
            model: '',
            placeholder: '请输入用户名',
            disabled: false,
            show: true
          },
          {itemType: 'input', label: '区域', prop: 'areaname', model: '', disabled: true, show: true},
          {
            itemType: 'pullTree',
            label: '部门',
            prop: 'dept',
            model: '',
            rules: [{required: true, message: '请填写部门', trigger: 'change'}],
            data: [],
            show: true,
            nodeClick: function (data) {
            },
            dropStyle: {height: '30vh', overflow: 'auto'},
            load: function (node, resolve) {
            }
          },
          {
            itemType: 'pullTree',
            label: '团队',
            prop: 'teamno',
            model: '',
            data: [],
            show: true,
            dropStyle: {height: '30vh', overflow: 'auto'},
            nodeClick: function (data) {
            },
            load: function (node, resolve) {
            }
          },
          {
            itemType: 'pullTree',
            label: '钻石团队',
            prop: 'diamondTeamno',
            model: '',
            data: [],
            show: true,
            defaultProps: {
              children: 'children',
              label: 'treeName',
              icon: 'icon',
              disabled: 'disabled'
            }
          },
          {
            itemType: 'select',
            label: '绑定ehr用户',
            prop: 'bindEhr',
            model: '',
            options: [],
            show: true,
            filterable: true,
            remote: true,
            dataAuth: function () {
            },
            remoteMethod: function (data) {
            }
          }
        ],
        columnPropArr: [
          {prop: 'prop', label: '参数'},
          {prop: 'desc', label: '说明'},
          {prop: 'type', label: '类型'},
          {prop: 'hasSelect', label: '可选值'},
          {prop: 'default', label: '默认'}
        ],
        formFunData: [{prop: 'clickSubmit', desc: 'event对象 整个表单提交通过验证后的数据 form对象', type: 'Object', hasSelect: '', default: ''},
          {prop: 'getFormModel', desc: '方法对象 返回 form对象', type: 'Object', hasSelect: '', default: ''},
          {prop: 'setProperByPro', desc: '方法对象 设置item上某个具体属性 (prop【对应每一项的prop】, tarPro【json对象 {model: 2, options: []}】)', type: 'Object', hasSelect: '', default: ''},
          {prop: 'getProperByPro', desc: '方法对象 根据prop获取prop对应的整个json (prop【对应每一项的prop】)', type: 'Object', hasSelect: '', default: ''}],
        formTableData: [{prop: 'formList', desc: '整个表单的json对象', type: 'Array', hasSelect: '', default: ''},
          {prop: 'needBtn', desc: '表单里自带的保存按钮', type: 'Boolean', hasSelect: 'true/false', default: 'true'}],
        tableData: [
          {prop: 'itemType', desc: '指定表单中交互类型的哪一种', type: 'String', hasSelect: 'input/autocomplete/select/pullTree/dialogTree/radioGroup/checkboxGroup', default: '-'},
          {prop: 'prop', desc: '表单字段不可重复', type: 'String', hasSelect: '-', default: '-'},
          {prop: 'model', desc: '双向绑定的字段值', type: 'String/Number', hasSelect: '-', default: ''},
          {prop: 'rules', desc: '这一项的验证规则(和饿了么对应)', type: 'Array', hasSelect: '-', default: '-'},
          {prop: 'show', desc: '是否展示', type: 'Boolean', hasSelect: 'true/false', default: 'true'},
          {prop: 'disabled', desc: '是否可以编辑', type: 'Boolean', hasSelect: 'true/false', default: 'false'},
          {prop: 'options', desc: 'itemType是select时的下拉列表', type: 'Array', hasSelect: '-', default: '-'},
          {prop: 'dataAuth', desc: '做权限控制的回调函数 select下拉列表选择不同的项会导致其它交互组件的显示隐藏或者不能编辑', type: 'Function', hasSelect: '-', default: '-'},
          {prop: 'change', desc: '和饿了么一样', type: 'Function', hasSelect: '-', default: '-'},
          {prop: 'placeholder', desc: '和饿了么一样', type: 'String', hasSelect: '-', default: '-'},
          {prop: 'treeStyle', desc: 'itemType是dialogTree时vue style样式的写法', type: 'Object', hasSelect: '-', default: '-'},
          {prop: 'dropStyle', desc: 'itemType是pullTree时vue style样式的写法', type: 'Object', hasSelect: '-', default: '-'},
          {prop: 'load', desc: '饿了么树的load', type: 'Function', hasSelect: '-', default: '-'},
          {prop: 'defaultProps', desc: '饿了么树的props', type: 'Object', hasSelect: '-', default: '-'},
          {prop: 'nodeClick', desc: 'itemType是pullTree时 饿了么树的node-click', type: 'Function', hasSelect: '-', default: '-'},
          {prop: 'clickConfrim', desc: 'itemType是dialogTree时 弹出框的确认按钮', type: 'Function', hasSelect: '-', default: '-'}
        ]
      }
    }
  }
</script>
<style>
  .el-collapse-item__header{
    text-align: center;
  }
</style>
