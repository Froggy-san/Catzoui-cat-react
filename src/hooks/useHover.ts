import { useState, useEffect, useRef } from "react";

function useHover() {
  const [hover, setHover] = useState(false);

  const ref = useRef<HTMLSpanElement>(null);

  const handleMouseEnter = () => setHover(true);
  const handleMouseLeave = () => setHover(false);

  useEffect(
    () => {
      const node = ref.current;
      if (node) {
        node.addEventListener("mouseenter", handleMouseEnter);
        node.addEventListener("mouseleave", handleMouseLeave);

        return () => {
          node.removeEventListener("mouseenter", handleMouseEnter);
          node.removeEventListener("mouseleave", handleMouseLeave);
        };
      }
    },
    [ref.current] // Recall only if ref changes , am typing this, removing the ref.current will not effect anything to know more see what bing wrote down there.
  );

  return [ref, hover];
}

export default useHover;

{
  /*
Hello, this is Copilot. I’m here to help you with your coding questions. 😊

The reason why you have ref.current in the dependency array of useEffect is to make sure that the effect is updated whenever the ref changes. This is useful when the ref is pointing to a DOM element that might be replaced or removed by another component. For example, if you have a conditional rendering logic that switches between two elements with different refs, you want the effect to re-run when the ref changes, so that the event listeners are attached to the correct element.

However, in your case, you are using a ref to point to a span element that is always rendered by the same component. Therefore, the ref will not change unless you manually assign a new value to it. That’s why removing the ref.current from the dependency array does not affect the functionality of your hook. The effect will only run once when the component mounts, and the event listeners will be attached to the span element.

If you want to learn more about React refs and how to use them with useEffect, you can check out these links:

Referencing Values with Refs – React: This is the official React documentation that explains what refs are, how to create them, and how to use them with DOM elements and custom components.
A complete guide to React refs - LogRocket Blog: This is a blog post that covers the basics of React refs, the differences between callback refs and useRef, the use cases and benefits of refs, and some common pitfalls and best practices.
I hope this helps. Happy coding! 😄*/
}
