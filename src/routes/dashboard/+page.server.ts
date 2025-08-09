import { LoadInitalData } from '$lib/api/User'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async () => {
        return await LoadInitalData()
}