import React from "react";
import { Grid, Card, Typography, Avatar, Box } from "@mui/material";
import { Link } from "react-router-dom";
import {TagInterface} from "../tag/TagInterface";


interface TagListProps {
    tags: TagInterface[];
}

const TagList: React.FC<TagListProps> = ({ tags }) => {
    return (
        <Grid container spacing={2}>
            {tags.map((tag, index) => (
                <Grid item xs={12} key={index}>
                    <Card
                        sx={{
                            backgroundColor: "transparent",
                            "&:hover": {
                                backgroundColor: "rgba(255, 255, 255, 0.1)",
                            },
                        }}
                    >
                        <Link
                            to={`/tags/${tag.name}`}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                textDecoration: "none",
                                color: "inherit",
                                padding: "16px",
                            }}
                        >
                            <Typography variant="h6" sx={{ flexGrow: 1 }}>
                                {tag.name}
                            </Typography>

                            {/* Count */}
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{ marginRight: 2 }}
                            >
                                {tag.count}
                            </Typography>

                            <Box sx={{ display: "flex", gap: 1 }}>
                                {tag.firstImage && (
                                    <Avatar
                                        key={tag.firstImage}
                                        src={tag.firstImage}
                                        alt={`Image ${tag.firstImage}`}
                                        sx={{ width: 40, height: 40 }}
                                    />
                                )}
                                {tag.secondImage && (
                                    <Avatar
                                        key={tag.secondImage}
                                        src={tag.secondImage}
                                        alt={`Image ${tag.secondImage}`}
                                        sx={{ width: 40, height: 40 }}
                                    />
                                )}
                                {tag.thirdImage && (
                                    <Avatar
                                        key={tag.thirdImage}
                                        src={tag.thirdImage}
                                        alt={`Image ${tag.thirdImage}`}
                                        sx={{ width: 40, height: 40 }}
                                    />
                                )}
                            </Box>
                        </Link>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
};

export default TagList;
