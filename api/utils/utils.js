import { UploadClient } from "@uploadcare/upload-client";
import multer from "multer";

export const uploadClient = new UploadClient({ publicKey: process.env.UPLOADCARE_PUB_KEY });
export const upload = multer({ storage: multer.memoryStorage() });
