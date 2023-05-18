const DissertationPage = () => {
  return (
    <>
      <div className="px-32 py-5 flex flex-col space-y-5">
        <p className="text-gray-400 cursor-default">
          Главная страница / <span>Поиск дипломных работ</span> /{" "}
          <span className="font-semibold text-accent">Дипломная работа</span>
        </p>
        <section className="flex flex-col space-y-4 rounded-lg bg-white shadow-lg py-5 px-7">
          <p className="text-4xl font-bold text-accent">
            Diploma Search Platform
          </p>
          <p className="text-2xl">
            Категория:{" "}
            <span className="font-semibold text-primary">
              Software Engineering
            </span>
          </p>
          <div className="flex flex-col">
            <p className="text-xl text-accent font-semibold">Абстракт:</p>
            <p>dsalmdkasl</p>
          </div>
        </section>
      </div>
    </>
  );
};

export default DissertationPage;
