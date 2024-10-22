import Image from "next/image";
import { useRef, ChangeEvent } from "react";
import { MdOutlineAddAPhoto } from "react-icons/md";

function FormFieldPhoto() {
  const tagImg = useRef<null | HTMLImageElement>(null);

  function handleFile(e: ChangeEvent<HTMLInputElement>) {
    const input = e.currentTarget;

    if (!input.files?.length) {
      return;
    }

    tagImg.current?.classList.remove("hidden");

    const reader = new FileReader();
    reader.onload = () => {
      if (tagImg.current) {
        tagImg.current.src = String(reader.result);
      }
    };

    reader.readAsDataURL(input.files![0]);
  }

  return (
    <label className="flex h-24 w-36 border border-gray5 rounded-lg cursor-pointer relative overflow-hidden">
      <div className="w-full flex flex-col items-center justify-center gap-[0.125rem]">
        <MdOutlineAddAPhoto size={36} className="text-brand1" />
        <span className="text-xs font-medium text-brand1">Adicionar foto</span>
        <span className="text-[0.625rem] font-normal text-gray3">
          JPG e PNG somente
        </span>
      </div>
      <Image
        ref={tagImg}
        src=""
        alt=""
        className="hidden absolute top-0 left-0 h-full w-full object-cover"
      />
      <input type="file" className="hidden photo" onChange={handleFile} />
    </label>
  );
}

export default FormFieldPhoto;
