import { string, number, shape } from "prop-types";

export const account = shape({
  id: number,
  number: number,
  balance: number,
  userId: number
});

export const user = shape({
  id: number,
  name: string
});

export const contact = shape({
  id: number,
  email: string.isRequired,
  twitterHandle: string.isRequired,
  message: string.isRequired
});
