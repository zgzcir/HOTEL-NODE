function formatDate (time = new Date()) {
  let date = new Date(time)

  let year = date.getFullYear()

  let month = date.getMonth() + 1

  let day = date.getDate()

  let hour = date.getHours()

  let min = date.getMinutes()

  let sec = date.getSeconds()

  month = ('' + month).length === 1 ? '0' + month : month
  day = ('' + day).length === 1 ? '0' + day : day
  min = ('' + min).length === 1 ? '0' + min : min
  sec = ('' + sec).length === 1 ? '0' + sec : sec

  return `${year}-${month}-${day} ${hour}:${min}:${sec}`
}
function formatDateToNum (time = new Date()) {
  let date = new Date(time)

  let year = date.getFullYear()

  let month = date.getMonth() + 1

  let day = date.getDate()

  month = ('' + month).length === 1 ? '0' + month : month
  day = ('' + day).length === 1 ? '0' + day : day

  return `${year}${month}${day}`
}
/**
 * @description: add a year by current time
 * @param {years[,Date]} [Int years, Date default now] 
 * @return: Date (now + years)
 */
function yearLater(years,now = new Date()) {
  let later = new Date(now)
  later.setFullYear(later.getFullYear() + parseInt(years) )
  later = formatDate(later)
  return later
}
module.exports = {
  formatDate,
  formatDateToNum,
  yearLater
}
