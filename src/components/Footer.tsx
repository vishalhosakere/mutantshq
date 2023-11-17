export default function Footer() {
  return (
    <footer className="z-10 fixed bottom-0 bg-black w-full border-t-2 border-t-grayish/50 text-whitish">
      <div className="flex max-w-6xl mx-auto items-center justify-center sm:py-4 py-2 flex-col md:flex-row px-10 text-xs md:text-md sm:text-sm">
        <div>
          Built by{" "}
          <a
            target="_blank"
            href="https://twitter.com/pseudo_echoo"
            rel="noreferrer"
            className="text-accent pr-3"
          >
            @pseudo_echoo
          </a>
          <a
            target="_blank"
            href="https://twitter.com/fusion_berry"
            rel="noreferrer"
            className="text-accent pr-3"
          >
            @fusion_berry
          </a>
          <a
            target="_blank"
            href="https://twitter.com/metaboners"
            rel="noreferrer"
            className="text-accent pr-3"
          >
            @metaboners
          </a>
        </div>
      </div>
    </footer>
  );
}
