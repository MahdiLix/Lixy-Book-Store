import { useEffect, useState } from "react";

export default function FeedbackMessage({
  message,
  type = "success",
}) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!message) return;

    setShow(true);

    const timer = setTimeout(() => {
      setShow(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [message]);

  if (!message || !show) return null;

  const styles =
    type === "success"
      ? "bg-emerald-600 border-emerald-400"
      : "bg-red-600 border-red-400";

  return (
    <div
      className={`
        fixed
        bottom-6
        left-1/2
        -translate-x-1/2
        z-[9999]
        px-6
        py-4
        rounded-xl
        border
        shadow-2xl
        text-white
        font-medium
        backdrop-blur-md
        animate-fadeIn
        transition-all
        duration-300
        ${styles}
      `}
    >
      {message}
    </div>
  );
}