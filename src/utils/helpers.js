export function dateFormatter(timestamp) {
    return timestamp ? new Date(timestamp).toISOString() : '';
}