import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
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

  return <video className="w-screen h-screen object-cover" ref={videoRef} />;
};

export default Scanner;
