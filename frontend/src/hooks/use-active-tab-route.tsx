import { useState, useEffect } from "react";
import { useLocation, matchPath } from "react-router-dom";

export function useActiveTabRoute(props: [string, string][]) {
  const location = useLocation();
  const [activeRoute, setActiveRoute] = useState<string | undefined>(undefined);
  useEffect(() => {
    props.forEach(([path, value]) => {
      const isActive = matchPath(path, window.location.pathname);
      if (isActive) {
        setActiveRoute(value);
      }
    });
  }, [location.pathname, props]);
  return activeRoute;
}
