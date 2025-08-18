import { goto } from '$app/navigation'
import { PUBLIC_BASE_URL } from '$env/static/public'
import type { UserStats } from './User'

export interface VideoSource {
        file?: File
        url?: string
        name: string
        type: string
        size?: number
        duration?: number
}

export interface Video {
        id: number
        name: string
        format: string
        views: number
        size: number
        duration: number
        created_at: number
        file_key: string
        thumb_key: string
        state: string
}

export interface LoadVideoOpts {
        page: number
        limit: number
}

export interface UpdateVideoOpts {
        name: string
}

export async function LoadVideos(opts: LoadVideoOpts): Promise<Video[]> {
        if (opts.page < 0) {
                throw new Error("Page can't be smaller than 0")
        }

        if (opts.limit < 1 || opts.limit > 250) {
                throw new Error("Limit must be between 1-250")
        }

        const resp = await fetch(`${PUBLIC_BASE_URL}/api/files/bulk?limit=${opts.limit}&page=${opts.page}`, {
                method: "GET",
                credentials: "include"
        })

        const body = await resp.json()

        if (resp.status === 200) return body

        console.error(`[${body.requestID}] LoadVideos request failed: ${body.error}`)

        switch (resp.status) {
                case 400:
                        throw new Error("Reqest is invalid")
                case 401:
                        goto("/login")
                        return []
                case 404:
                        return []
                case 429: throw new Error("You are being rate limited")
                default:
                        throw new Error("Something went wrong, please check the console for more information")
        }
}

export async function LoadVideo(id: string | number): Promise<Video | undefined> {
        const resp = await fetch(`${PUBLIC_BASE_URL}/api/files/${id}`, {
                method: "GET",
                credentials: "include"
        })

        const body = await resp.json()

        if (resp.status === 200) return body

        console.error(`[${body.requestID}] LoadVideos request failed: ${body.error}`)

        switch (resp.status) {
                case 400:
                        throw new Error("Reqest is invalid")
                case 401:
                        goto("/login")
                        return
                case 404:
                        return
                case 429: throw new Error("You are being rate limited")


                default:
                        throw new Error("Something went wrong, please check the console for more information")
        }
}

export async function SearchVideos(search: string, limit: number): Promise<Video[]> {
        if (search === "") {
                return LoadVideos({ limit: limit, page: 0 })
        }

        const resp = await fetch(`${PUBLIC_BASE_URL}/api/files/search?query=${encodeURIComponent(search)}&limit=${limit}`, {
                credentials: "include"
        })

        const body = await resp.json()

        if (resp.status === 200) return body

        console.error(`[${body.requestID}] LoadVideos request failed: ${body.error}`)

        switch (resp.status) {
                case 400: throw new Error("Request is invalid")
                case 429: throw new Error("You are being rate limited")

                default:
                        throw new Error("Something went wrong, please check the console for more information")
        }
}

export async function DeleteVideo(videoID: number | string): Promise<UserStats> {
        const resp = await fetch(`${PUBLIC_BASE_URL}/api/files/${videoID}`, {
                method: 'DELETE',
                credentials: 'include'
        })

        const body = await resp.json()

        if (resp.status === 200) {
                return body
        }

        throw new Error(body.error)
}

export async function OwnsVideo(videoID: number | string): Promise<boolean> {
        const resp = await fetch(`${PUBLIC_BASE_URL}/api/files/${videoID}/owns`, {
                method: 'GET',
                credentials: 'include'
        })

        const body = await resp.json()

        if (resp.status !== 200 && resp.status !== 403) {
                throw new Error(body.error)
        }

        return body.owns
}

export async function UpdateVideo(videoID: number | string, opts: UpdateVideoOpts): Promise<Video | undefined> {
        const resp = await fetch(`${PUBLIC_BASE_URL}/api/files/${videoID}`, {
                method: "PATCH",
                credentials: "include",
                body: JSON.stringify(opts)
        })

        const body = await resp.json()

        if (resp.status === 200) return body

        console.error(`[${body.requestID}] UpdateVideo request failed: ${body.error}`)

        switch (resp.status) {
                case 400:
                        throw new Error("Reqest is invalid")
                case 401:
                        goto("/login")
                        return
                case 404:
                        return
                case 429: throw new Error("You are being rate limited")

                default:
                        throw new Error("Something went wrong, please check the console for more information")
        }
}