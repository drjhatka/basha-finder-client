import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import {UploadableFile} from "@/components/shared/Formik/MultipleImageUploadField";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function extractUrlArrayFromImages(images:UploadableFile[]) {
    return images.map((image) => {return image.url})
}
