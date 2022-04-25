// 生成唯一的 uuid
export function guid() {
  function S4() {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }
  return (S4() + S4() + S4() + S4());
}

// 格式化时间
export function timerFormat(timeData?:any,types?:any){
  // let timer 当前时间  type 格式化内容
  let timer = timeData ? timeData : new Date()
  let type = types ? types : 'yy:mm:dd hh:mm:ss'
  let YY = timer.getFullYear()
  let MM = getTimerO(timer.getMonth() + 1)
  let DD = getTimerO(timer.getDate())
  let hh = getTimerO(timer.getHours())
  let mm = getTimerO(timer.getMinutes())
  let ss = getTimerO(timer.getSeconds())
  if(type == 'YY-MM-DD hh:mm:ss'){
    return YY + ":" + MM + ":" + DD + " " + hh + ":" + mm + ":"+ ss
  }
  return YY + "-" + MM + "-" + DD + " " + hh + ":" + mm + ":"+ ss
}

const getTimerO = (item:any) => {
  return item < 10 ? "0" + item : item
}