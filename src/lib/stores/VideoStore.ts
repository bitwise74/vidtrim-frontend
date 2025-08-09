import { writable } from 'svelte/store'
import { type Stats, type Video } from '../../routes/dashboard/dashboard'

export const duration = writable(0)
export const currentTime = writable(0)

export const currentVideoURL = writable('')
export const videos = writable<Video[]>([])
export const stats = writable<Stats>()