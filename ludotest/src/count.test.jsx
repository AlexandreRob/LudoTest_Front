import { render, fireEvent } from 'solid-testing-library';
import MyComponent from './MyComponent';

describe('MyComponent', () => {
  it('should increment the count when the button is clicked', () => {
    const { container, getByText } = render(MyComponent);

    const incrementButton = getByText('Increment');
    expect(container.innerHTML).toContain('Count: 0');

    fireEvent.click(incrementButton);
    expect(container.innerHTML).toContain('Count: 1');
  });
});
