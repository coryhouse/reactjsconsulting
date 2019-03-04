import { string, number, shape } from "prop-types";

export const course = shape({
  id: number,
  title: string,
  category: string
});
