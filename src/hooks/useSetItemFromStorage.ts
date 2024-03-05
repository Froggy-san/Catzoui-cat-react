import { useEffect } from "react";

// a custon hook where we set and item in the localStorage, swe the hook takes a key , and a stateName where you assgin a value to it , aslo we put the stateName in the dependency so when ever the state changes it resets the localStorage again .

// useEffect(() => {
//   localStorage.setItem("wishList", JSON.stringify(wished));
// }, [wished]);

function useSetItemFromStorage(
  key: string,
  value: number[] | string[] | { id: number; rating: number }[]
) {
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value]);
}

export default useSetItemFromStorage;
