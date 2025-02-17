interface ArticleContentProps {
  content: string;
}

export const ArticleContent = ({ content }: ArticleContentProps) => (
  <article
    className="prose max-w-4xl font-work-sans break-all"
    dangerouslySetInnerHTML={{ __html: content }}
  />
);
