import useBaseUrl from "@docusaurus/useBaseUrl";

import styles from "./styles.module.css";

type StorybookEmbedProps = {
  storyId: string;
  title?: string;
  height?: number;
};

type StorybookLinkProps = {
  storyId?: string;
  children?: string;
};

function useStorybookBaseUrl() {
  const isDevelopment = process.env.NODE_ENV === "development";

  return isDevelopment ? "http://localhost:6006/" : useBaseUrl("/storybook/");
}

export function StorybookLink({
  storyId,
  children = "Open in Storybook",
}: StorybookLinkProps) {
  const storybookBaseUrl = useStorybookBaseUrl();
  const href = storyId
    ? `${storybookBaseUrl}?path=/story/${encodeURIComponent(storyId)}`
    : storybookBaseUrl;

  return (
    <a href={href} target="_blank" rel="noreferrer">
      {children}
    </a>
  );
}

export default function StorybookEmbed({
  storyId,
  title = "Storybook example",
  height = 220,
}: StorybookEmbedProps) {
  const storybookBaseUrl = useStorybookBaseUrl();
  const iframeUrl = `${storybookBaseUrl}iframe.html?id=${encodeURIComponent(
    storyId
  )}&viewMode=story`;

  return (
    <div className={styles.wrapper}>
      <iframe
        className={styles.frame}
        src={iframeUrl}
        title={title}
        loading="lazy"
        style={{ height }}
      />
    </div>
  );
}
