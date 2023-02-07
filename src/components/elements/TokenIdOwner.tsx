interface IfaceTokenIdOwner {
  token_id: string;
  owner_address: string;
}
export default function TokenIdOwner({
  token_id,
  owner_address,
}: IfaceTokenIdOwner) {
  return (
    <div className="flex justify-between px-3 pb-3 text-sm lg:text-md">
      <h3 className="font-bold text-md"># {token_id}</h3>
      <a
        href={`https://etherscan.io/address/${owner_address}`}
        target="_blank"
        rel="noreferrer"
        className="font-bold hover:underline"
      >
        {`${owner_address.slice(0, 5)}...${owner_address.slice(-4, -1)}`}
      </a>
    </div>
  );
}
