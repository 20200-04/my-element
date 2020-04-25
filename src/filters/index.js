// 过滤时间显示格式
const timeFun = (item) => {
  let str = "";
  str = item.replace("T", " ");
  return str.replace(".000+0000", "");
}

export {
  timeFun
}
