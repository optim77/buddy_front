export const buildImageUrl = (relativePath: string) => {
    return `${process.env.REACT_APP_API_ADDRESS}${relativePath.replace(/\\/g, '/')}`;
};
