import { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BrowserMultiFormatReader } from "@zxing/library";

const Scanner = () => {
  const videoRef = useRef(null); // reference to <video> element
  const reader = useRef(new BrowserMultiFormatReader()); // ZXing scanner instance
  const navigate = useNavigate(); // router navigation

  useEffect(() => {
    if (!videoRef.current) return; // if the <video> element isn’t mounted yet

    // Start the camera
    reader.current.decodeFromConstraints(
      {
        audio: false,
        video: {
          facingMode: "environment", // use back camera
        },
      },
      videoRef.current,
      (result, error) => {
        if (result) {
          navigate(`/item/${result.text}`); // if found navigate to item page
        } else if (error && !(error.name === "NotFoundException")) {
          console.log(error);
        }
      }
    );

    return () => {
      reader.current.reset(); // stop scanner on unmount
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
