import { uploadClient } from "../utils/utils.js";

export const uploadToUploadCare = async (req, res, next) => {
  try {
    if (!req.file) {
      console.log("No file found");
      res.status(400).json({ Error: "No file uploaded" });
    }
    const fileBuffer = req.file.buffer;
    const fileName = req.file.originalname;
    const result = await uploadClient.uploadFile(fileBuffer, {
      fileName,
      contentType: req.file.mimetype,
      store: true,
    });
    console.log("Uploaded file==>", result);
    // attach file URL to request so next middleware can use it
    const resUrl = `https://nal5eytndp.ucarecd.net/${result.uuid}/${result.name}`;
    req.uploadedFileUrl = resUrl;

    console.log("req.uploadedFileUrl==>", resUrl);

    next(); //✅ move to addProduct next
  } catch (error) {
    console.error("Upload error =>", error);
    res.status(500).json({ error: "File upload failed" });
  }
};
