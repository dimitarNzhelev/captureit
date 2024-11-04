import { env } from "./src/env.js";

/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");

/** @type {import("next").NextConfig} */
const config = {
    images: {
        domains: [`${env.AWS_BUCKET_NAME}.s3.${env.AWS_REGION}.amazonaws.com`],
    },
};


export default config;
