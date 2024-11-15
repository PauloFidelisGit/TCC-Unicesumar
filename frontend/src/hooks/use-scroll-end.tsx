import { useEffect, useState } from "react";

export function useScrollEnd(offset = 1) {
  const [isScrollEnd, setIsScrollEnd] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const documentHeight = document.documentElement.scrollHeight;
      const currentScroll = window.scrollY + window.innerHeight;

      // Atualiza o estado para true quando chega ao fim da página
      if (currentScroll + offset >= documentHeight) {
        setIsScrollEnd(true);
      } else {
        setIsScrollEnd(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return isScrollEnd;
}
