import { createSignal } from 'solid-js';

function MyComponent() {
  const [count, setCount] = createSignal(0);

  const increment = () => {
    setCount(count() + 1);
  };

  return (
    <div>
      <h1>Count: {count()}</h1>
      <button onClick={increment}>Increment</button>
    </div>
  );
}

export default MyComponent;
