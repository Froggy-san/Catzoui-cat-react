//// !IMPORTANT react dropzone npm i react-dropzone // to be able to drag and drop files into an application . https://react-dropzone.js.org/

import { Button } from "@/components/ui/button";
import { useCallback, useState } from "react";
import { FileWithPath, useDropzone } from "react-dropzone";
import { LuImagePlus } from "react-icons/lu";

type AvatarProps = {
  fieldChange: (FILES: File[]) => void;
  mediaUrl?: string;
};

const Avatar = ({ fieldChange, mediaUrl }: AvatarProps) => {
  const [fileUrl, setFileUrl] = useState(mediaUrl);
  const [file, setFile] = useState<File[]>([]);

  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      console.log(acceptedFiles, "accepted files here !!");
      console.log(acceptedFiles[0], "accepted files[0] here !!");

      console.log(
        URL.createObjectURL(acceptedFiles[0]),
        "accepted files as an object here !!"
      ); // blob:http://localhost:5173/a2ccf787-a3b6-4677-be12-581aed9c4033 accepted files as an object here !!

      // Do something with the files
      setFile(acceptedFiles);
      fieldChange(acceptedFiles); // according to bing this calls the onChange function and sends the file array to the input.
      setFileUrl(URL.createObjectURL(acceptedFiles[0]));
    },
    [file]
  );

  /// the second parameter in the useDropzone hook is the accept object, you pust what can the from accept from the user .

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpeg", ".jpg", ".svg"],
    },
  });

  return (
    <div
      {...getRootProps()}
      className="flex item-center justify-center flex-col  rounded-xl cursor-pointer"
    >
      <input {...getInputProps()} className="cursor-pointer " />
      {fileUrl ? (
        <>
          <div className="flex h-[350px] xs:h-[470px] md:h-[550px]  justify-center w-full p-1 xs:p-5 lg:p-10 ">
            <img
              src={fileUrl}
              alt="image"
              className="w-full h-full rounded-xl"
            />
          </div>
          <p className="mx-auto">Click or drag phto to replace</p>
        </>
      ) : (
        <div className=" flex flex-col justify-center items-center  p-7 h-80 lg:h-[612px]">
          <LuImagePlus size={45} />
          <h3 className="base-medium text-light-2 mb-2 mt-6">
            Drag photo here
          </h3>
          <p className="text-light-4 small-regular mb-6">SVG, PNG, JPG</p>
          <Button className="shad-button_dark_4">Select from computer</Button>
        </div>
      )}
    </div>
  );
};

export default Avatar;
