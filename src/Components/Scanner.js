import { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BrowserMultiFormatReader } from "@zxing/library";

const Scanner = () => {
  const navigate = useNavigate();

  const videoRef = useRef(null);
  const reader = useRef(new BrowserMultiFormatReader());

  useEffect(() => {
    if (!videoRef.current) return;
    reader.current.decodeFromConstraints(
      {
        audio: false,
        video: {
          facingMode: "environment",
        },
      },
      videoRef.current,
      (result, error) => {
        if (result) navigate(`/item/${result.text}`);
        if (error) console.log(error);
      }
    );
    return () => {
      reader.current.reset();
    };
  }, [videoRef]);

  return (
    <div className="fixed inset-0 flex items-end justify-center">
      <video
        className="absolute inset-0 w-full h-full object-cover"
        ref={videoRef}
      />
      <Link
        className="relative z-10 text-white bg-red-600 px-5 py-3 m-[5vh] rounded-3xl font-bold  hover:bg-red-700  active:shadow-2xl"
        to="/"
      >
        Stop Scanning
      </Link>
    </div>
  );
};

export default Scanner;
