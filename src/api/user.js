import request from '@/utils/request'
/**
 *获取短信验证码
 * @param {*} mobile
 * @returns
 */
export const getSmsCode = (mobile) => {
  return request({
    url: `/sms/codes/${mobile}`
  })
}
/**
 *登陆
 * @param {*} param0
 * @returns
 */
export const login = ({ mobile, code }) => {
  return request({
    method: 'post',
    url: '/authorizations',
    data: {
      mobile,
      code
    }
  })
}
/**
 *获取用户个人资料
 * @returns
 */
export const getUserInfo = () => {
  return request({
    url: 'user'

  })
}
