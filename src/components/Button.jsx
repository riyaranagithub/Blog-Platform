import React from 'react'

function Button({
    children,
    type="button",
    bgColor="bg-blue-600",
    text="white",
    className='',
    ...props
}) {
  return (
     <button className={`px-4 ${bgColor} ${text} ${className}`} {...props}>{children}</button>
  )
}

export default Button

// Explanation:
// created a Button component in React with customizable properties
// children: The children prop allows you to pass the content that will be displayed inside the button.
// type: Defaults to "button", but can be overridden when needed (e.g., "submit" for form buttons).
// bgColor: Controls the background color class of the button (default: "bg-blue-600").
// text: Controls the text color class of the button (default: "white").
// className: Allows for additional custom classes to be added.
// props: Spread operator (...props) is used to pass any additional props to the button element.