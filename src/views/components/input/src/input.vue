<template>
  <span :class="[
    type === 'textarea' ? 'cc-textarea' : 'cc-input',
    size ? 'cc-input--' + size : '',
    {
      'is-disabled': disabled,
      'cc-input-group': $slots.prepend || $slots.append,
      'cc-input-group--append': $slots.append,
      'cc-input-group--prepend': $slots.prepend
    }
  ]" style="display: inline-block;">
    <template v-if="type !== 'textarea'">
      <!-- 前置元素 -->
      <div class="cc-input-group__prepend" v-if="$slots.prepend">
        <slot name="prepend"></slot>
      </div>
      <!-- input 图标 -->
      <slot name="icon">
        <i class="cc-input__icon"
           :class="[
            'el-icon-' + icon,
            onIconClick ? 'is-clickable' : ''
          ]"
           v-if="icon"
           @click="handleIconClick">
        </i>
      </slot>
      <input
        v-if="type !== 'textarea'"
        class="cc-input__inner"
        v-bind="$props"
        :autocomplete="autoComplete"
        :value="currentValue"
        ref="input"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
        @keypress="handleKeypress"
        @cut="handleCut"
        @keyup="handleKeyup"
        style="width: 100%;"
      >
      <i class="cc-input__icon cc-icon-loading" v-if="validating"></i>
      <!-- 后置元素 -->
      <div class="cc-input-group__append" v-if="$slots.append">
        <slot name="append"></slot>
      </div>
    </template>
    <textarea
      v-else
      class="cc-textarea__inner"
      :value="currentValue"
      @input="handleInput"
      ref="textarea"
      v-bind="$props"
      :style="textareaStyle"
      @focus="handleFocus"
      @blur="handleBlur"
      @keypress="handleKeypress"
      @cut="handleCut"
      @keyup="handleKeyup">
    </textarea>
  </span>
</template>
<script>
  /* eslint-disable no-new */
  import emitter from '../../mixins/emitter'
  import calcTextareaHeight from './calcTextareaHeight'
  import merge from '../../util/merge'
  import { setPlaceholder, preventInput, limTextArea } from '../../util/custo-util'

  export default {
    name: 'CcInput',

    componentName: 'CcInput',

    mixins: [emitter],

    data () {
      return {
        el: {},
        currentValue: this.value,
        textareaCalcStyle: {}
      }
    },

    props: {
      value: [String, Number],
      placeholder: String,
      size: String,
      resize: String,
      readonly: Boolean,
      autofocus: Boolean,
      icon: String,
      disabled: Boolean,
      type: {
        type: String,
        default: 'text'
      },
      name: String,
      autosize: {
        type: [Boolean, Object],
        default: false
      },
      rows: {
        type: Number,
        default: 2
      },
      autoComplete: {
        type: String,
        default: 'off'
      },
      form: String,
      maxlength: Number,
      minlength: Number,
      max: {},
      min: {},
      step: {},
      validateEvent: {
        type: Boolean,
        default: true
      },
      onIconClick: Function
    },

    computed: {
      validating () {
        return this.$parent.validateState === 'validating'
      },
      textareaStyle () {
        return merge({}, this.textareaCalcStyle, {resize: this.resize})
      }
    },

    watch: {
      'value' (val, oldValue) {
        this.setCurrentValue(val)
      }
    },

    methods: {
      setValue (val) {
        this.currentValue = val
        this.$emit('input', val)
        this.$emit('change', val)
      },
      handleBlur (event) {
        this.$emit('blur', event)
        if (this.validateEvent) {
          this.dispatch('ElFormItem', 'el.form.blur', [this.currentValue])
        }
      },
      inputSelect () {
        this.$refs.input.select()
      },
      resizeTextarea () {
        if (this.$isServer) return
        var {autosize, type} = this
        if (!autosize || type !== 'textarea') return
        const minRows = autosize.minRows
        const maxRows = autosize.maxRows

        this.textareaCalcStyle = calcTextareaHeight(this.$refs.textarea, minRows, maxRows)
      },
      handleFocus (event) {
        this.$emit('focus', event)
      },
      handleInput (event) {
        const value = event.target.value
        this.$emit('input', value)
        this.setCurrentValue(value)
        this.$emit('change', value)
      },
      handleIconClick (event) {
        if (this.onIconClick) {
          this.onIconClick(event)
        }
        this.$emit('click', event)
      },
      setCurrentValue (value) {
        if (value === this.currentValue) return
        this.$nextTick(_ => {
          this.resizeTextarea()
        })
        this.currentValue = value
        if (this.validateEvent) {
          this.dispatch('ElFormItem', 'el.form.change', [value])
        }
      },
      handleKeypress () {
        if ((event.keyCode === 46 || event.keyCode === 8)) { // IE9 fire input event on backspace/del
          this.setValue(this.el.value)
        }
        if (this.type === 'textarea' && this.maxlength && this.currentValue.length >= this.maxlength) {
          preventInput() // 解决IE9 textarea maxlength属性无效问题 -- 英文
        }
      },
      handleCut () {
        if (this.isIE9()) { // IE9 fire input event on cut
          this.$nextTick(() => this.setValue(this.el.value))
        }
      },
      handleKeyup (event) {
        if ((event.keyCode === 46 || event.keyCode === 8)) { // IE9 fire input event on backspace/del
          this.setValue(this.el.value)
        }
        if ((this.type === 'textarea' && this.maxlength)) { // 解决IE9 textarea maxlength属性无效问题 -- 中文
          this.setValue(limTextArea(this.currentValue, this.maxlength))
        }
      }
    },

    created () {
      this.$on('inputSelect', this.inputSelect)
    },

    mounted () {
      this.resizeTextarea()
      this.el = this.type === 'textarea' ? this.$refs.textarea : this.$refs.input
      setPlaceholder([this.el], '#aaa') // 解决IE9 Input不兼容placeholder属性问题
    }
  }
</script>

