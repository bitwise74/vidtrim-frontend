export function inSub(url: string, subdomain: string): string {
        try {
                const u = new URL(url);
                const parts = u.hostname.split('.');
                parts.unshift(subdomain);
                u.hostname = parts.join('.');
                return u.toString();
        } catch {
                return url;
        }
}