/**
 * Function to format like's digit.
 * @param likes - likes digit.
 * @returns Formatted digit of likes.
 */
export function formatLikes(likes: number): string {
    if (likes < 1000) {
        return likes.toString();
    }

    const formattedLikes = (likes / 1000).toFixed(1);
    return `${formattedLikes}k`;
}
