import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "mDeploy - Professional Deployment Services",
        short_name: "mDeploy",
        description:
            "Professional deployment services for websites, web applications, mobile apps, and desktop applications.",
        start_url: "/",
        display: "standalone",
        background_color: "#000000",
        theme_color: "#000000",
        icons: [
            {
                src: "/icon-light-32x32.png",
                sizes: "32x32",
                type: "image/png",
            },
            {
                src: "/icon-dark-32x32.png",
                sizes: "32x32",
                type: "image/png",
            },
            {
                src: "/apple-icon.png",
                sizes: "192x192",
                type: "image/png",
            },
            {
                src: "/logo.png",
                sizes: "512x512",
                type: "image/png",
            },
        ],
    }
}
