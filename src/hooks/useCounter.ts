import { useState, useEffect } from "react";
import type { TimeState } from "../types";

export function useCounter(startDate: Date): TimeState {
  const [time, setTime] = useState<TimeState>({});
  useEffect(() => {
    const calc = () => {
      const now = new Date();
      const diff = now.getTime() - startDate.getTime();
      const totalDays = Math.floor(diff / 86400000);
      const years = Math.floor(totalDays / 365.25);
      const months = Math.floor((totalDays - years * 365.25) / 30.44);
      const days = Math.floor(totalDays - years * 365.25 - months * 30.44);
      setTime({ years, months, days, totalDays });
    };
    calc();
    const id = setInterval(calc, 30000);
    return () => clearInterval(id);
  }, [startDate]);
  return time;
}
