<template>
  <div>
    <div>基本的formItem</div>
    <el-form :model="form" ref="form" labelWidth="100px">
      <div style="width: 600px">
      <ccms-form-item :itemObj="form.name">
        <cc-input v-model="form.model.name"></cc-input>
      </ccms-form-item>
      </div>
      <div style="width: 600px">
      <ccms-form-item :itemObj="form.age">
        <cc-input v-model="form.model.age"></cc-input>
      </ccms-form-item>
      </div>
      <el-button @click="submit">提交表单</el-button>
    </el-form>
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
    <ccms-table :dataArr="tableData" :columnPropArr="columnPropArr"></ccms-table>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        columnPropArr: [{prop: 'prop', label: '参数'},
          {prop: 'desc', label: '说明'},
          {prop: 'type', label: '类型'},
          {prop: 'hasSelect', label: '可选值'},
          {prop: 'default', label: '默认'}],
        tableData: [{prop: 'itemObj', desc: '要传入的对象', type: 'Object'},
          {prop: 'itemObj.label', desc: 'label 文本', type: 'String'},
          {prop: 'itemObj.showFlag', desc: 'showFlag 是否显示', type: 'Boolean', hasSelect: 'true/false', default: 'true'},
          {prop: 'itemObj.prop', desc: 'prop 表单域 model字段【参照饿了么表单组件】', type: 'String', hasSelect: '-', default: '-'},
          {prop: 'itemObj.rules', desc: 'rules 表单域 验证规则【参照饿了么表单rules】', type: 'Array', hasSelect: '-', default: '-'}],
        code: `<el-form :model="form" ref="form" labelWidth="100px">
      <div style="width: 600px">
      <ccms-form-item :itemObj="form.name">
        <cc-input v-model="form.model.name"></cc-input>
      </ccms-form-item>
      </div>
      <div style="width: 600px">
      <ccms-form-item :itemObj="form.age">
        <cc-input v-model="form.model.age"></cc-input>
      </ccms-form-item>
      </div>
      <el-button @click="submit">提交表单</el-button>
    </el-form>`,
        script: `export default {
    data () {
      return {
        form: {
          model: {
            name: '',
            age: ''
          },
          name: {
            showFlag: true,
            label: '姓名',
            prop: 'name',
            rules: [{required: true, message: '姓名不能为空', trigger: 'blur'}]
          },
          age: {
            label: '年龄',
            prop: 'age',
            rules: [{required: true, message: '年龄不能为空', trigger: 'blur'}]
          }
        }
      }
    },
    methods: {
      submit () {
        this.$refs['form'].validate(val => {
          if (val) {
            alert('提交成功')
          }
        })
      }
    }
  }`,
        form: {
          model: {
            name: '',
            age: ''
          },
          name: {
            showFlag: true,
            label: '姓名',
            prop: 'name',
            rules: [{required: true, message: '姓名不能为空', trigger: 'blur'}]
          },
          age: {
            label: '年龄',
            prop: 'age',
            rules: [{required: true, message: '年龄不能为空', trigger: 'blur'}]
          }
        }
      }
    },
    methods: {
      submit () {
        this.$refs['form'].validate(val => {
          if (val) {
            alert('提交成功')
          }
        })
      }
    }
  }
</script>
