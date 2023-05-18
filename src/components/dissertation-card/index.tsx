export const DissertationCard = ({
  name,
  category,
  organizationName,
  dissertAbstract,
}: {
  name: string;
  category: string;
  organizationName: string;
  dissertAbstract: string;
}) => {
  return (
    <div className="rounded-xl p-3 flex flex-col space-3 bg-white w-[800px] mt-5">
      <p className="text-lg font-semibold">{name}</p>
      <p className="text-slate-500 font-semibold">{category}</p>
      <p className="text-gray-400 font-semibold">{organizationName}</p>
      <p>
        <span className="font-bold">Abstract. </span>
        {dissertAbstract}
      </p>
    </div>
  );
};
