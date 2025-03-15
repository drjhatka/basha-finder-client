import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import {UploadableFile} from "@/components/shared/Formik/MultipleImageUploadField";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function extractUrlArrayFromImages(images:UploadableFile[]) {
    return images.map((image) => {return image.url})
}

export function createSlideImageFromArray (imageUrls:string[]) {
  return imageUrls.map((url, index) => ({
      original: url,
      thumbnail: url.replace(/(\d+\/\d+\/\d+)$/, "250/150/"), // Adjust the URL to create a thumbnail
  }));
};