const pad = (n) => n < 10 ? '0' + n : n

module.exports.getToday = () => {
  const d = new Date();
  const year = d.getFullYear().toString()
  let month = ''
  switch (d.getMonth() + 1) {
    case 1:
      month = 'Ene'
      break
    case 2:
      month = 'Feb'
      break
    case 3:
      month = 'Mar'
      break
    case 4:
      month = 'Abr'
      break
    case 5:
      month = 'May'
      break
    case 6:
      month = 'Jun'
      break
    case 7:
      month = 'Jul'
      break
    case 8:
      month = 'Ago'
      break
    case 9:
      month = 'Sep'
      break
    case 10:
      month = 'Oct'
      break
    case 11:
      month = 'Nov'
      break
    case 12:
      month = 'Dic'
      break
  }
  const day = pad(d.getDate().toString())
  const date = `${day}-${month}-${year}`
  return (date)
}

module.exports.getNow = () => {
  const d = new Date();
  const hours = pad(d.getHours().toString())
  const minutes = pad(d.getMinutes().toString())
  const seconds = pad(d.getSeconds().toString())

  const hour = `${hours}:${minutes}:${seconds}`
  return (hour)
}