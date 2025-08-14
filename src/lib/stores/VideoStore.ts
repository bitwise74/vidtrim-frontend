import type { Video } from '$lib/api/Files'
import type { UserStats } from '$lib/api/User'
import { writable } from 'svelte/store'

export const duration = writable(0)
export const currentTime = writable(0)

export const currentVideoURL = writable('')
export const currentVideo = writable<Video|null>(null)
export const videos = writable<Video[]>([])
export const stats = writable<UserStats>({} as UserStats)