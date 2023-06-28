import { useAccount, useNetwork, useSignTypedData, type Address } from "wagmi";

export default function Home() {
  const { chain } = useNetwork();
  const { address } = useAccount();

  return (
    <div>
      {address ? "" : "Please connect your wallet"}
      {chain?.id ? <SignDataComponent chainId={chain.id} /> : ""}
    </div>
  );
}

function SignDataComponent({ chainId }: { chainId: number }) {
  const domain: {
    name: string;
    version: string;
    chainId: number;
    verifyingContract: Address;
  } = {
    name: "Ether Mail",
    version: "1",
    chainId,
    verifyingContract: "0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC",
  };

  const types = {
    Person: [
      { name: "name", type: "string" },
      { name: "wallet", type: "address" },
    ],
    Mail: [
      { name: "from", type: "Person" },
      { name: "to", type: "Person" },
      { name: "contents", type: "string" },
    ],
  } as const;

  const value = {
    from: {
      name: "Cow",
      wallet: "0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826",
    },
    to: {
      name: "Bob",
      wallet: "0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB",
    },
    contents: "Hello, Bob!",
  } as const;

  const { data, isError, isLoading, isSuccess, signTypedDataAsync } =
    useSignTypedData({
      domain,
      types,
      value,
    });

  return (
    <div>
      <button disabled={isLoading} onClick={() => signTypedDataAsync()}>
        Sign typed data
      </button>
      {isSuccess && <div>Signature: {data}</div>}
      {isError && <div>Error signing message</div>}
    </div>
  );
}
