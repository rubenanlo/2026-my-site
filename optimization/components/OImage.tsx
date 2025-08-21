import images from "@/optimization/images.json";
import { clsx } from "clsx";
import { CldImage } from "next-cloudinary";
import Image from "next/image";
import { useState } from "react";

export default function OImage({
  className,
  original,
}: {
  className: string;
  original: string;
}) {
  type Image = {
    alt: string;
    format: string;
    src: string;
    width: number;
    height: number;
  };

  const { format, ...originalImage } = (images.find(
    ({ alt }) => alt === original
  ) || {}) as Image;

  const [imageSrc, setImageSrc] = useState(originalImage);
  const [isFallback, setIsFallback] = useState(false);

  // on error, we only need to change the src from the cloudinary id to a
  // relative path. Ensure that babel has this alias, and that all images are
  // saved in one directory
  const handleError = () => {
    if (isFallback) return;
    setIsFallback(true);
    setImageSrc({
      ...originalImage,
      src: `/assets/${original}.${format}`,
    });
  };

  // Switching component based on whether the image is available on cloudinary
  let Component = isFallback ? Image : CldImage;

  return (
    <Component
      className={clsx(className)}
      {...imageSrc}
      onError={handleError}
    />
  );
}
