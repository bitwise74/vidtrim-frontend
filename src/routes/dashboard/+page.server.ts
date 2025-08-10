import { PUBLIC_BASE_URL } from '$env/static/public'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ fetch }) => {
        const resp = await fetch(`${PUBLIC_BASE_URL}/api/users`, {
                method: "GET",
                credentials: "include"
        })

        const body = await resp.json()

        if (resp.status >= 400) {
                throw new Error(body.error)
        }

        return {
                Videos: body.videos ?? [],
                Stats: body.stats
        }
}