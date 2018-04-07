/**
 * Created by sch on 2017/8/29.
 */
<template>
  <div>
    <cc-editor :width="width" :height="height" v-model="content"></cc-editor>
  </div>
</template>
<script>
  export default {
    name: 'CcmsUeditor',
    components: {CcEditor: {
      render: function (h) {
        return h('script', {
          attrs: {
            id: 'editor',
            name: 'editor',
            type: 'text/plain'
          },
          style: {
            width: this.width,
            height: this.height
          }
        })
      },
      props: {
        width: {
          type: String,
          default: function () {
            return '100%'
          }
        },
        height: {
          type: String,
          default: function () {
            return '100%'
          }
        }
      }
    }},
    props: {
      width: {
        type: String,
        default: function () {
          return '100%'
        }
      },
      height: {
        type: String,
        default: function () {
          return '100%'
        }
      },
      serverUrl: {
        type: String,
        default: function () {
          return ''
        }
      }
    },
    data () {
      return {
        content: '',
        ueInstance: {}
      }
    },
    mounted () {
//        , {serverUrl: 'example/public/ueditor/nodejs/config.json'}
      this.ueInstance = window.UE.getEditor('editor', {serverUrl: this.serverUrl, config: 'getConfig'})
    },
    destroyed () {
      window.UE.delEditor('editor')
    },
    methods: {
    }
  }
</script>
