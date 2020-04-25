import Moment from 'moment'

// 时间戳转日期
const timestampTime = (val) => {
  return Moment(val).format('YYYY-MM-DD HH:mm:ss')
}

// 日期转时间戳
const dateTime = (val) => {
  return Moment(new Date(val)).valueOf()
}

export {
  timestampTime,
  dateTime
}
