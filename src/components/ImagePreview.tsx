import { Button } from "@mantine/core";
import Image from "next/image";

type Props = {
  file: File | null;
  setFile: (file: File | null) => void;
};

const ImagePreview = ({ file, setFile }: Props) => {
  return (
    <>
      {file && (
        <div className="flex flex-row gap-1">
          <div className="flex flex-col gap-1">
            <Image
              src={URL.createObjectURL(file)}
              alt="Image Preview"
              width="0"
              height="0"
              sizes="100vw"
              className="mb-3 h-40 w-40 rounded object-cover"
            />
          </div>
          <Button
            type="button"
            uppercase
            className="text-red-800 hover:bg-neutral-900 hover:text-red-600"
            onClick={() => setFile(null)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>
          </Button>
        </div>
      )}
    </>
  );
};

export default ImagePreview;
