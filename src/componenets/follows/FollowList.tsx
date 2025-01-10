import React from "react";
import { FollowListUser } from "./FollowListUser";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import {buildMediaLink, formatMediaLink} from "../../utils/FormatMediaLink";

const FollowList = ({ followers }: { followers: FollowListUser[] }) => {
    if (!followers.length) {
        return <Typography>No followers to display.</Typography>;
    }

    return (
        <Grid container spacing={2}>
            {followers.map((follower) => (
                <Grid item xs={12} sm={6} md={4} key={follower.id}>
                    <Link
                        to={`/user/${follower.id}`}
                        style={{ textDecoration: "none", color: "inherit" }}
                    >
                        <Paper
                            elevation={3}
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                padding: 2,
                                borderRadius: 2,
                                cursor: "pointer",
                                transition: "background-color 0.3s ease",
                                backgroundColor: "white",
                                "&:hover": {
                                    backgroundColor: "#f9f9f9", // Jasnoszare tło
                                },
                            }}
                        >
                            <Avatar
                                src={buildMediaLink(follower.avatar)}
                                alt={follower.username}
                                sx={{ width: 56, height: 56, marginRight: 2 }}
                            />
                            <Box>
                                <Typography
                                    variant="h6"
                                    fontWeight="bold"
                                    sx={{
                                        color: "black",
                                        "&:hover": { color: "#1976d2" } // Kontrastowy kolor tekstu na hover
                                    }}
                                >
                                    {follower.username}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {follower.description}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                    Joined: {new Date(follower.createdAt).toLocaleDateString()}
                                </Typography>
                            </Box>
                        </Paper>
                    </Link>
                </Grid>
            ))}
        </Grid>
    );
};

export default FollowList;
