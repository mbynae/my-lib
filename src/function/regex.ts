export function phoneRegex(phone: string) {
    if (phone.slice(0, 2) === '02') {
        return phone.replace(/^(\d{2})(\d{3,4})(\d{4})$/, `$1-$2-$3`);
    }
    return phone.replace(/^(\d{3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);
}
