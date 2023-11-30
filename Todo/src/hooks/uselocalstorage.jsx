import React, { useState, useEffect } from "react";
const prefix = "Todo-";

export default function uselocalstorage(key, initialValue) {
  const prefixedKey = prefix + key;

  const [value, setValue] = useState(() => {
    const jsonvalue = localStorage.getItem(prefixedKey);

    if (jsonvalue != null) {
      return JSON.parse(jsonvalue);
    }
    if (typeof initialValue === "function") {
      return initialValue();
    } else {
      return initialValue;
    }
  });

  useEffect(() => {
    localStorage.setItem(prefixedKey, JSON.stringify(value));
  }, [prefixedKey, value]);

  return [value, setValue];
}
