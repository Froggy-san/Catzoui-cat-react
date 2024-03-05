import { useCallback, useEffect, useState } from "react";
import { FileWithPath, useDropzone } from "react-dropzone";
import { ImFilePicture } from "react-icons/im";

import { BsUpload } from "react-icons/bs";
import { Button } from "../ui/button";

type FileUploaderProps = {
  fieldChange: (FILES: File[] | (string | null)[]) => void;
  mediaUrl?: (string | null)[] | undefined;
};

const FileUploader = ({ fieldChange, mediaUrl }: FileUploaderProps) => {
  const [file, setFile] = useState<File[] | (string | null)[]>([]);

  const [fileUrls, setFileUrls] = useState<(string | null)[] | []>(
    mediaUrl || []
  );

  useEffect(() => {
    if (mediaUrl) {
      setFile(mediaUrl);
      fieldChange(mediaUrl);
    }
  }, []);

  // const urls: string[] = [];
  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      // Do something with the files

      setFile(acceptedFiles);
      fieldChange(acceptedFiles);
      const urls = acceptedFiles.map((file: File) => URL.createObjectURL(file));

      setFileUrls(urls);
    },
    [file]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpeg", ".jpg", ".svg"],
    },
  });
  return (
    <div
      {...getRootProps()}
      className="flex justify-center items-center flex-wrap    flex-col rounded-xl cursor-pointer h-80 lg:h-[500px] bg-slate-100 "
    >
      <input {...getInputProps()} className="cursor-pointer" />

      {fileUrls.length ? (
        <div className="flex flex-col w-full h-full">
          <div className="flex justify-center  gap-5 h-full w-full   p-4 flex-wrap overflow-y-auto">
            {fileUrls.map((image, i) => (
              <div key={i} className={`w-[250px ]    rounded-lg h-full`}>
                <img
                  src={image || ""}
                  alt="image"
                  key={i}
                  className="rounded-lg h-full"
                />
              </div>
            ))}
          </div>
          <hr className="w-[96%] mx-auto h-[.5px] bg-slate-500 " />
          <p className="h-12 flex gap-2 justify-center items-center text-slate-500">
            <ImFilePicture size={15} />
            Click or drag photo to replace
          </p>
        </div>
      ) : (
        <div className=" flex flex-col items-center justify-center w-full text-slate-500 rounded-[24px] object-cover object-top">
          <BsUpload size={50} />
          <h3 className="font-semibold mt-4">Drag photo here</h3>
          <p>SVG, PNG, JPG</p>

          <Button className="mt-5">Select from computer</Button>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
