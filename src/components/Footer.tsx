export default function Footer() {
  return (
    <footer className="z-10 fixed bottom-0 bg-black w-full border-t-2 border-t-grayish/50 text-whitish">
      <div className="flex max-w-6xl mx-auto items-center md:justify-between sm:py-4 py-2 flex-col md:flex-row px-10 text-xs md:text-md sm:text-sm">
        <div>
          Built by{" "}
          <a
            target="_blank"
            href="https://twitter.com/metaboners"
            rel="noreferrer"
            className="text-accent"
          >
            @metaboners #ApeFollowApe
          </a>
        </div>
        <div>
          Support us at{" "}
          <a
            target="_blank"
            href="https://etherscan.io/address/0x10d9a213537a52138fe1e1cd9ea9da14070586da"
            rel="noreferrer"
            className="text-accent"
          >
            metaboners.eth
          </a>
        </div>
      </div>
    </footer>
  );
}
