/*
1 - Activate card reader
2 - Send payment
3 - Receive respose
*/

export const activateCCReader = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(true)
    }, 10000)
  })
}
