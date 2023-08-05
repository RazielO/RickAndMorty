import cn from "classnames";
import { useEffect, useState } from "react";

export const StatusImage = (props: {
  src: string | undefined;
  alt: string | undefined;
  status: string | undefined;
}) => {
  const { src, alt, status } = props;
  const [shadowColor, setShadowColor] = useState<string>("");

  useEffect(() => {
    switch (status) {
      case "Alive":
        setShadowColor("#22c55e");
        break;
      case "Dead":
        setShadowColor("#ef4444");
        break;
      default:
        setShadowColor("#facc15");
        break;
    }
  }, [status]);

  return (
    <img
      src={src}
      alt={alt}
      className={cn(
        status === "Alive"
          ? "ring-green-500"
          : status === "Dead"
          ? "ring-red-500"
          : "ring-yellow-500",
        "h-full aspect-square object-cover rounded-full sm:max-w-[33%] sm:rounded-full drop-shadow-xl"
      )}
      style={{
        boxShadow: `0 4px 8px 0 ${shadowColor}, 0 -4px 20px 0 ${shadowColor}`,
      }}
    />
  );
};
