"use client";
import { useState } from "react";

export function useFilteredTypes() {
  const [filterTypes, setFilterTypes] = useState({
    property: "",
    location: "",
    description: "",
    prize: 0,
  });

  return { filterTypes, setFilterTypes };
}
