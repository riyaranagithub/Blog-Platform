import React from 'react'

function Container({container}) {
  return (
    <div className='w-full max-w-7xl m-auto px-4'>{container}</div>
  )
}

export default Container



// ### 1. Container

// **File:** `Container.jsx`

// This component wraps its children in a responsive container with a maximum width.

// - **Props:**
//   - `container`: The content or components to be wrapped.

// **Usage:**

// ```jsx
// import Container from './components/Container';

// <Container container={<YourComponent />} />
