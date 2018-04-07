import {t} from '../local/index.js'

export default {
  methods: {
    t (...args) {
      return t.apply(this, args)
    }
  }
}
