export const formatMediaLink = (url: string) => {
    return `${process.env.REACT_APP_API_ADDRESS}${url.replace(/\\/g, "/")}`;
}
