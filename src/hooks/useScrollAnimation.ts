import { useEffect } from "react";

const useScrollAnimation = (ready: boolean) => {
  useEffect(() => {
    if (!ready) return;

    const elements = document.querySelectorAll(".animatable");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animated");
          }
        });
      },
      { threshold: 0.2 }
    );

    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, [ready]);
};

export default useScrollAnimation;
