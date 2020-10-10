import dynComponent from './index.vue'
dynComponent.install = function (Vue) {
  Vue.component(dynComponent.name, dynComponent)
}
export default dynComponent

/**
 * 把 methods 字符串处理成对象返回
 * @param {String} methodsStr 包含多个方法的字符串
 * @param {String} prefix 方法名前缀
 * @return {Object} methods 处理后的函数对象
 */
export function methodsStrToObj (methodsStr, prefix = 'fun_') {
  if (!methodsStr) return
  const splitTag = '<<split>>'
  const functionTag = 'function'
  let methods = {}
  const methodsArray = methodsStr.trim()
    .replace(/[ \r\n]/g, '') // 去除空格/换行/回车
    .replace(RegExp(functionTag, 'g'), splitTag + functionTag)
    .split(splitTag)

  methodsArray.forEach(item => {
    if (!item) return
    const funName = RegExp(prefix + '[0-9A-Za-z]{0,31}', 'g').exec(item).shift()
    const funBody = /(?:\/\*[\s\S]*?\*\/|\/\/.*?\r?\n|[^{])+\{([\s\S]*)\}$/.exec(item).pop()
    if (funName) {
      try {
        // eslint-disable-next-line no-new-func
        methods[funName] = new Function(funBody)
      } catch (error) {
        console.log('字符串处理成函数对象错误：')
        console.log('方法名：', funName)
        console.log('方法体：', funBody)
        return {}
      }
    }
  })
  return methods
}
