export default (output: string): string => {
    if (output === '') return output;
    if (output.match(/^\./) || output.match(/\.(0)*$/)) return output;

    return Intl.NumberFormat('en', {
        maximumFractionDigits: 5
    }).format(parseFloat(output));
}
