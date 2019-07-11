// 用户相关接口封装模块
/**
 *建议将所有的请求都封装成一个个的小函数，在需要的时候直接调用
 好处：好维护 统一管理 可重用
 */
import request from '@/utils/request'

export const login = ({ mobile, code }) => {
  request({
    method: 'POST',
    url: '/app/v1_0/authorizations',
    data: {
      mobile,
      code
    }
  })
}
