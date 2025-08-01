export function formatJoinDate(dateString) {
    if (!dateString) return '';

    const isoString = dateString.replace(' ', 'T');

    const date = new Date(isoString);
    if (isNaN(date.getTime())) return '';

    const formatter = new Intl.DateTimeFormat('ru-RU', {
        year: 'numeric',
        month: 'long',
    });

    return `Присоединился ${formatter.format(date)}`;
}