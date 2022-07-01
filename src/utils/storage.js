/**
 *获取本地数据
 * @param {*} key
 * @returns
 */
export const getItem = (key) => {
  const res = window.localStorage.getItem(key)
  try {
    return JSON.parse(res)
  } catch (err) {
    return res
  }
}
/**
 *设置本地数据
 * @param {*} key
 * @param {*} val
 */
export const setItem = (key, val) => {
  if (typeof val === 'object') {
    window.localStorage.setItem(key, JSON.stringify(val))
  } else {
    window.localStorage.setItem(key, val)
  }
}
/**
 *根据key删除本地存储
 * @param {*} key
 */
export const removeItem = (key) => {
  window.localStorage.removeItem(key)
}
/**
 * 删除所有本地存储
 */
export const clearItem = () => {
  window.localStorage.clearItem()
}
