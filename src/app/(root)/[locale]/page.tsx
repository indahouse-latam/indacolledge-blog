import { FeaturedArticles } from "@/modules/core/components/featured-articles/FeaturedArticles";
import { Hero } from "@/modules/core/components/hero/Hero";
import { PreloaderComponent } from "@/modules/core/components/preloader/preloader-injection/PreloaderInjection";

type HomeProps = {
  searchParams: Promise<{ query?: string }>;
};

export default function Home(props: HomeProps) {
  return (
    <>
      <PreloaderComponent />
      <Hero {...props} />
      <FeaturedArticles {...props} />
    </>
  );
}
