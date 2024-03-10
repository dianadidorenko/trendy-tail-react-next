import Image from "next/image";
import { useState } from "react";

export function FullScreenImage({ src }) {
  const [isFullScreen, setIsFullScreen] = useState(false);

  const closeModal = () => {
    setIsFullScreen(false);
  };

  return (
    <div
      onClick={() => setIsFullScreen(!isFullScreen)}
      className={
        isFullScreen
          ? "items-img-active fixed bg-black/80 items-center h-full w-full inset-0 flex justify-center"
          : ""
      }
    >
      <div className={isFullScreen ? "items-active" : ""}>
        <Image
          src={src}
          alt="futbolka-maria"
          width={800}
          height={800}
          objectFit={"cover"}
          className={isFullScreen ? "" : "items-img rounded-md cursor-pointer"}
        />
        <p
          className="absolute -top-10 -right-10 text-2xl z-10 text-white cursor-pointer"
          onClick={closeModal}
        >
          x
        </p>
      </div>
    </div>
  );
}

export function FullScreenImageBig({ src }) {
  const [isFullScreenBig, setIsFullScreenBig] = useState(false);

  const closeModal = () => {
    setIsFullScreenBig(false);
  };

  return (
    <div
      onClick={() => setIsFullScreenBig(!isFullScreenBig)}
      className={
        isFullScreenBig
          ? "items-img-active fixed bg-black/80 items-center h-full w-full inset-0 flex justify-center"
          : ""
      }
    >
      <div className={isFullScreenBig ? "items-active" : ""}>
        <Image
          src={src}
          alt="futbolka-maria"
          width={800}
          height={800}
          objectFit={"cover"}
          className={
            isFullScreenBig ? "" : "items-img-big rounded-md cursor-pointer"
          }
        />
        <p
          className="absolute -top-10 -right-10 text-2xl z-10 text-white cursor-pointer"
          onClick={closeModal}
        >
          x
        </p>
      </div>
    </div>
  );
}
