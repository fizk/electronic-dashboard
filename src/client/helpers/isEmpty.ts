export default (value: string | null | undefined) => {
    return value?.trim() === '' || value?.trim() === '0'  || value === null || value === undefined;
}

export const isEmptyString = (value: string | null | undefined) => {
    return value?.trim() === ''  || value === null || value === undefined;
}
