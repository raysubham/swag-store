import { permissionsList } from './schemas/fields'
import { ListAccessArgs } from './types'

export const isSignedIn = ({ session }: ListAccessArgs) => !!session

const generatedPermissions = Object.fromEntries(
  permissionsList.map((permission) => [
    permission,
    function ({ session }) {
      return !!session?.data.role?.[permission]
    },
  ])
)

//Role based permissions if someone is eligible -yes or no
export const permissions = {
  ...generatedPermissions,
  //   additional permissions if needed
  //   example
  canManageProducts({ session }: ListAccessArgs) {
    !!session?.data.role?.canManageProducts
  },
}

//Rule based permissions, returns a boolean or filter which limits the CRUD operation

export const rules = {
  canManageProducts({ session }: ListAccessArgs) {
    // if (!isSignedIn({ session })) {
    //   return false
    // }
    if (permissions.canManageProducts({ session })) {
      return true
    }
    return { user: { id: session.itemId } }
  },

  canOrder({ session }: ListAccessArgs) {
    if (!isSignedIn({ session })) {
      return false
    }
    if (permissions.canManageCart({ session })) {
      return true
    }
    return { user: { id: session.itemId } }
  },

  canManageOrders({ session }: ListAccessArgs) {
    if (!isSignedIn({ session })) {
      return false
    }
    if (permissions.canManageCart({ session })) {
      return true
    }
    return { order: { user: { id: session.itemId } } }
  },

  canManageOrderItems({ session }: ListAccessArgs) {
    if (!isSignedIn({ session })) {
      return false
    }
    if (permissions.canManageCart({ session })) {
      return true
    }
    return { order: { user: { id: session.itemId } } }
  },

  canReadProducts({ session }: ListAccessArgs) {
    if (!isSignedIn({ session })) {
      return false
    }
    if (permissions.canManageProducts({ session })) {
      return true //can read everything
    }
    //will only see available products-based on the status field
    return { status: 'AVAILABLE' }
  },

  canManageUsers({ session }: ListAccessArgs) {
    if (!isSignedIn({ session })) {
      return false
    }
    if (permissions.canManageUsers({ session })) {
      return true
    }
    return { id: session.itemId }
  },
}
