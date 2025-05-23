import { createContext, useContext, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
const ScrollRestorationContext = createContext();

export const ScrollRestorationProvider = ({ children }) => {
  const location = useLocation();
  const scrollPositions = useRef({});

  useEffect(() => {
    const currentPath = location.pathname;

    return () => {
      const scrollY = window.scrollY;
      scrollPositions.current = {
        ...scrollPositions.current,
        [currentPath]: scrollY,
      };
    };
  }, [location]);

  useEffect(() => {
    const savedScrollPosition = scrollPositions.current[location.pathname] || 0;
    window.scrollTo(0, savedScrollPosition);
  }, [location]);

  return (
    <ScrollRestorationContext.Provider value={{}}>
      {children}
    </ScrollRestorationContext.Provider>
  );
};

export const useScrollRestoration = () => {
  return useContext(ScrollRestorationContext);
};
