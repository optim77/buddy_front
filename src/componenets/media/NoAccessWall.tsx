import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {formatMediaLink} from "../../utils/FormatMediaLink";

export const NoAccessWall = ({
                                 username,
                                 mediaType,
                                 backgroundImage,
                             }: {
    username: string;
    mediaType: string;
    backgroundImage: string;
}) => {
    const blurredLink = formatMediaLink(backgroundImage);
    console.log(blurredLink)
    return (
        <Box
            sx={{
                height: 500,
                width: "100%",
                position: "relative",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                backgroundImage: `url(${blurredLink})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backdropFilter: "blur(10px)",
                borderRadius: "8px",
                textAlign: "center",
                color: "#fff",
            }}
        >
            <Typography
                variant="h3"
                component="div"
                sx={{ marginBottom: 2 }}
            >
                Get a subscription to view the {mediaType === "VIDEO" ? "video" : "photo"}
            </Typography>
            <Typography variant="caption" component="div">
                {username} does not make this {mediaType === "VIDEO" ? "video" : "photo"} available to the public
            </Typography>
            <Button
                variant="contained"
                color="primary"
                href="/subscribe"
                sx={{
                    position: "absolute",
                    bottom: 20,
                }}
            >
                Get Access
            </Button>
        </Box>
    );
};
