export const formatMediaLink = (url: string) => {
    if(url){
        return `${process.env.REACT_APP_API_ADDRESS}${url.replace(/\\/g, "/")}`;
    }
    return '';

}

export const buildMediaLink = (url: string) => {
    if (url){
        return `${process.env.REACT_APP_API_ADDRESS + '/images/'}${url.replace(/\\/g, "/")}`;
    }
    return '';

}
