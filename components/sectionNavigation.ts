import type { MouseEvent } from "react";

export function isSamePathname(first: string, second: string) {
  const normalize = (pathname: string) => pathname.replace(/\/+$/, "") || "/";
  return normalize(first) === normalize(second);
}

export function navigateToSection(event: MouseEvent<HTMLAnchorElement>, id: string) {
  const destination = new URL(event.currentTarget.href);
  const target = document.getElementById(id);

  event.preventDefault();

  if (isSamePathname(destination.pathname, window.location.pathname) && target) {
    const currentUrl = new URL(window.location.href);
    currentUrl.hash = destination.hash;
    window.history.pushState(window.history.state, "", currentUrl);
    target.scrollIntoView({ behavior: "instant", block: "start" });
    return;
  }

  window.location.assign(destination.href);
}
