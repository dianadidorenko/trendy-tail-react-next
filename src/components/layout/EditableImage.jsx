import toast from "react-hot-toast";
import Image from "next/image";

export default function EditableImage({ link, setLink }) {
  async function handleFileChange(e) {
    const files = e.target.files;

    if (files?.length === 1) {
      const data = new FormData();
      data.set("file", files[0]);

      const uploadPromise = new Promise((resolve, reject) => {
        fetch("/api/upload", {
          method: "POST",
          body: data,
        }).then((response) => {
          if (response.ok) {
            response.json().then((link) => {
              setLink(link);
              resolve();
            });
          } else reject();
        });
      });

      await toast.promise(uploadPromise, {
        loading: "Фото оновлюється...",
        success: "Фото оновлено!",
        error: "Помилка оновлення фото",
      });
    }
  }
  return (
    <>
      {link && (
        <Image
          src={link}
          alt="Аватар"
          width={300}
          height={300}
          className="rounded-full mb-2"
        />
      )}
      {!link && <div className="text-sm text-gray-400">Фото відсутнє</div>}
      <label className="flex flex-col items-center justify-center">
        <input type="file" className="hidden" onChange={handleFileChange} />
        <span className="text-xs cursor-pointer">Змінити фото</span>
      </label>
    </>
  );
}
