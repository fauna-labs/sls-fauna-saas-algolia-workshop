const products = {
  data: [
  {
    id: "201",
    sku: "GRC201",
    name: "cups",
    description: "Translucent 9 Oz, 100 ct",
    price: 6.98,
    quantity: 100,
    backorderedLimit: 5,
    backordered: false
  },
  {
    id: "202",
    sku: "TOY202",
    name: "pinata",
    description: "Original Classic Donkey Pinata",
    price: 24.99,
    quantity: 20,
    backorderedLimit: 10,
    backordered: false
  },
  {
    id: "203",
    sku: "FD203",
    name: "pizza",
    description: "Frozen Cheese",
    price: 4.99,
    quantity: 100,
    backorderedLimit: 15,
    backordered: false
  },
  {
    id: "204",
    sku: "GRC204",
    name: "avocados",
    description: "Conventional Hass, 4ct bag",
    price: 3.99,
    quantity: 1000,
    backorderedLimit: 15,
    backordered: false
  },
  {
    id: "205",
    sku: "GRC205",
    name: "limes",
    description: "Conventional, 1 ct",
    price: 0.35,
    quantity: 1000,
    backorderedLimit: 15,
    backordered: false
  },
  {
    id: "206",
    sku: "GCR206",
    name: "limes",
    description: "Organic, 16 oz bag",
    price: 3.49,
    quantity: 50,
    backorderedLimit: 15,
    backordered: false
  },
  {
    id: "207",
    sku: "GRC207",
    name: "limes",
    description: "Conventional, 16 oz bag",
    price: 2.99,
    quantity: 30,
    backorderedLimit: 15,
    backordered: false
  },
  {
    id: "208",
    sku: "GRC208",
    name: "cilantro",
    description: "Organic, 1 bunch",
    price: 1.49,
    quantity: 100,
    backorderedLimit: 15,
    backordered: false
  },
  {
    id: "209",
    sku: "TOY209",
    name: "pinata",
    description: "Giant Taco Pinata",
    price: 23.99,
    quantity: 10,
    backorderedLimit: 10,
    backordered: false
  }
]}

const orders = {
  data: [
  {
    id: "1001",
    name: "Order 1001",
    customer: "103",
    orderProducts: [
      {
        product: "201",
        quantity: 25,
        price: 6.98
      },
      {
        product: "203",
        quantity: 10,
        price: 4.99
      }
    ],
    status: "complete",
    creationDate: "2022-06-08T16:24:53.202530Z",
    deliveryAddress: {
      street: "5 Troy Trail",
      city: "Washington",
      state: "DC",
      zipCode: "20220"
    },
    creditCard: {
      network: "Visa",
      number: "4532636730015542"
    }
  },
  {
    id: "1002",
    name: "Order 1002",
    customer: "102",
    orderProducts: [
      {
        product: "203",
        quantity: 15,
        price: 4.99
      },
      {
        product: "202",
        quantity: 45,
        price: 24.99
      }
    ],
    status: "processing",
    creationDate: "2022-06-08T16:24:53.202530Z",
    deliveryAddress: {
      street: "72 Waxwing Terrace",
      city: "Washington",
      state: "DC",
      zipCode: "20002"
    },
    creditCard: {
      network: "Visa",
      number: "4916112310613672"
    }
  },
  {
    id: "1003",
    name: "Order 1003",
    customer: "101",
    orderProducts: [
      {
        product: "204",
        quantity: 10,
        price: 3.99
      },
      {
        product: "206",
        quantity: 5,
        price: 3.49
      },
      {
        product: "208",
        quantity: 20,
        price: 1.49
      }
    ],
    status: "processing",
    creationDate: "2022-06-08T16:24:53.202530Z",
    deliveryAddress: {
      street: "87856 Mendota Court",
      city: "Washington",
      state: "DC",
      zipCode: "20220"
    },
    creditCard: {
      network: "Visa",
      number: "4556781272473393"
    }
  }      
]}

export { products, orders}