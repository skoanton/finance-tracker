import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

type FileUploaderProps = {};

export default function FileUploader({}: FileUploaderProps) {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  return (
    <>
      <Input type="file" onChange={handleFileChange} />
    </>
  );
}
