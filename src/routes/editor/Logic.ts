import { PUBLIC_BASE_URL } from '$env/static/public'
import type { Video } from '$lib/api/Files'
import { get, writable } from 'svelte/store'

export interface ProcessOptions {
        file: File
        targetSize: number
        trimStart: number
        trimEnd: number
        processingSpeed: string
}

export const turnstileToken = writable("")
export const jobProgress = writable(0.0)

export async function processVideo(options: ProcessOptions) {
        const { file, trimStart, trimEnd, targetSize, processingSpeed } = options
        if (!file) {
                throw new Error("No file provided")
        }

        const form = new FormData()
        form.append("file", file)

        if (trimStart > 0) {
                form.append("trimStart", `${trimStart}`)
        }

        if (trimEnd > 0) {
                form.append("trimEnd", `${trimEnd}`)
        }

        if (targetSize > 0) {
                form.append("targetSize", `${targetSize}`)
        }

        form.append("processingSpeed", `${processingSpeed}`)

        // Get job ID
        const jobIDResp = await fetch(`${PUBLIC_BASE_URL}/api/ffmpeg/start`, {
                "method": "GET",
                credentials: "include"
        })

        if (jobIDResp.status != 200) {
                const body = await jobIDResp.json()

                switch (jobIDResp.status) {
                        case 401:
                                throw new Error("Unauthorized")
                        case 403:
                                throw new Error("A job is already running. Please wait for it to finish")
                case 429: throw new Error("You are being rate limited")

                        case 500:
                                throw new Error(`Something went wrong while processing your request. Request ID: ${body.requestID} Error: ${body.error}`)
                        default:
                                throw new Error(body.error)
                }
        }

        const jobID = (await jobIDResp.json()).jobID
        const source = new EventSource(`${PUBLIC_BASE_URL}/api/ffmpeg/progress?jobID=${jobID}`, {
                withCredentials: true
        })

        source.onmessage = function (event) {
                const v = parseFloat(event.data)

                if (v >= 100) {
                        source.close()
                }

                jobProgress.set(v)
        }

        const resp = await fetch(`${PUBLIC_BASE_URL}/api/ffmpeg/process?jobID=${jobID}`, {
                method: "POST",
                headers: {
                        "TurnstileToken": get(turnstileToken),
                },
                credentials: "include",
                body: form,
        })

        if (resp.status === 200) {
                return await resp.blob()
        }

        const body = await resp.json()

        switch (resp.status) {
                case 400:
                        throw new Error(body.error)
                case 401:
                        throw new Error("Turnstile failed to verify that you're not a bot. Please refresh the page")
                case 413:
                        throw new Error("File is too big")
                case 429: throw new Error("You are being rate limited")

                case 500:
                        throw new Error(`Something went wrong while processing your request. Request ID: ${body.requestID} Error: ${body.error}`)
                default:
                        throw new Error(`Unknown error`)
        }

}

export async function SaveToCloud(file: File): Promise<Video | undefined> {
        const form = new FormData()

        form.append("file", file)

        const resp = await fetch(`${PUBLIC_BASE_URL}/api/files`, {
                method: "POST",
                credentials: "include",
                body: form,
        })

        const body = await resp.json()

        switch (resp.status) {
                case 200:
                        return body
                case 400:
                        throw new Error(body.error)
                case 413:
                        throw new Error("File too large")
                case 429: throw new Error("You are being rate limited")

                case 500:
                        throw new Error(`Something went wrong while processing your request. Request ID: ${body.requestID} Error: ${body.error}`)
        }
}