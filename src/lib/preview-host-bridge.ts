import type { AnyRoute } from "@tanstack/react-router";

export function collectRoutePathsFromTree(_tree?: AnyRoute): string[] {
  return ["/", "/modules/$id"];
}

export function installPreviewHostBridge(_opts: {
  navigate: (path: string) => void;
  getRoutePaths: () => string[];
}): () => void {
  return () => {};
}
