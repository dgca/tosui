import useBaseUrl from "@docusaurus/useBaseUrl";

import styles from "./styles.module.css";

type StorybookEmbedProps = {
  storyId: string;
  title?: string;
  height?: number;
};

export default function StorybookEmbed({
  storyId,
  title = "Storybook example",
  height = 220,
}: StorybookEmbedProps) {
  const isDevelopment = process.env.NODE_ENV === "development";
  const storybookBaseUrl = isDevelopment
    ? "http://localhost:6006/"
    : useBaseUrl("/storybook/");
  const iframeUrl = `${storybookBaseUrl}iframe.html?id=${encodeURIComponent(
    storyId
  )}&viewMode=story`;
  const storyUrl = `${storybookBaseUrl}?path=/story/${encodeURIComponent(
    storyId
  )}`;

  return (
    <div className={styles.wrapper}>
      <iframe
        className={styles.frame}
        src={iframeUrl}
        title={title}
        loading="lazy"
        style={{ height }}
      />
      <div className={styles.meta}>
        <a href={storyUrl} target="_blank" rel="noreferrer">
          Open in Storybook
        </a>
      </div>
    </div>
  );
}
