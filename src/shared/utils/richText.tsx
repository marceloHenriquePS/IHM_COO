import { Fragment, type ReactNode } from "react";

export function renderRichText(text?: string): ReactNode {
  if (!text) return null;

  return text.split("**").map((part, i) =>
    i % 2 === 1 ? <b key={i}>{part}</b> : <Fragment key={i}>{part}</Fragment>
  );
}