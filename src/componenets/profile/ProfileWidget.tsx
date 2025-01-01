import React from "react";
import { useTheme } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { EditIcon } from "../CustomIcons";
import authService from "../../services/authService";
import { Link } from "react-router-dom";

interface Profile {
    uuid: string;
    email: string;
    username: string;
    description: string | null;
    age: number;
    avatar: string;
    active: boolean;
    locked: boolean;
}

interface ProfileCardProps {
    profile: Profile;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ profile }) => {
    const theme = useTheme();

    return (
        <Card
            variant="outlined"
            sx={{
                marginBottom: "20px",
                padding: "20px",
                boxShadow: theme.shadows[3],
                borderRadius: theme.shape.borderRadius,
                flexDirection: "column",
                display: "flex",
                width: "100%",
                height: "auto",
                minHeight: "200px",
                boxSizing: "border-box"
            }}
        >
            <CardContent>
                {/* Avatar and Username Section */}
                <Stack direction="row" spacing={2} alignItems="center">
                    <Avatar
                        alt={profile.username}
                        src={profile.avatar || undefined}
                        sx={{
                            width: 80,
                            height: 80,
                            fontSize: "24px",
                            bgcolor: theme.palette.primary.main,
                        }}
                    >
                        {profile.username.charAt(0).toUpperCase()}
                    </Avatar>
                    <Stack spacing={1}>
                        <Typography variant="h5" fontWeight="bold">
                            {profile.username}
                        </Typography>
                        {authService.getBuddyUser() === profile.uuid && (
                            <Link to="/account">
                                <EditIcon  />
                            </Link>
                        )}
                    </Stack>
                </Stack>

                {/* Description Section */}
                <Stack spacing={2} mt={3}>
                    <Typography
                        variant="body1"
                        color="text.secondary"
                        sx={{
                            fontStyle: "italic",
                            textAlign: "center",
                        }}
                    >
                        {profile.description || "No description available."}
                    </Typography>

                    {/* Follow and Subscribe Buttons */}
                    <Stack direction="row" spacing={2} justifyContent="center">
                        <Button
                            variant="contained"
                            color="primary"
                            sx={{ textTransform: "capitalize" }}
                        >
                            Follow
                        </Button>
                        <Button
                            variant="outlined"
                            color="secondary"
                            sx={{ textTransform: "capitalize" }}
                        >
                            Subscribe
                        </Button>
                    </Stack>

                    {/* Stats Section */}
                    <Stack
                        direction="row"
                        spacing={4}
                        alignItems="center"
                        justifyContent="center"
                        mt={3}
                    >
                        <Stack alignItems="center">
                            <Typography variant="body2" color="text.secondary">
                                Posts
                            </Typography>
                            <Typography variant="h6">123</Typography>
                        </Stack>
                        <Stack alignItems="center">
                            <Typography variant="body2" color="text.secondary">
                                Followers
                            </Typography>
                            <Typography variant="h6">456</Typography>
                        </Stack>
                        <Stack alignItems="center">
                            <Typography variant="body2" color="text.secondary">
                                Subscribers
                            </Typography>
                            <Typography variant="h6">789</Typography>
                        </Stack>
                    </Stack>
                </Stack>
            </CardContent>
        </Card>
    );
};

export default ProfileCard;
