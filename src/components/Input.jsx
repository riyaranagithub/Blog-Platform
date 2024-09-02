import React, { useId } from "react";

const Input = React.forwardRef(function Input(
  { label, 
    type = "text", 
    className = "",
     ...props },
  ref
) {
  const id = useId();
  return (
    <div className="w-full">
      {label && (
        <label className="mb-1 inline-block pl-1 " htmlFor={id}>
          {label}
        </label>
      )}
      <input
        type={type}
        className={`px-2 py-1 border rounded ${className}`}
        ref={ref}
        {...props}
        id={id}
      />
    </div>
  );
});

export default Input;


// How Ref Forwarding Works
// React.forwardRef:

// React.forwardRef is used to wrap the Input component. This enables the component to receive a ref prop that is passed down from the parent component.
// The ref is then forwarded to the input element inside the Input component.
// Ref in Parent Component:

// In the parent component, you can create a ref using React.useRef() and pass it to the Input component.
// The ref now directly points to the actual DOM element (the input field) in the child component, allowing you to interact with it.