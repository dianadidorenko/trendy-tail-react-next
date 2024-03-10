import { useState } from "react";

export default function DeleteButton({ label, onDelete }) {
  const [showConfirm, setShowConfirm] = useState(false);

  if (showConfirm) {
    return (
      <div className="fixed bg-black/80 items-center h-full inset-0 flex justify-center">
        <div className=" bg-white p-4 rounded-lg ">
          <div>Видалити товар?</div>
          <div className="flex gap-2 mt-1 justify-center">
            <button
              type="button"
              className="text-sm border-2 p-2 rounded-lg hover:bg-slate-200 transition"
              onClick={() => setShowConfirm(false)}
            >
              Відмінити
            </button>
            <button
              type="button"
              onClick={() => {
                onDelete();
                setShowConfirm(false);
              }}
              className="bg-redColor text-white text-sm border-2 p-2 rounded-lg hover:bg-slate-200 transition"
            >
              Так,&nbsp; видалити
            </button>
          </div>
        </div>
      </div>
    );
  }
  return (
    <button
      type="button"
      onClick={() => setShowConfirm(true)}
      className="text-sm border-2 p-2 rounded-lg hover:bg-slate-200 transition"
    >
      {label}
    </button>
  );
}
