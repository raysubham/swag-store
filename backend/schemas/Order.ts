import { integer, relationship, text } from '@keystone-next/fields'
import { list } from '@keystone-next/keystone/schema'
import { isSignedIn, rules } from '../access'

export const Order = list({
  fields: {
    total: integer(),
    items: relationship({ ref: 'OrderItem.order', many: true }),
    user: relationship({ ref: 'User.orders' }),
    paymentId: text(),
  },
  ui: {
    listView: {
      initialColumns: ['total', 'items', 'user', 'paymentId'],
    },
  },
  access: {
    create: isSignedIn,
    read: rules.canManageOrders,
    update: () => false,
    delete: () => false,
  },
})
