/**
 * 查询并返回相关名称的父组件
 * @param $this 组件
 * @param name 组件名称
 *
 * @author: Storm
 * @date: 2018/08/15
 */
const queryComponentParent = ($this, name) => {
  if (!$this.$parent || (typeof name !== 'string' && !Array.isArray(name))) return
  if (typeof name === 'string') name = [name]
  return name.includes($this.$parent.$options.name) ? $this.$parent : queryComponentParent($this.$parent, name)
}

export default queryComponentParent
