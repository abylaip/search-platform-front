import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useMutation } from "@hooks";
import ClipLoader from "react-spinners/ClipLoader";
import { IDiploma } from "@types";
import FormData from "form-data";
import axios from "axios";
import Cookies from "js-cookie";

export const DissertationModal = ({
  showModal,
  setShowModal,
}: {
  showModal: boolean;
  setShowModal: any;
}) => {
  const [uploadedJson, setUploadedJson] = useState<any>();
  const [dissertation, setDissertation] = useState({
    name: "",
    category: "",
    dissertAbstract: "",
    files: [],
  });
  const [isLoading, setIsLoading] = useState(false);
  const [next, setNext] = useState(false);
  const uploadDissertation = () => {
    !isLoading && setShowModal(false);
  };

  useEffect(() => {
    if (uploadedJson) {
      setDissertation({ ...dissertation, files: uploadedJson });
      axios
        .post(`${process.env.NEXT_PUBLIC_API_URL}/dissertation`, dissertation, {
          headers: {
            Authorization: `Bearer ${Cookies.get("access_token")}`,
          },
        })
        .then((result) => {
          setUploadedJson(result);
          setIsLoading(true);
        })
        .catch((error) => {
          alert("Не получилось загрузить фотографии");
        });
    }
  }, [uploadedJson]);

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
                {isLoading && (
                  <ClipLoader
                    color={"#949292"}
                    loading={true}
                    size={30}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  />
                )}
              </div>
              <div className="flex flex-row space-x-2 w-full mb-2">
                <div
                  className={`h-2 rounded ${
                    !next ? "bg-primary" : "bg-slate-300"
                  } w-full cursor-pointer`}
                  onClick={() => setNext(false)}
                />
                <div
                  className={`h-2 rounded ${
                    next ? "bg-primary" : "bg-slate-300"
                  } w-full cursor-pointer`}
                  onClick={() => setNext(true)}
                />
              </div>
              {!next ? (
                <StepOne
                  setDissertation={setDissertation}
                  dissertation={dissertation}
                  setNext={setNext}
                />
              ) : (
                <StepTwo
                  uploadDissertation={uploadDissertation}
                  setUploadedJson={setUploadedJson}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StepOne = ({
  setDissertation,
  dissertation,
  setNext,
}: {
  setDissertation: any;
  dissertation: any;
  setNext: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <>
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
          onClick={() => setNext(true)}
          className="w-full bg-accent text-white rounded-lg py-3 font-semibold"
        >
          Дальше
        </button>
      </div>
    </>
  );
};

const StepTwo = ({
  uploadDissertation,
  setUploadedJson,
}: {
  uploadDissertation: () => void;
  setUploadedJson: Dispatch<any>;
}) => {
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);

  const onUploadFiles = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const files = e.target.files;
    if (!!files && files.length > 0) {
      setLoading(true);
      const formData = new FormData();
      for (const data of Array.from(files)) {
        formData.append("files", data, data.name);
      }
      axios
        .post(`${process.env.NEXT_PUBLIC_API_URL}/fs`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${Cookies.get("access_token")}`,
          },
        })
        .then((result) => {
          setUploadedJson(result.data);
          setLoading(false);
          setReady(true);
        })
        .catch((error) => {
          alert("Не получилось загрузить фотографии");
        });
    }
  };

  return (
    <>
      <div className="flex flex-col space-y-3">
        <div className="w-full rounded-lg border-dashed border-2 border-slate-300 h-40 flex justify-center items-center">
          {loading ? (
            <ClipLoader
              color={"#949292"}
              loading={true}
              size={30}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          ) : ready ? (
            <div className="text-green-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-10 h-10"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>
            </div>
          ) : (
            <label className="cursor-pointer text-slate-400 flex flex-col space-y-4 items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-10 h-10"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                />
              </svg>
              <p>Просмотр файлов</p>
              <input
                type="file"
                multiple
                onChange={onUploadFiles}
                className="hidden"
              />
            </label>
          )}
        </div>
        <button
          disabled={!ready}
          onClick={uploadDissertation}
          className="w-full bg-accent text-white rounded-lg py-3 font-semibold"
        >
          Загрузить
        </button>
      </div>
    </>
  );
};
