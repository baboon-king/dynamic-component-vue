<template>
  <component :is="dynComponent" v-bind="$props" />
</template>
<script>
export default {
  name: 'dyn-component',
  props: {
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
      default () { return { myName: 'Tom', myAge: 18 } }
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
      return {
        template, // use content as template for this component
        props: this.$options.props, // re-use current props definitions
        data () {
          return {
            obj: { name: 'jack' }
          }
        },
        methods: {
          // eslint-disable-next-line no-new-func
          handleClick: new Function('a', 'b', 'console.log(this)')
        }
      }
    }
  }
}
</script>
