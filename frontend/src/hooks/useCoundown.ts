import { useEffect, useState } from "react";

const useCountdown = (initialTime = { days: 3, hours: 23, minutes: 19, seconds: 56 }) => {
    const [timeLeft, setTimeLeft] = useState(initialTime);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(({ days, hours, minutes, seconds }:{days:number,hours:number,minutes:number,seconds:number}) => {
                if (days === 0 && hours === 0 && minutes === 0 && seconds === 0) {
                    clearInterval(timer);
                    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
                }
                seconds--;
                if (seconds < 0) {
                    seconds = 59;
                    minutes--;
                }
                if (minutes < 0) {
                    minutes = 59;
                    hours--;
                }
                if (hours < 0) {
                    hours = 23;
                    days--;
                }
                return { days, hours, minutes, seconds };
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return timeLeft;
};
export default useCountdown