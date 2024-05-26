import { useEffect } from "react";

const useNotification = (callback: () => void, delay: number) => {
  useEffect(() => {
    const id = setInterval(callback, delay);
    return () => clearInterval(id);
  }, [callback, delay]);
};

export default useNotification;
