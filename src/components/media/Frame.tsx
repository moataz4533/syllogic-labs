import { useState } from "react";
import { cn } from "@/lib/utils";

export function MediaImg({
  src,
  alt,
  className,
  priority = false,
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}) {
  const [url, setUrl] = useState(src);
  return (
    <img
      src={url}
      alt={alt}
      className={cn("object-cover", className)}
      fetchPriority={priority ? "high" : undefined}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      onError={() => {
        if (url.endsWith(".jpg")) setUrl(url.replace(/\.jpg$/, ".svg"));
      }}
    />
  );
}
