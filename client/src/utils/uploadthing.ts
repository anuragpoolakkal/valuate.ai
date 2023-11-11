// Resource: https://docs.uploadthing.com/api-reference/react#generatereacthelpers

import { generateComponents } from "@uploadthing/react";

import type { OurFileRouter } from "@/app/api/uploadthing/core";

export const { UploadButton, UploadDropzone, Uploader } = generateComponents<OurFileRouter>();
