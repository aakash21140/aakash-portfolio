import type { MouseEvent } from "react";

export function navigateToSection(event: MouseEvent<HTMLAnchorElement>, id: string) {
  const destination = new URL(event.currentTarget.href);
  const target = document.getElementById(id);

  event.preventDefault();

  if (destination.pathname === window.location.pathname && target) {
    window.history.pushState(window.history.state, "", destination);
    target.scrollIntoView({ behavior: "instant", block: "start" });
    return;
  }

  window.location.assign(destination.href);
}
