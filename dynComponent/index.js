import dynComponent from './index.vue'
dynComponent.install = function (Vue) {
  Vue.component(dynComponent.name, dynComponent)
}
export default dynComponent
