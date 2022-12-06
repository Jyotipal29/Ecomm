const products = [
  {
    brand: "Arayna",
    description:
      "Arayna Women's Floral Printed 100% Cotton Kurti Palazzo Pants Set with Dupatta ",
    imageUrl: "https://m.media-amazon.com/images/I/513OO2fys8S._UX679_.jpg",
    price: 999,
    qty: 1,
    InStock: 7,
    fastDelivery: true,
  },
  {
    brand: "Aarika",
    description: "Aarika Girls Dress",

    imageUrl: "https://m.media-amazon.com/images/I/51gM87teo7L._UY879_.jpg",
    price: 617,
    qty: 1,
    InStock: 5,
    fastDelivery: false,
  },
  {
    brand: "Van Heusen",
    description: "Van Heusen Men's Regular Fit T-Shirt",

    imageUrl: "https://m.media-amazon.com/images/I/717LjY3hVqL._UX569_.jpg",
    price: 548,
    qty: 1,
    InStock: 5,
    fastDelivery: false,
  },

  {
    brand: "Arayna",
    description:
      "Arayna Women's Rayon Embroidered Straight Kurta Set with Palazzo Pants ",
    imageUrl: "https://m.media-amazon.com/images/I/61RixDEBrrL._UX679_.jpg",
    price: 549,
    qty: 1,
    InStock: 5,
    fastDelivery: true,
  },
  // harpa

  {
    brand: "Harpa",
    description: "Harpa Women's Polyester A-Line Maxi Casual Dress ",
    imageUrl: "https://m.media-amazon.com/images/I/613DBLEr6ML._UX679_.jpg",
    price: 1228,
    qty: 1,
    InStock: 7,
    fastDelivery: true,
  },

  // w
  {
    brand: "W",
    description: "W for Woman Women Kurta",
    imageUrl: "https://m.media-amazon.com/images/I/91yXXOE+IbL._UX522_.jpg",
    price: 458,
    qty: 1,
    InStock: 5,
    fastDelivery: true,
  },
  {
    brand: "Arayna",
    description:
      "Arayna Women's Rayon Solid Straight Kurti Palazzo Pants Set with Dupatta",
    imageUrl: "https://m.media-amazon.com/images/I/81VddGPvF1L._UX466_.jpg",
    price: 799,
    qty: 1,
    InStock: 8,
    fastDelivery: false,
  },
  {
    brand: "W",
    description: "W for Woman Women's Rayon Kurta",
    imageUrl: "https://m.media-amazon.com/images/I/81ssSvTSIoL._UX522_.jpg",
    price: 769,
    qty: 1,
    InStock: 5,
    fastDelivery: false,
  },
  // biba
  {
    brand: "Biba",
    description: "BIBA Women Kurta",
    imageUrl: "https://m.media-amazon.com/images/I/81e5mEQgBgL._UY550_.jpg",
    price: 720,
    qty: 1,
    InStock: 8,
    fastDelivery: true,
  },
  {
    brand: "Harpa",
    description: "Harpa Women Dress ",
    imageUrl: "https://m.media-amazon.com/images/I/91D73h1V9NL._UY879_.jpg",
    price: 559,
    qty: 1,
    InStock: 7,
    fastDelivery: true,
  },
  {
    brand: "Biba",
    description: "BIBA Women's Synthetic Regular Kurta",
    imageUrl: "https://m.media-amazon.com/images/I/91yXXOE+IbL._UX522_.jpg",
    price: 779,
    qty: 1,
    InStock: 7,
    fastDelivery: false,
  },
  {
    brand: "Harpa",
    description: "Harpa Women's Polyester A-Line Midi Dress",
    imageUrl: "https://m.media-amazon.com/images/I/61Bv8YMdu6S._UX679_.jpg",
    price: 857,
    qty: 1,
    InStock: 8,
    fastDelivery: true,
  },
  {
    brand: "Biba",
    description: "BIBA Women's Cotton Kurta",
    imageUrl: "https://m.media-amazon.com/images/I/81Ng+pK7GaL._UX522_.jpg",
    price: 1169,
    qty: 1,
    InStock: 5,
    fastDelivery: true,
  },
  //allen soly
  {
    brand: "Allen Solly",
    description: "Allen Solly Men's Regular Fit Polo",
    imageUrl: "https://m.media-amazon.com/images/I/81ZuNtvMq+L._UY550_.jpg",
    price: 728,
    qty: 1,
    InStock: 5,
    fastDelivery: true,
  },
  {
    brand: "Aarika",
    description: "Aarika Baby-Girls Dress",

    imageUrl: "https://m.media-amazon.com/images/I/518pbXQ3LKL._UY741_.jpg",
    price: 470,
    qty: 1,
    InStock: 6,
    fastDelivery: true,
  },
  {
    brand: "Harpa",
    description: "Harpa Women Maxi A-Line Dress GR5976_Black_M",
    imageUrl: "https://m.media-amazon.com/images/I/614c58Wh8LL._UX679_.jpg",
    price: 671,
    qty: 1,
    InStock: 5,
    fastDelivery: false,
  },
  {
    brand: "Allen Solly",
    description: "Allen Solly Men's Regular Fit T Shirt",
    imageUrl: "https://m.media-amazon.com/images/I/51aQt0Yuj4L._UY550_.jpg",
    price: 832,
    qty: 1,
    InStock: 5,
    fastDelivery: false,
  },
  {
    brand: "Aarika",
    description: "Aarika Girl's Net A-Line Maxi Dress",

    imageUrl: "https://m.media-amazon.com/images/I/51NdGQaWoML._UY879_.jpg",
    price: 739,
    qty: 1,
    InStock: 5,
    fastDelivery: true,
  },

  {
    brand: "Allen Solly",
    description: "Allen Solly Men's Regular Fit T-Shirt",
    imageUrl: "https://m.media-amazon.com/images/I/71m0PW9bIML._UY550_.jpg",
    price: 419,
    qty: 1,
    InStock: 6,
    fastDelivery: true,
  },
  {
    brand: "Allen Solly",
    description: "Allen Solly Men Polo",
    imageUrl: "https://m.media-amazon.com/images/I/71WmwSot-vL._UY550_.jpg",
    price: 581,
    qty: 1,
    InStock: 7,
    fastDelivery: true,
  },
  //van heusen
  {
    brand: "Van Heusen",
    description: "Van Heusen Men's Regular T-Shirt",
    imageUrl: "https://m.media-amazon.com/images/I/71vD+94t-lS._UY879_.jpg",
    price: 500,
    qty: 1,
    InStock: 5,
    fastDelivery: true,
  },
  {
    brand: "Van Heusen",
    description: "Van Heusen Men Polo Shirt",

    imageUrl: "https://m.media-amazon.com/images/I/61qgRKHxBEL._UY879_.jpg",
    price: 819,
    qty: 1,
    InStock: 7,
    fastDelivery: false,
  },

  //kids
  {
    brand: "Aarika",
    description: "Aarika Girls Dress",

    imageUrl: "https://m.media-amazon.com/images/I/61WefmdNgYL._UY879_.jpg",
    price: 604,
    qty: 1,
    InStock: 9,
    fastDelivery: true,
  },

  {
    brand: "Arayna",
    description:
      "Arayna Women's Rayon Printed Anarkali Kurti Palazzo Pants Set with Dupatta ",
    imageUrl: "https://m.media-amazon.com/images/I/61i-ZAcBrPL._UX679_.jpg",
    price: 899,
    qty: 1,
    InStock: 5,
    fastDelivery: true,
  },
];

module.exports = products;
