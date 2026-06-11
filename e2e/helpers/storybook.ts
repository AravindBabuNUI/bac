/** Returns the iframe URL for a Storybook story. baseURL is set per-project in playwright.config.ts. */
export const storybookUrl = (storyId: string) =>
  `/iframe.html?id=${storyId}&viewMode=story`;
