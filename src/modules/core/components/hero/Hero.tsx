import { SearchForm } from "./SearchForm";

export const Hero = async ({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) => {
  const query = (await searchParams).query;

  return (
    <>
      <section className="hero_container">
        <h1 className="heading">
          Welcome to Indacollege <br /> A place to learn
        </h1>
        <p className="sub-heading !max-w-3xl">Watch our most recent articles</p>
        <SearchForm query={query} />
      </section>
    </>
  );
};
