const users = [
  {
    id: 1,
    name: "Joel",
    email: "joel@mcd.com"
  },
  {
    id: 2,
    name: "Cory",
    email: "cory@reactjsconsulting.com"
  }
];

const accounts = [
  {
    id: 1,
    number: 38283,
    balance: 340.42,
    userId: 1
  },
  {
    id: 2,
    number: 93832,
    balance: 140.42,
    userId: 2
  }
];

const contact = [];

// Using CommonJS style export so we can consume via Node (without using Babel-node)
module.exports = {
  users,
  accounts,
  contact
};
