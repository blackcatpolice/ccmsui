<template>
  <div class="timer-shaft">
    <div class="line"></div>
    <!--<div class="item-box">-->
    <ul class="item-wrapper js-item-wrapper">
      <li class="item js-item" ref="item" :class="{'select': clickIndex === index}" v-for="(item, index) in data" :key="index" :data-left="index * 10" :style="{'left': 10 * index + '%'}">
        <div class="item-title" :class="{'bottom-title': index%2 === 0 && !sameside}">{{item.title}}</div>
        <div class="item-wrap" :style="{cursor: clickCircle? 'pointer':'static'}" @click.stop="goClick(index, $event, item)">
          <div class="item-circle" :style="{opacity: clickCircle?0:0.3}" :class="['js-item-circle'+index]">
          </div>
          <div class="item-circle2">
          </div>
          <div class="item-circle3">
          </div>
          <div class="item-circle4">
          </div>
        </div>
        <div class="item-time" :class="{'top': index%2===0 && !sameside, 'bottom': index%2===1 || sameside}">{{item.time}}</div>
      </li>
    </ul>
    <div class="arrow">
      <div class="arrow-left icon el-icon-arrow-left" @click="arrowLeft"></div>
      <div class="arrow-right icon el-icon-arrow-right" @click="arrowRight"></div>
    </div>
    <!--</div>-->
  </div>
</template>
<script>
//  import Dom from '@/utils/dom'
  const SHOW_MAX_NUM = 10
  const DISTANCE = 10
  export default{
    name: 'CcmsTimerShaft',
    data () {
      return {
        clickIndex: -1
      }
    },
    created () {
      this.clickArrowTimes = 0
    },
    props: {
      data: {
        type: Array,
        default: function () {
          return []
        }
      },
      sameside: {
        type: Boolean,
        default: false
      },
      clickCircle: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      goClick (index, evt, item) {
        if (!this.clickCircle) return
        this.$emit('clickItem', item)
        this.$refs['item'].map((item, index) => {
          window.$(item).find('.js-item-circle' + index).css('opacity', 0)
        })
        this.clickIndex = index
        window.$(evt.currentTarget).find('.js-item-circle' + index).animate({opacity: 1}, 200).animate({opacity: 0.3}, 200)
      },
      arrowLeft () {
        if (this.clickArrowTimes === 0) {
          return
        }
        let vm = this
        this.clickArrowTimes--
        for (let i = 0; i < this.$refs['item'].length; i++) {
          window.$(this.$refs['item'][i]).each((index, item) => {
            window.$(item).animate({'left': vm._setData(item, DISTANCE) + '%'}, 1000)
          })
        }
      },
      arrowRight () {
        if (this._isAllowClick()) {
          this.clickArrowTimes++
          let vm = this
          for (let i = 0; i < this.$refs['item'].length; i++) {
            window.$(this.$refs['item'][i]).each((index, item) => {
              window.$(item).animate({'left': vm._setData(item, -DISTANCE) + '%'}, 1000)
            })
          }
        }
      },
      _setData (dom, distance) {
        let left = parseInt(window.$(dom).attr('data-left'))
        let outLeft = left + distance
        window.$(dom).attr('data-left', outLeft)
        return outLeft
      },
      _isAllowClick () {
        if (this.data.length < SHOW_MAX_NUM || SHOW_MAX_NUM + this.clickArrowTimes >= this.data.length) {
          return false
        }
        return true
      }
    }
  }
</script>
