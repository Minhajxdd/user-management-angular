import multer from 'multer';

// Multer
const Storage = multer.diskStorage({
    destination: (req: any, file: any, cb: any) => {
        cb(null, "./dist/public/uploads");
    },
    filename: (req: any, file: any, cb: any) => {
        cb(null, Date.now() + "-" + file.originalname);
    },
});

export const upload = multer({ storage: Storage });
// Multer