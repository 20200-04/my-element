export default function filter(arr, obj = {}) {
  console.log(obj);

  let flag = true
  let returnArr = []
  for (const prop in obj) {
    if (!obj[prop]) {
      flag = false
    }
  }
  if (flag) {
    console.log(2222)
  }
  for (const i in obj) {
    console.log(obj[i])
    if (flag) {
      if (returnArr.length) {
        console.log('has')
        returnArr = returnArr.filter(function (item) {
          return item[i].toString().includes(obj[i].toString())
        })
      } else {
        console.log('no')
        returnArr = arr.filter(function (item) {
          return item[i].toString().includes(obj[i].toString())
        })
      }
    } else {
      if (obj[i] !== '') {
        returnArr = arr.filter(function (item) {
          return item[i].toString().includes(obj[i].toString())
        })
      }
    }
  }
  return returnArr
}
