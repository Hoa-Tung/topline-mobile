// 处理时间 导入dayjs
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn'
dayjs.locale('zh-cn') // 设置使用中文
dayjs.extend(relativeTime) // 按需加载 拓展相对时间插件
console.log(dayjs().from(dayjs('2019-7-11 19:22:12')))

export default (value) => {
  return dayjs().from(dayjs(value))
}
