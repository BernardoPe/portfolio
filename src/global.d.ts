declare module '*.css';

declare module '@streamdown/code' {
  import type { CodeHighlighterPlugin } from 'streamdown';

  export const code: CodeHighlighterPlugin;
  export function createCodePlugin(options?: { themes?: [string, string] }): CodeHighlighterPlugin;
}
