const state = {
  status: "",
  apiError: null,
  totem: null,
  products: [],
  categories: [],
  basket: [],
  product: null,
  selectedCategory: null,
  order: {},
  orders: [],
  items: [],
  orderItems: [],
  orderData: {},
  testOrderData: {},
  printingOrder: "",
  printedOrder: null,
  changedOrder: null,
  fiscalPrintingOrder: "",
  fiscalPrintedOrder: null,
  ccStatus: -1,
  ccOrder: {},
  ccOrderData: {},
  ccChangedOrder: null,
  ccResponse: {},
  ccError: {},
  ccPayments: [],
  showIntro: true,
  showResetAlert: false,
  stock: []
}

export default state
