import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function CustomRedirectTo({ urlPath }) {
  const navigateTo = useNavigate();

  useEffect(() => {
    if (urlPath) {
      navigateTo(urlPath);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <></>;
}
