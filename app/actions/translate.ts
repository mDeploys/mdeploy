"use server"

export async function translateText(text: string, targetLang: string = "ar"): Promise<string> {
    if (!text) return ""

    try {
        const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`
        const response = await fetch(url)
        const data = await response.json()

        // data[0] contains the translated segments
        // data[0][0][0] is the first segment
        if (data && data[0]) {
            return data[0].map((segment: any) => segment[0]).join("")
        }
        return text
    } catch (error) {
        console.error("Translation error:", error)
        return text // Fallback to original
    }
}
