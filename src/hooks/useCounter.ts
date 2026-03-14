import { useState, useEffect } from "react";
import type { TimeState } from "../types";

export function useCounter(startDate: Date): TimeState {
  const [time, setTime] = useState<TimeState>({});
  useEffect(() => {
    const calc = () => {
      const now = new Date();
      const diff = now.getTime() - startDate.getTime();
      const totalDays = Math.floor(diff / 86400000);

      // Cálculo por datas do calendário (ex: 14/01 → 14/03 = 2 meses exatos)
      let years = now.getFullYear() - startDate.getFullYear();
      let months = now.getMonth() - startDate.getMonth();
      let days = now.getDate() - startDate.getDate();

      if (days < 0) {
        months--;
        const ultimoDiaMesAnterior = new Date(now.getFullYear(), now.getMonth(), 0);
        days += ultimoDiaMesAnterior.getDate();
      }
      if (months < 0) {
        years--;
        months += 12;
      }

      setTime({ years, months, days, totalDays });
    };
    calc();
    const id = setInterval(calc, 30000);
    return () => clearInterval(id);
  }, [startDate]);
  return time;
}
