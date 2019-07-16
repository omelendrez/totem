import store from '@/store'
import { intervals } from '@/config'

const timeoutInMiliseconds = intervals.totemtIimeout
let timeoutId = null

const startTimer = () => {
  timeoutId = window.setTimeout(doInactive, timeoutInMiliseconds)
}
const doInactive = () => {
  store.dispatch('loadCategories')
  store.dispatch('loadProducts')
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
const stopTimers = () => {
  document.removeEventListener('mousemove', resetTimer, false)
  document.removeEventListener('mousedown', resetTimer, false)
  document.removeEventListener('keypress', resetTimer, false)
  document.removeEventListener('touchmove', resetTimer, false)
}

export { setupTimers, stopTimers }
