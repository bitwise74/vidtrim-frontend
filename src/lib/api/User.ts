import { PUBLIC_BASE_URL } from '$env/static/public'
import type { Video } from './Files'

export type UserStats = {
        maxStorage: number
        usedStorage: number
        uploadedFiles: number
        totalViews: number
        totalWatchTime: number
}

export interface InitialData {
        Videos: Video[]
        Stats: UserStats
}

export async function LoadInitalData(): Promise<InitialData> {
        const resp = await fetch(`${PUBLIC_BASE_URL}/api/users`, {
                method: "GET",
                credentials: "include"
        })

        const body = await resp.json()     
        
        // Only possible codes are 200 and 500
        if (resp.status !== 200) throw new Error(body.error)
        return body
}