import { marked, type Tokens } from 'marked';
import { memo, useMemo } from 'react';
import { Streamdown } from 'streamdown';
import { code } from '@streamdown/code';

function parseMarkdownIntoBlocks(markdown: string): string[] {
  const tokens: TokensList = marked.lexer(markdown);
  return tokens.map((token: Tokens.Generic) => token.raw);
}

type TokensList = Array<Tokens.Generic & { raw: string }>;

const MemoizedMarkdownBlock = memo(
  ({ content }: { content: string }) => (
    <div className="markdown-body">
      <Streamdown plugins={{ code }} linkSafety={{ enabled: false }}>
        {content}
      </Streamdown>
    </div>
  ),
  (prevProps, nextProps) => prevProps.content === nextProps.content
);

MemoizedMarkdownBlock.displayName = 'MemoizedMarkdownBlock';

export const MemoizedMarkdown = memo(({ content, id }: { content: string; id: string }) => {
  const blocks = useMemo(() => parseMarkdownIntoBlocks(content), [content]);
  return blocks.map((block, index) => (
    <MemoizedMarkdownBlock content={block} key={`${id}-block_${index}`} />
  ));
});

MemoizedMarkdown.displayName = 'MemoizedMarkdown';
