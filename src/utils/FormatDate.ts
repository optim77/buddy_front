export function formatDate(timestamp: string, zone: string): string {
    const cleanTimestamp = timestamp.slice(0, 23);

    const date = new Date(cleanTimestamp);

    return date.toLocaleString(zone ? zone : 'en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
    });
}
