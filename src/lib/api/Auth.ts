import { PUBLIC_BASE_URL } from '$env/static/public'

export interface AuthForm {
        password: string
        email: string
}

interface Response {
        requestID: string
        error: string
}

export async function Login(form: AuthForm) {
        const resp = await fetch(`${PUBLIC_BASE_URL}/api/users/login`, {
                method: "POST",
                body: JSON.stringify(form),
                headers: {
                        "Content-Type": "application/json",
                },
                credentials: "include"
        })

        if (resp.status === 200) return

        const body: Response = await resp.json()

        console.error(`[${body.requestID}] Login request failed: ${body.error}`)

        switch (resp.status) {
                case 400: throw new Error("Form is invalid")
                case 401: throw new Error("Email or password invalid")
                case 404: throw new Error("User with this e-mail address doesn't exist. Please register first")
                case 429: throw new Error("You are being rate limited")
                default: throw new Error("Something went wrong, please check the console for more information")
        }
}

export async function Register(form: AuthForm) {
        const resp = await fetch(`${PUBLIC_BASE_URL}/api/users`, {
                method: "POST",
                body: JSON.stringify(form),
                headers: {
                        "Content-Type": "application/json",
                }
        })

        if (resp.status === 200) return

        const body: Response = await resp.json()

        console.error(`[${body.requestID}] Login request failed: ${body.error}`)

        switch (resp.status) {
                case 400: throw new Error(body.error)
                case 401: throw new Error("Email or password invalid")
                case 409: throw new Error("User with this e-mail address already exists. Please log in")
                case 429: throw new Error("You are being rate limited")
                default: throw new Error(`Something went wrong, please check the console for more information`)
        }
}

export async function ValidateToken(): Promise<boolean> {
        const resp = await fetch(`${PUBLIC_BASE_URL}/api/validate`, {
                method: "HEAD",
                credentials: 'include'
        })

        return resp.status === 200
}