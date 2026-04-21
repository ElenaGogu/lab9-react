import { useState, useEffect } from "react";

function useTimer(timpulInitial) {
  const [timp, setTimp] = useState(timpulInitial);

  useEffect(() => {
    if (timp <= 0) {
      return;
    }
    if (timpulInitial === 0) {
      return;
    }

    const intervalTimp = setInterval(() => {
      setTimp((timp) => timp - 1);
    }, 1000);
    return () => clearInterval(intervalTimp);
  }, [timp, timpulInitial]);

  const resetTimp = () => setTimp(timpulInitial);

  return { timp, resetTimp };
}
export default useTimer;
