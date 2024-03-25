import { useCallback, useEffect, useState } from 'react'
import { FileWithPath, useDropzone } from 'react-dropzone'
import { ImFilePicture } from 'react-icons/im'

import { BsUpload } from 'react-icons/bs'
import { Button } from '../ui/button'

type FileUploaderProps = {
  fieldChange: (FILES: File[] | (string | null)[]) => void
  mediaUrl?: (string | null)[] | undefined
  disabled: boolean
}

const FileUploader = ({
  fieldChange,
  mediaUrl,
  disabled,
}: FileUploaderProps) => {
  const [file, setFile] = useState<File[] | (string | null)[]>([])
  const [fileUrls, setFileUrls] = useState<(string | null)[] | []>(
    mediaUrl || []
  )

  useEffect(() => {
    if (mediaUrl) {
      setFile(mediaUrl)
      fieldChange(mediaUrl)
      console.log(mediaUrl)
    }
  }, [])

  // const urls: string[] = [];
  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      // Do something with the files

      setFile(acceptedFiles)
      fieldChange(acceptedFiles)
      const urls = acceptedFiles.map((file: File) => URL.createObjectURL(file))

      setFileUrls(urls)
    },
    [file]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpeg', '.jpg', '.svg'],
    },
  })
  return (
    <div
      {...getRootProps()}
      className={`flex h-80 cursor-pointer flex-col    flex-wrap items-center justify-center rounded-xl bg-slate-100 lg:h-[500px] ${disabled ? 'cursor-not-allowed' : ''}`}
    >
      <input
        {...getInputProps()}
        className="cursor-pointer"
        disabled={disabled}
      />

      {fileUrls.length ? (
        <div
          className={`flex h-full w-full flex-col  ${disabled ? 'cursor-not-allowed' : ''}`}
        >
          <div className="flex h-full  w-full flex-wrap justify-center   gap-5 overflow-y-auto p-4">
            {fileUrls.map((image, i) => (
              <div key={i} className={`w-[250px ]    h-full rounded-lg`}>
                <img
                  src={image || ''}
                  alt="image"
                  key={i}
                  className="h-full rounded-lg"
                />
              </div>
            ))}
          </div>
          <hr className="mx-auto h-[.5px] w-[96%] bg-slate-500 " />
          <p className="flex h-12 items-center justify-center gap-2 text-slate-500">
            <ImFilePicture size={15} />
            Click or drag photo to replace
          </p>
        </div>
      ) : (
        <div
          className={`flex w-full flex-col items-center justify-center rounded-[24px] object-cover object-top text-slate-500 ${disabled ? 'cursor-not-allowed' : ''}`}
        >
          <BsUpload size={50} />
          <h3 className="mt-4 font-semibold">Drag photo here</h3>
          <p>SVG, PNG, JPG</p>

          <Button className="mt-5">Select from computer</Button>
        </div>
      )}
    </div>
  )
}

export default FileUploader
