import { useEffect } from "react";

/**
 * Sets <title> and the meta description for the current page and restores
 * the previous values when the page unmounts.
 */
export function usePageMeta(title, description) {
  useEffect(() => {
    const prevTitle = document.title;
    const metaDesc = document.querySelector('meta[name="description"]');
    const prevDesc = metaDesc?.getAttribute("content");

    document.title = title;
    if (metaDesc && description) metaDesc.setAttribute("content", description);

    return () => {
      document.title = prevTitle;
      if (metaDesc && prevDesc != null) metaDesc.setAttribute("content", prevDesc);
    };
  }, [title, description]);
}
