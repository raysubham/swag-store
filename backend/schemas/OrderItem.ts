import { integer, relationship, text } from '@keystone-next/fields'
import { list } from '@keystone-next/keystone/schema'
import { isSignedIn, rules } from '../access'

export const OrderItem = list({
  fields: {
    name: text({ isRequired: true }),
    description: text({
      ui: {
        displayMode: 'textarea',
      },
    }),
    price: integer(),
    quantity: integer(),
    photo: relationship({
      ref: 'ProductImage',
      ui: {
        displayMode: 'cards',
        cardFields: ['image', 'altText'],
        inlineCreate: { fields: ['image', 'altText'] },
        inlineEdit: { fields: ['image', 'altText'] },
      },
    }),
    order: relationship({ ref: 'Order.items' }),
  },
  ui: {
    listView: {
      initialColumns: ['name', 'description', 'price', 'quantity', 'order'],
    },
  },
  access: {
    create: isSignedIn,
    read: rules.canManageOrderItems,
    update: () => false,
    delete: () => false,
  },
})
