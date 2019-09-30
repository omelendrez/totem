import store from "@/store"
import { intervals } from "@/config"

const timeoutInMiliseconds = intervals.totemtIimeout
let timeoutId = null

const startTimer = () => {
  timeoutId = window.setTimeout(doInactive, timeoutInMiliseconds)
}
const doInactive = () => {
  store.dispatch("loadCategories")
  store.dispatch("loadProducts")
  store.dispatch("resetTotem")
  store.dispatch("setShowIntro", true)
}
const resetTimer = () => {
  window.clearTimeout(timeoutId)
  store.dispatch("setShowIntro", false)
  startTimer()
}
const setupTimers = () => {
  document.addEventListener("touchstart", resetTimer, false)
  document.addEventListener("touchend ", resetTimer, false)
  document.addEventListener("touchmove", resetTimer, false)
  document.addEventListener("touchcancel ", resetTimer, false)
  startTimer()
}
const stopTimers = () => {
  document.removeEventListener("touchmove", resetTimer, false)
  document.removeEventListener("touchend", resetTimer, false)
  document.removeEventListener("touchmove", resetTimer, false)
  document.removeEventListener("touchcancel", resetTimer, false)
}

export { setupTimers, stopTimers }
