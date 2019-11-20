import store from "@/store"
import { intervals } from "@/config"

const timeoutInMiliseconds = intervals.totemtIimeout
let timeoutId = null

const startTimer = () => {
  timeoutId = window.setTimeout(launchAlert, timeoutInMiliseconds)
}
const launchAlert = () => {
  store.dispatch("setShowResetAlert", true)
}
const doInactive = () => {  // Not in use
  store.dispatch("loadCategories")
  store.dispatch("loadProducts")
  store.dispatch("resetTotem")
  store.dispatch("setShowIntro", true)
}
const resetTimer = e => {
  if (store.getters.showIntro) { e.preventDefault() }
  window.clearTimeout(timeoutId)
  store.dispatch("setShowIntro", false)
  startTimer()
}
const setupTimers = () => {
  document.addEventListener("touchstart", resetTimer, { passive: false })
  document.addEventListener("click", resetTimer, { passive: false })
  startTimer()
}
const stopTimers = () => {
  document.removeEventListener("touchstart", resetTimer, { passive: false })
  document.removeEventListener("click", resetTimer, { passive: false })
}

const additional = "60"

export { setupTimers, stopTimers, doInactive, additional }
