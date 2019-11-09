import React from 'react';
import Input from './Input';
import { render } from '@testing-library/react';

describe('Input', () => {
  it('should tie the label to the input via htmlFor', () => {
    const { getByLabelText } = render(
      <Input
        id="test"
        label="Test"
        onChange={() => {}}
        value="Test Value"
        type="text"
      />
    );

    getByLabelText('Test');
  });
});
