import { ChangeEvent, useEffect, useState } from "react";

interface Props {
  onSelect?: (file: File) => void;
  defaultPreview?: string;
  "data-testid"?: string;
  id?: string;
  className?: string;
  alt?: string;
}

export const ImageUpload = ({
  defaultPreview = "https://cdn-icons-png.flaticon.com/512/1246/1246351.png?w=1380&t=st=1671013157~exp=1671013757~hmac=4a114ead5a59993afbb0e76b47fa2db7c8403209a4672cb7ebbdba62a98b76d3",
  onSelect = () => {},
  "data-testid": dataTestId,
  id = "sb-image-upload",
  className="w-20 h-20 rounded-full m-10 justify-center",
  alt="Profile Image"
}: Props) => {
  const [selectedFile, setSelectedFile] = useState<File>();
  const [preview, setPreview] = useState<string>(defaultPreview);
  const [reSelect, setReSelect] = useState<boolean>(true);

  // create a preview as a side effect, whenever selected file is changed
  useEffect(() => {
    if (!selectedFile) {
      setPreview(defaultPreview);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const onSelectFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }

    // I've kept this example simple by using the first image instead of multiple
    onSelect(e.target.files[0]);
    setSelectedFile(e.target.files[0]);
    // setReSelect()
  };

  return (
    <div suppressHydrationWarning={true}>
      <img src={preview} alt={alt} className={className} />
      <input type="file" onChange={(e) =>onSelectFile(e)} id={id} accept="image/png, image/gif, image/jpeg" />
    </div>
  );
};
