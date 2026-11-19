import { useEffect } from "react";

const BASE_URL = "https://vtaxi.co.in";

/**
 * World-class dynamic page metadata hook:
 * Manages document title, meta description, canonical URL,
 * OpenGraph tags, Twitter Card tags, and robots directives per route.
 * Supports both function signatures:
 *   usePageMeta(title, description, { path, image, type })
 *   usePageMeta({ title, description, path, image, type })
 */
export function usePageMeta(titleOrConfig, maybeDescription, maybeConfig = {}) {
  const config =
    typeof titleOrConfig === "object" && titleOrConfig !== null
      ? titleOrConfig
      : {
          title: titleOrConfig,
          description: maybeDescription,
          ...maybeConfig,
        };

  const {
    title,
    description,
    path = "",
    type = "website",
    image = "/images/social/v-taxi-og-cover.webp",
  } = config;

  useEffect(() => {
    if (typeof window === "undefined") return;

    const prevTitle = document.title;
    const url = `${BASE_URL}${path ? (path.startsWith("/") ? path : `/${path}`) : ""}`;
    const fullImage = image.startsWith("http") ? image : `${BASE_URL}${image}`;

    // Helper to get or create a meta tag
    const updateMeta = (selector, attributeName, attributeValue, contentValue) => {
      let el = document.querySelector(selector);
      const prevContent = el?.getAttribute("content");
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attributeName, attributeValue);
        document.head.appendChild(el);
      }
      if (contentValue != null) {
        el.setAttribute("content", contentValue);
      }
      return () => {
        if (el) {
          if (prevContent != null) {
            el.setAttribute("content", prevContent);
          }
        }
      };
    };

    // Helper for link tags (e.g. canonical)
    const updateLink = (rel, hrefValue) => {
      let link = document.querySelector(`link[rel="${rel}"]`);
      const prevHref = link?.getAttribute("href");
      if (!link) {
        link = document.createElement("link");
        link.setAttribute("rel", rel);
        document.head.appendChild(link);
      }
      if (hrefValue != null) {
        link.setAttribute("href", hrefValue);
      }
      return () => {
        if (link && prevHref != null) {
          link.setAttribute("href", prevHref);
        }
      };
    };

    if (title) {
      document.title = title;
    }

    const cleanups = [
      title ? updateMeta('meta[name="title"]', "name", "title", title) : null,
      description
        ? updateMeta('meta[name="description"]', "name", "description", description)
        : null,
      updateLink("canonical", url),
      title
        ? updateMeta('meta[property="og:title"]', "property", "og:title", title)
        : null,
      description
        ? updateMeta(
            'meta[property="og:description"]',
            "property",
            "og:description",
            description
          )
        : null,
      updateMeta('meta[property="og:url"]', "property", "og:url", url),
      updateMeta('meta[property="og:type"]', "property", "og:type", type),
      updateMeta('meta[property="og:image"]', "property", "og:image", fullImage),
      title
        ? updateMeta('meta[name="twitter:title"]', "name", "twitter:title", title)
        : null,
      description
        ? updateMeta(
            'meta[name="twitter:description"]',
            "name",
            "twitter:description",
            description
          )
        : null,
      updateMeta('meta[name="twitter:url"]', "name", "twitter:url", url),
      updateMeta('meta[name="twitter:image"]', "name", "twitter:image", fullImage),
    ].filter(Boolean);

    return () => {
      document.title = prevTitle;
      cleanups.forEach((cleanup) => cleanup && cleanup());
    };
  }, [title, description, path, type, image]);
}
