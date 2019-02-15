import React from "react";
import TextInput from "./TextInput";
import renderer from "react-test-renderer";

it("renders correctly", () => {
  const tree = renderer
    .create(<TextInput label="label" value="value" />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
