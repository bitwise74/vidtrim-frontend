import { goto } from '$app/navigation'
import { PUBLIC_BASE_URL } from '$env/static/public'

export type InitialData = {
        Videos: Video[]
        Stats: Stats
}

export type Stats = {
        maxStorage: number 
        usedStorage: number
        uploadedFiles: number
        totalViews: number
        totalWatchTime: number
}

export type Video = {
        id: number
        name: string
        private: boolean
        format: string
        views: number
        size: number
        duration: number
        created_at: number
        state: string
}

export async function LoadVideos(page: number): Promise<Video[]> {
        const resp = await fetch(`${PUBLIC_BASE_URL}/api/files/bulk?limit=20&page=${page}`, {
                method: "GET",
                credentials: "include"
        })

        const body = await resp.json()

        switch (resp.status) {
                case 200:
                        return body
                case 400:
                        throw new Error(body.error)
                case 401:
                        goto("/login")
                        return []
                case 404: 
                        return []
                case 500:
                        throw new Error(`Something went wrong while processing your request. Request ID: ${body.requestID} Error: ${body.error}`)
        }

        return []
}

export async function searchFiles(search: string, limit: string): Promise<Video[]> {
        if (search === "") {
                return LoadVideos(0)
        }

        const resp = await fetch(`${PUBLIC_BASE_URL}/api/files/search?query=${encodeURIComponent(search)}&limit=${limit}`, {
                credentials: "include"
        })

        const body = await resp.json()
        return body
}


export function UpdateFilter(v: Video[], query: string, filterBy: string, sortBy: string): Video[] {
        let filtered = v

        if (query) {
                filtered = filtered.filter(v => {
                        v.name.toLowerCase().includes(query.toLowerCase())
                })
        }

        if (filterBy !== "all") {
                filtered = filtered.filter(v => v.format === filterBy)
        }

        filtered = filtered.sort((a, b) => {
                switch (sortBy) {
                        case 'newest':
                                return b.created_at - a.created_at
                        case 'oldest':
                                return a.created_at - b.created_at
                        case 'name':
                                return a.name.localeCompare(b.name)
                        case 'views':
                                return b.views - a.views
                        default:
                                return 0
                }
        })

        return filtered
}