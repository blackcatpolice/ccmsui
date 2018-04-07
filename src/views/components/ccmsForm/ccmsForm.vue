/**
 * Created by sch on 2017/11/14.
 */
<template>
  <div class="ccms-form">
  <el-form ref="form" :model="formModel" label-width="150px">
  <div class="row-item" v-for="(formItem, index) in formModel.formList" :key="index" v-show="formItem.show">
    <el-form-item :show-message="!formItem.hiddenMsg" :rules= "formItem.disabled?[]:formItem.rules" :label="formItem.label" :prop="'formList.' + index + '.model'" >
      <cc-input
        v-if="formItem.itemType === 'input'"
        :type="formItem.type"
        :maxlength="formItem.maxlength"
        :minlength="formItem.minlength"
        v-model.trim="formItem.model"
        :placeholader="formItem.placeholder"
        :disabled="formItem.disabled"
        :auto-complete="formItem.autoComplete"
        :max="formItem.max"
        :min="formItem.min"
        :step="formItem.step"
        :name="formItem.name"
        :resize="formItem.resize"
        :autofocus="formItem.autofocus"
        :form="formItem.form"
        :icon="formItem.icon"
        :rows="formItem.rows"
        :autosize="formItem.autosize"
        :size="formItem.size"
        :readonly="formItem.readonly"
        :on-icon-click="formItem.handleIconClick"
        @click="typeof formItem.click === 'function'?formItem.click($event):function() {}"
        @blur="typeof formItem.blur === 'function'?formItem.blur($event): function(){}"
        @focus="typeof formItem.focus === 'function'?formItem.focus($event): function(){}"
        @change="typeof formItem.change === 'function'?formItem.change($event): function(){}"></cc-input>
      <el-autocomplete
        v-if="formItem.itemType === 'autocomplete'"
        :placeholader="formItem.placeholder"
        :disabled="formItem.disabled"
        v-model.trim="formItem.model"
        :custom-item="formItem.customItem"
        :fetch-suggestions="formItem.fetchSuggestions"
        :popper-class="formItem.popperClass"
        :trigger-on-focus="formItem.triggerOnFocus"
        :on-icon-click="formItem.onIconClick"
        :icon="formItem.icon"
        @select="typeof formItem.select === 'function'?formItem.select($event): function(){}"
      ></el-autocomplete>
      <el-select
        :multiple ="formItem.multiple"
        :clearable= "formItem.clearable"
        :size="formItem.size"
        :multiple-limit="formItem.multipleLimit"
        :name="formItem.name"
        :placeholder="formItem.placeholder"
        :allow-create="formItem.allowCreate"
        :disabled="formItem.disabled"
        :filter-method="formItem.filterMethod"
        :filterable="formItem.filterable"
        :loading-text="formItem.loadingText"
        :no-data-text="formItem.noDataText"
        :popper-class="formItem.popperClass"
        :no-match-text="formItem.noMatchText"
        :loading="formItem.loading"
        :remote="formItem.remote"
        :remote-method="formItem.remoteMethod"
        v-model="formItem.model"
        v-if="formItem.itemType === 'select'"
        @change="selectChange.call(null,formItem.change,$event)"
        @visible-change="typeof formItem.visibleChange === 'function'?formItem.visibleChange($event): function(){}"
        @remove-tag="typeof formItem.removeTag === 'function'?formItem.removeTag($event): function(){}">
        <el-option
          v-for="item in formItem.options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
          :disabled="item.disabled"
        ></el-option>
      </el-select>
      <ccms-pull-tree
        v-if="formItem.itemType === 'pullTree'"
        v-model="formItem.model"
        :data="formItem.data"
        @close="typeof formItem.close === 'function'?formItem.close($event):function(){}"
        :dropStyle="formItem.dropStyle"
        :disabled="formItem.disabled"
        @node-click="typeof formItem.nodeClick === 'function'?formItem.nodeClick($event):function(){}"
        :placeholder="formItem.placehoder"
        :load="formItem.load"
        :lazy="true"
        :props="formItem.defaultProps"
        :defaultNode="formItem.defaultNode"
        :showClose="formItem.showClose"
        @visible-change="typeof formItem.visibleChange === 'function'?formItem.visibleChange($event):function() {}"
      ></ccms-pull-tree>
      <ccms-select-dialog-tree
        v-if="formItem.itemType === 'dialogTree'"
        :title="formItem.title"
        :highlightCurrent="true"
        :expand-on-click-node="false"
        :treeStyle= "formItem.treeStyle"
        :disabled="formItem.disabled"
        :load="formItem.load"
        :data="formItem.data"
        :placeholder="formItem.placehoder"
        :props="formItem.defaultProps"
        :lazy="true"
        v-model="formItem.model"
        @clickDialogConfrim="typeof formItem.clickConfrim === 'function'?formItem.clickConfrim.call(vm, $event):function(){}"
      ></ccms-select-dialog-tree>
      <el-radio-group
        v-if="formItem.itemType === 'radioGroup'"
        v-model="formItem.model"
        :disabled="formItem.disabled"
        :size="formItem.size"
        :fill="formItem.fill"
        :text-color="formItem.textColor"
        @change="typeof formItem.change === 'function'?formItem.change($event): function(){}"
      >
        <el-radio :disabled="radio.disabled" v-for="(radio, index) in formItem.radios" :key="index" :label="radio.label">{{radio.value}}</el-radio>
      </el-radio-group>
      <el-checkbox-group
        v-if="formItem.itemType === 'checkboxGroup'"
        v-model="formItem.model"
        :size="formItem.size"
        :fill="formItem.fill"
        :text-color="formItem.textColor"
        :min="formItem.min"
        :max="formItem.max"
        @change="typeof formItem.change === 'function'?formItem.change($event): function(){}"
      >
        <el-checkbox
          :true-label="checkbox.trueLabel"
          :false-label="checkbox.falseLabel"
          :name="checkbox.name"
          :disabled="checkbox.disabled"
          :checked="checkbox.checked"
          :indeterminate="checkbox.indeterminate"
          v-for="(checkbox, index) in formItem.checkboxs"
          :key="index"
          :label="checkbox.label">{{checkbox.label}}</el-checkbox>
      </el-checkbox-group>
    </el-form-item>
  </div>
    <el-row class="btn-group" v-if="needBtn">
      <!--<el-button @click="clickCancel">重置</el-button>-->
      <el-button type="primary" @click="clickSubmit">保存</el-button>
    </el-row>
    <el-row class="btn-group">
      <slot  name="btn-group"></slot>
    </el-row>
  </el-form>
  </div>
</template>
<script>
  let vm = {}
//  import * as Model from './model'
  export default{
    name: 'CcmsForm',
    data () {
      this.turnData(this.formList)
      return {
        vm: vm,
        refForm: {},
        formModel: {
          formList: this.formList
        }
      }
    },
    props: {
      formList: Array,
      needBtn: {
        type: Boolean,
        default: true
      }
    },
    watch: {
      formList (val) {
        this.formModel.formList = val
        this.turnData(this.formModel.formList)
      }
    },
    mounted () {
      this.setAuth()
      this.refForm = this.$refs['form']
    },
    methods: {
//    通过一个prop字段设置另一个属性 prop tarPro要设置的目标属性值
      setProperByPro (prop, tarPro) {
        if (typeof tarPro !== 'object') {
          return
        }
        for (let i = 0; i < this.formList.length; i++) {
          if (this.formList[i].prop === prop) {
            for (let key in tarPro) {
              this.formList[i][key] = tarPro[key]
            }
          }
        }
      },
      // 通过prop 获取表单字段对象
      getPropObjByPro (prop) {
        for (let i = 0; i < this.formList.length; i++) {
          if (this.formList[i].prop === prop) {
            return this.formList[i]
          }
        }
      },
      // 设置权限控制
      setAuth () {
        this.formList.map(item => {
          if (typeof item.dataAuth === 'function') {
            item.dataAuth()
          }
        })
      },
      // 点击确认按钮
      clickSubmit () {
        this.$refs['form'].validate(val => {
          if (val) {
            this.$emit('clickSubmit', this.getFormModel())
          }
        })
      },
      // 获取form model
      getFormModel () {
        let workObj = {}
        for (let i = 0; i < this.$refs['form'].model.formList.length; i++) {
          let obj = this.$refs['form'].model.formList[i]
          workObj[obj.prop] = obj.model
        }
        return workObj
      },
      // 重置表单
      reset () {
        this.$refs.form.resetFields()
      },
      // 点击取消按钮
      clickCancel () {
        this.$emit('clickCancel', this.$refs['form'])
      },
      // 当一个表单域从enable 变为disabled时 enabled错误信息不显示
      hiddenMsg () {
        for (let i = 0; i < this.formList.length; i++) {
          if (this.formList[i].disabled) {
            this.formList[i].hiddenMsg = true
          } else {
            this.formList[i].hiddenMsg = false
          }
        }
      },
      selectChange (fun, val) {
        if (typeof fun === 'function') {
          fun(val)
        }
        this.setAuth()
        this.hiddenMsg()
      },
      turnData (formList) {
        for (let i = 0; i < formList.length; i++) {
          let item = formList[i]
          if (item.show === undefined) {
            item.show = true
          }
          if (item.disabled === undefined) {
            item.disabled = false
          }
        }
      }
    }
  }
</script>
<style>
  .row-item{
    margin-left: 8.3333%;
    width: 33.3333%;
    display: inline-block;
  }
  .ccms-form .btn-group{
    text-align: center;
  }
</style>

