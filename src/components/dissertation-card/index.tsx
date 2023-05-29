import { useRouter } from "next/router";

export const DissertationCard = ({
  id,
  name,
  category,
  organizationName,
  dissertAbstract,
  setShowSearchInput,
}: {
  id: number;
  name: string;
  category: string;
  organizationName: string;
  dissertAbstract: string;
  setShowSearchInput: (val: boolean) => void;
}) => {
  const router = useRouter();
  return (
    <div
      onClick={() => {
        router.push(`/dissertation/${id}`);
        setShowSearchInput(false);
      }}
      className="rounded-xl p-3 flex flex-col space-3 bg-white w-[800px] mt-5 cursor-pointer"
    >
      <p className="text-lg font-semibold">{name}</p>
      <p className="text-slate-500">{category}</p>
      <p className="text-gray-400">{organizationName}</p>
      <p>
        <span className="font-bold">Abstract. </span>
        {dissertAbstract}
      </p>
    </div>
  );
};
