import { integer, relationship, select, text } from '@keystone-next/fields'
import { list } from '@keystone-next/keystone/schema'
import { isSignedIn, rules } from '../access'

export const Product = list({
  access: {
    create: isSignedIn,
    read: () => true,
    update: rules.canManageProducts,
    delete: rules.canManageProducts,
  },
  fields: {
    name: text({ isRequired: true }),
    description: text({
      ui: {
        displayMode: 'textarea',
      },
    }),
    price: integer(),
    photo: relationship({
      ref: 'ProductImage.product',
      ui: {
        displayMode: 'cards',
        cardFields: ['image', 'altText'],
        inlineCreate: { fields: ['image', 'altText'] },
        inlineEdit: { fields: ['image', 'altText'] },
      },
    }),
    status: select({
      options: [
        { label: 'Draft', value: 'AVAILABLE' },
        {
          label: 'Available',
          value: 'AVAILABLE',
        },
        {
          label: 'Unavailable',
          value: 'UNAVAILABLE',
        },
      ],
      defaultValue: 'DRAFT',
      ui: {
        displayMode: 'segmented-control',
        createView: {
          fieldMode: 'hidden',
        },
      },
    }),
    user: relationship({
      ref: 'User.products',
      defaultValue: ({ context }) => ({
        connect: {
          id: context.session.itemId,
        },
      }),
    }),
  },
  ui: {
    listView: {
      initialColumns: ['name', 'description', 'status', 'price'],
    },
  },
})
