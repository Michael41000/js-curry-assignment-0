'use strict'

const entries =
  obj =>
    Object.keys(obj)
      .map(key => [key, obj[key]])

const listing =
  (name, price) => ({
    name,
    price
  })

const customer =
  (name, shoppingList) => ({
    name,
    shoppingList
  })

const cart =
  (customer, ...items) => ({
    customer,
    items
  })

/**
 * should return an array with the `itemName` repeated `count` number of times
 */
const itemRepeater =
  itemName =>
    count => 
      count === 0 ? [] : [itemName].concat(itemRepeater(itemName)(count - 1))
      // Add the name of the item to the array, merge it with the other arrays, 
      // and keep going through the function (decrementing count), until count is 0.

/**
 * should return an array of carts with each given customer's shopping list
 * as an array of items
 */
const constructCarts =
  listings =>
    customers => 
      // Map each customer element, to a cart element
      customers.map(
        (customer) => 
          // Create a cart with each customer name and an array of the items
          cart(customer.name, ...entries(customer.shoppingList).reduce(
            // Take an item and an item count and turn it into an array 
            // that has the item repeated item count times
            (itemList, item) => itemList.concat(itemRepeater(item[0])(item[1])), [])
          )
      )
    

module.exports = {
  listing,
  customer,
  constructCarts
}
