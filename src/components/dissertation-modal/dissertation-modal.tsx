import { useState } from "react";
import { useMutation } from "@hooks";
import ClipLoader from "react-spinners/ClipLoader";
import { IDiploma } from "@types";

export const DissertationModal = ({
  showModal,
  setShowModal,
}: {
  showModal: boolean;
  setShowModal: any;
}) => {
  const [dissertation, setDissertation] = useState({
    name: "",
    category: "",
    dissertAbstract: "",
  });
  const [response, postDissertationCall] = useMutation<IDiploma>(
    `${process.env.NEXT_PUBLIC_API_URL}/dissertation`,
    "POST"
  );
  const { isLoading } = response;
  const uploadDissertation = () => {
    postDissertationCall(dissertation);
  };

  return (
    <div
      className={`${
        showModal ? "flex" : "hidden"
      } justify-center pt-16 overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-black bg-opacity-50`}
    >
      <div className={`relative my-6 mx-auto w-5/12`}>
        <div className="border-0 rounded-2xl shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none opacity-100">
          <div className="flex flex-col items-start justify-between p-5 b rounded-t">
            <div className="flex w-full justify-end">
              <button
                className="text-primary"
                onClick={() => setShowModal(false)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="w-full">
              <div className="flex flex-row space-x-4 items-center">
                <p className="text-center text-2xl font-semibold text-accent mb-3">
                  Загрузить дипломную работу
                </p>
                {isLoading ? (
                  <ClipLoader
                    color={"#949292"}
                    loading={true}
                    size={30}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  />
                ) : (
                  setShowModal(false)
                )}
              </div>
              <div className="flex flex-col space-y-4">
                <div>
                  <p className="font-semibold">Название дипломной работы</p>
                  <input
                    type="text"
                    className="w-full border rounded-lg p-2 outline-none"
                    value={dissertation.name}
                    placeholder="Введите название"
                    onChange={(e) =>
                      setDissertation({ ...dissertation, name: e.target.value })
                    }
                  />
                </div>
                <div>
                  <p className="font-semibold">Категория</p>
                  <input
                    type="text"
                    className={`w-full border rounded-lg p-2 outline-none`}
                    placeholder="напр. Software Engineering"
                    onChange={(e) =>
                      setDissertation({
                        ...dissertation,
                        category: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <p className="font-semibold">Абстракт</p>
                  <textarea
                    name="abstract"
                    placeholder="макс. 1500 символов"
                    className="w-full outline-none border rounded-lg p-2"
                    cols={4}
                    rows={10}
                    maxLength={1500}
                    onChange={(e) =>
                      setDissertation({
                        ...dissertation,
                        dissertAbstract: e.target.value,
                      })
                    }
                  ></textarea>
                </div>
                <button
                  onClick={uploadDissertation}
                  className="w-full bg-accent text-white rounded-lg py-3 font-semibold"
                >
                  Загрузить
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
