export function inSub(url: string, subdomain: string): string {
    try {
        const u = new URL(url);
        const parts = u.hostname.split('.');
        parts.unshift(subdomain);
        u.hostname = parts.join('.');

        let result = u.toString();

        if (result.endsWith('/')) {
                result = result.slice(0, -1);
        }

        return result;
    } catch {
        return url;
    }
}