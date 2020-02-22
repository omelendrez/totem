import {
  getCategories,
  getProducts,
  saveOrder,
  loadOrders,
  loadItems,
  loadOrderItems,
  loadOrderData,
  printOrderThermal,
  printOrderThermalError,
  printOrderFiscal,
  printReportX,
  printReportZ,
  changeOrderStatus,
  changeItemStatus,
  checkTotemStatus,
  activateTotem,
  deactivateTotem,
  cancelPayment,
  getPayments,
  getStock,
  printStockThermal,
  closeStock
} from "@/services"

import { batchClose } from '@/external'
const { CONFIG, totemId } = require("@/config")
const assetsHost = CONFIG.assetsServerUrl
import { additional } from "@/utils"

const handleError = err => {
  const error = {
    error: true,
    message: `Oops! Ha ocurrido un error al intentar connectar con el servidor de base de datos 😧`
  }
  return err.response && err.response.data ? err.response.data : error
}

const getResults = resp => (resp.data.rows ? resp.data.rows : [])

const actions = {
  async loadCategories({ commit }) {
    commit("load_categories_request")
    getCategories()
      .then(resp => {
        const categories = getResults(resp)
        categories.map(item => {
          const image = item.image ? item.image : ""
          item.image = image ? `${assetsHost}${image}` : ""
          return item
        })
        commit("load_categories_success", { rows: categories })
      })
      .catch(err => {
        commit("request_error", handleError(err))
      })
  },
  async loadProducts({ commit }) {
    commit("load_products_request")
    getProducts()
      .then(resp => {
        const products = getResults(resp)
        products.map(item => {
          const image = item.image || item.category.image || ""
          item.image = image ? `${assetsHost}${image}` : ""
          item.additional = item.has_alcohol ? additional : "0";
          return item
        })
        commit("load_products_success", { rows: products })
      })
      .catch(err => {
        commit("request_error", handleError(err))
      })
  },
  async add({ commit }, item) {
    commit("add_item", { item })
  },
  async info({ commit }, item) {
    commit("info", { item })
  },
  async remove({ commit }, index) {
    commit("remove_item", { index })
  },
  async selectCategory({ commit }, item) {
    commit("select_category", { item })
  },
  async saveOrder({ commit }, order) {
    commit("save_order_request")
    order.totemId = totemId
    saveOrder(order)
      .then(resp => {
        commit("save_order_success", resp.data)
      })
      .catch(err => {
        commit("request_error", handleError(err))
      })
  },
  async loadOrders({ commit }) {
    commit("load_orders_request")
    loadOrders()
      .then(resp => {
        commit("load_orders_success", { orders: resp.data })
      })
      .catch(err => {
        commit("request_error", handleError(err))
      })
  },
  async loadItems({ commit }) {
    commit("load_items_request")
    loadItems()
      .then(resp => {
        commit("load_items_success", { items: resp.data })
      })
      .catch(err => {
        commit("request_error", handleError(err))
      })
  },
  async loadOrderItems({ commit }) {
    commit("load_order_items_request")
    loadOrderItems()
      .then(resp => {
        commit("load_order_items_success", { orderItems: resp.data })
      })
      .catch(err => {
        commit("request_error", handleError(err))
      })
  },
  async changeOrderStatus({ commit }, data) {
    commit("change_order_status_request")
    changeOrderStatus(data)
      .then(resp => {
        commit("change_order_status_success", resp.data)
      })
      .catch(err => {
        commit("request_error", handleError(err))
      })
  },
  async changeItemStatus({ commit }, data) {
    commit("change_item_status_request")
    changeItemStatus(data)
      .then(() => {
        commit("change_item_status_success")
      })
      .catch(err => {
        commit("request_error", handleError(err))
      })
  },
  resetTotem({ commit }) {
    commit("reset_totem")
  },
  async loadOrderData({ commit }, orderId) {
    commit("load_order_data_request")
    loadOrderData(orderId)
      .then(resp => {
        commit("load_order_data_success", { order: resp.data })
      })
      .catch(err => {
        commit("request_error", handleError(err))
      })
  },
  async loadTestOrderData({ commit }, orderId) {
    commit("load_test_order_data_request")
    loadOrderData(orderId)
      .then(resp => {
        commit("load_test_order_data_success", { order: resp.data })
      })
      .catch(err => {
        commit("request_error", handleError(err))
      })
  },
  async printOrderThermal({ commit }, orderData) {
    commit("print_order_data_request", orderData)
    printOrderThermal(orderData)
      .then(resp => {
        commit("print_order_data_success", resp.data)
      })
      .catch(err => {
        const data = { ...err.response.data, order: orderData }
        printOrderThermalError(data)
        commit("request_error", handleError(err))
      })
  },
  async printOrderFiscal({ commit }, orderData) {
    commit("fiscal_print_order_data_request", orderData)
    printOrderFiscal(orderData)
      .then(resp => {
        commit("fiscal_print_order_data_success", resp.data)
      })
      .catch(err => {
        commit("request_error", handleError(err))
      })
  },
  async printReportX({ commit }) {
    printReportX()
      .then(resp => console.log(resp.data))
      .catch(err => {
        commit("request_error", handleError(err))
      })
  },
  async printReportZ({ commit }) {
    printReportZ()
      .then(resp => console.log(resp.data))
      .catch(err => {
        commit("request_error", handleError(err))
      })
  },
  async activateTotem({ commit }) {
    activateTotem(totemId)
      .then(resp => console.log(resp.data))
      .catch(err => {
        commit("request_error", handleError(err))
      })
  },
  async deactivateTotem({ commit }) {
    deactivateTotem(totemId)
      .then(resp => console.log(resp.data))
      .catch(err => {
        commit("request_error", handleError(err))
      })
  },
  async batchClose({ commit }) {
    batchClose()
      .then(resp => console.log(resp.data))
      .catch(err => {
        commit("request_error", handleError(err))
      })
  },
  async cancelPayment({ commit }, payload) {
    cancelPayment(payload)
      .then(resp => console.log(resp.data))
      .catch(err => {
        commit("request_error", handleError(err))
      })
  },
  async checkTotemStatus({ commit }) {
    commit("load_totem_status_request")
    checkTotemStatus(totemId)
      .then(resp => {
        commit("load_totem_status_success", resp.data)
      })
      .catch(err => {
        commit("request_error", handleError(err))
      })
  },
  async resetError({ commit }) {
    commit("reset_error")
  },
  async setCCStatus({ commit }, status) {
    commit("set_cc_status", status)
  },
  async ccSaveOrder({ commit }, order) {
    commit("cc_save_order_request")
    order.totemId = totemId
    saveOrder(order)
      .then(resp => {
        commit("cc_save_order_success", resp.data)
      })
      .catch(err => {
        commit("cc_set_error", err)
      })
  },
  async ccChangeOrderStatus({ commit }, data) {
    commit("cc_change_order_status_request")
    changeOrderStatus(data)
      .then(resp => {
        commit("cc_change_order_status_success", resp.data)
      })
      .catch(err => {
        commit("cc_set_error", err)
      })
  },
  async ccSaveResponse({ commit }, response) {
    commit("cc_set_response", response)
  },
  async setCCError({ commit }, error) {
    commit("cc_set_error", error)
  },
  async ccLoadOrderData({ commit }, orderId) {
    commit("cc_load_order_data_request")
    loadOrderData(orderId)
      .then(resp => {
        commit("cc_load_order_data_success", { order: resp.data })
      })
      .catch(err => {
        commit("cc_set_error", error)
      })
  },
  setShowIntro({ commit }, value) {
    commit("set_show_intro", value)
  },
  setShowResetAlert({ commit }, value) {
    commit("set_show_reset_alert", value)
  },
  async getPayments({ commit }) {
    getPayments()
      .then(resp => {
        commit("set_cc_payments", resp.data)
      })
      .catch(err => {
        console.log(err)
      })
  },
  async getStock({ commit }) {
    getStock()
      .then(resp => {
        commit("set_stock", resp.data)
      })
      .catch(err => {
        console.log(err)
      })
  },
  async printStockThermal({ commit }, orderData) {
    printStockThermal(orderData)
      .catch(err => {
        const data = { ...err.response.data, order: orderData }
        printOrderThermalError(data)
        commit("request_error", handleError(err))
      })
  },
  async closeStock({ commit }) {
    closeStock()
      .catch(err => {
        console.log(err)
      })
  },

}

export default actions
