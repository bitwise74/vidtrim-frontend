import { PUBLIC_BASE_URL } from '$env/static/public'

type AuthData = {
        password: string
        email: string
}

type Response = {
        requestID: string
        error: string
}

export async function Login(form: AuthData) {
        const resp = await fetch(`${PUBLIC_BASE_URL}/api/users/login`, {
                method: "POST",
                body: JSON.stringify({
                        email: form.email,
                        password: form.password
                }),
                headers: {
                        "Content-Type": "application/json",
                },
                credentials: "include"
        })

        if (resp.status === 200) return

        const body: Response = await resp.json()

        switch (resp.status) {
                case 400: throw new Error(body.error)
                case 401: throw new Error("Email or password invalid")
                case 404: throw new Error("User with this e-mail address doesn't exist")
                case 500: throw new Error(`Something went wrong while processing your request. Request ID: ${body.requestID}, Error: ${body.error}`)
        }
}

export async function Register(form: AuthData) {
        const resp = await fetch(`${PUBLIC_BASE_URL}/api/users`, {
                method: "POST",
                body: JSON.stringify({
                        email: form.email,
                        password: form.password
                }),
                headers: {
                        "Content-Type": "application/json",
                }
        })

        if (resp.status === 200) return

        const body: Response = await resp.json()

        switch (resp.status) {
                case 400: throw new Error(body.error)
                case 401: throw new Error("Email or password invalid")
                case 409: throw new Error("User with this e-mail address already exists. Please log in")
                case 500: throw new Error(`Something went wrong while processing your request. Request ID: ${body.requestID}, Error: ${body.error}`)
        }
}

export async function ValidateToken(): Promise<boolean> {
        const resp = await fetch(`${PUBLIC_BASE_URL}/api/validate`, {
                method: "HEAD",
                credentials: 'include'
        })

        return resp.status === 200
}