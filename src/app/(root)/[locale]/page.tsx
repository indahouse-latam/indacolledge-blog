import { ArticlesFilters } from "@/modules/core/components/articles-filters/ArticlesFilters";
import { FeaturedArticles } from "@/modules/core/components/featured-articles/FeaturedArticles";
import { Hero } from "@/modules/core/components/hero/Hero";
import { PreloaderComponent } from "@/modules/core/components/preloader/preloader-injection/PreloaderInjection";

type HomeProps = {
  searchParams: Promise<{ query?: string; status?: string }>;
};

export default async function Home(props: HomeProps) {
  return (
    <>
      <PreloaderComponent />
      <Hero {...props} />
      <ArticlesFilters {...props} />
      <FeaturedArticles {...props} />
    </>
  );
}
