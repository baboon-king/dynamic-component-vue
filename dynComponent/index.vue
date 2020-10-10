<template>
  <!-- v-bind="$props" 这个好像没任何用，不确定先留着吧-->
  <component :is="dynComponent" v-bind="$props" />
</template>
<script>
import { methodsStrToObj } from './index'
export default {
  name: 'dyn-component',
  props: {
    methodsStr: {
      type: String,
      // required: true,
      default () {
        return `
              function fun_bar () {console.log(this)}
              function fun_foo () {console.log('b')}
        `
      }
    },
    template: {
      type: String,
      // required: true,
      default () {
        return `<div id="test">
                  <h1>you render result </h1>
                  <p>my name is {{data.myName}}</p>
                  <p>my name2 is {{obj.name}}</p>
                  <h1>you template </h1>
                  <p>{{template}}</p>
                  <h1>test click</h1>
                  <button @click="fun_bar">click me</button>
                </div>`
      }
    },
    // props 以对象方式传递
    data: {
      type: Object,
      required: false,
      validator: function (val) {
        return Object.prototype.toString.apply(val) === '[object Object]'
      },
      default () {
        return { myName: 'Tom', myAge: 18 }
      }
    }
  },
  watch: {
    data (val) {
      console.log('new val::', val)
    }
  },
  computed: {
    dynComponent () {
      const template = this.template ? this.template : '<div>未找到定义的组件</div>'
      const methods = methodsStrToObj(this.methodsStr)
      return {
        template, // use content as template for this component
        props: this.$options.props, // re-use current props definitions
        data () {
          return {
            obj: { name: 'jack' }
          }
        },
        methods
      }
    }
  }
}
</script>
