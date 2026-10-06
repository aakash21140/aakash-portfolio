"use client";

import { useEffect, type ComponentProps } from "react";
import { assetPath } from "@/content/assetPath";
import { isSamePathname, navigateToSection } from "./sectionNavigation";

type SectionLinkProps = Omit<ComponentProps<"a">, "href"> & {
  href: string;
  sectionId: string;
};

export default function SectionLink({ href, sectionId, onClick, ...props }: SectionLinkProps) {
  const destinationHref = assetPath(href);

  useEffect(() => {
    const navigationEntry = performance.getEntriesByType("navigation").find(
      (entry): entry is PerformanceNavigationTiming => entry.entryType === "navigation",
    );
    if (navigationEntry?.type === "reload") {
      return;
    }

    const destination = new URL(destinationHref, window.location.href);
    if (!isSamePathname(destination.pathname, window.location.pathname) || destination.hash !== window.location.hash) {
      return;
    }

    document.getElementById(sectionId)?.scrollIntoView({ behavior: "instant", block: "start" });
  }, [destinationHref, sectionId]);

  return (
    <a
      href={destinationHref}
      {...props}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) {
          navigateToSection(event, sectionId);
        }
      }}
    />
  );
}
