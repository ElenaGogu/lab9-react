import { useState } from "react";

function useLocalStorage(cheie, valoareInitiala) {
  const [valoare, setValoare] = useState(() => {
    try {
      const elementSalvat = localStorage.getItem(cheie);
      return elementSalvat ? JSON.parse(elementSalvat) : valoareInitiala;
    } catch {
      return valoareInitiala;
    }
  });

  const setSiSalveaza = (valoareNoua) => {
    try {
      setValoare(valoareNoua);
      localStorage.setItem(cheie, JSON.stringify(valoareNoua));
    } catch (eroare) {
      console.error("Eroare la salvare:", eroare);
    }
  };

  return [valoare, setSiSalveaza];
}

export default useLocalStorage;
