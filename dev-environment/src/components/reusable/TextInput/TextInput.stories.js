import React, { useState } from "react";
import { storiesOf } from "@storybook/react";
import TextInput from "./TextInput";
import { text, boolean } from "@storybook/addon-knobs";

// Consider https://github.com/Sambego/storybook-state instead
const TextInputExample = ({ value = "", required = false }) => {
  const [firstName, setFirstName] = useState(value);

  function handleChange(event) {
    setFirstName(event.target.value);
  }

  return (
    <TextInput
      label={text("label", "First Name")}
      value={text("value", firstName)}
      onChange={handleChange}
      required={boolean("required", required)}
      id="first-name"
    />
  );
};

storiesOf("TextInput", module)
  .add("Docs (no change handler)", () => (
    <TextInput
      label={text("label", "First Name")}
      value={text("value", "")}
      onChange={() => {}}
      required={boolean("required", false)}
      id="first-name"
    />
  ))
  .add("Optional example", () => <TextInputExample />)
  .add("Required example", () => <TextInputExample required />);
