import { mergeOptions } from '@apollo/client'

export function formatMoney(amount = 0) {
  const options = {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
  }
  // if (amount % 10000 === 0) {
  //   options.minimumFractionDigits = 2
  // }

  const formatter = Intl.NumberFormat('en-IN', options)

  return formatter.format(amount)
}
