import store from '@/store'
import { intervals } from '@/config'

const timeoutInMiliseconds = intervals.totemtIimeout
let timeoutId = null

const startTimer = () => {
  timeoutId = window.setTimeout(doInactive, timeoutInMiliseconds)
}
const doInactive = () => {
  store.dispatch('resetTotem')
}
const resetTimer = () => {
  window.clearTimeout(timeoutId)
  startTimer()
}
const setupTimers = () => {
  document.addEventListener('mousemove', resetTimer, false)
  document.addEventListener('mousedown', resetTimer, false)
  document.addEventListener('keypress', resetTimer, false)
  document.addEventListener('touchmove', resetTimer, false)
  startTimer()
}

export default setupTimers
