import RssFeedRoundedIcon from '@mui/icons-material/RssFeedRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid2';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import React from 'react';

import { MainContainer } from '../customStyles/MainContainer';

import AppTheme from './theme/AppTheme';

const cardData = [
    {
        img: 'https://picsum.photos/800/450?random=1',
        tag: 'Engineering',
        title: 'Revolutionizing software development with cutting-edge tools',
        description:
            'Our latest engineering tools are designed to streamline workflows and boost productivity. ' +
            'Discover how these innovations are transforming the software development landscape.',
        authors: [
            { name: 'Remy Sharp', avatar: '/static/images/avatar/1.jpg' },
            { name: 'Travis Howard', avatar: '/static/images/avatar/2.jpg' },
        ],
    },
    {
        img: 'https://picsum.photos/800/450?random=2',
        tag: 'Product',
        title: 'Innovative product features that drive success',
        description:
            'Explore the key features of our latest product release that are helping businesses achieve their goals. ',
        authors: [{ name: 'Erica Johns', avatar: '/static/images/avatar/6.jpg' }],
    },
    {
        img: 'https://picsum.photos/800/450?random=3',
        tag: 'Design',
        title: 'Designing for the future: trends and insights',
        description: 'Stay ahead of the curve with the latest design trends and insights. ',
        authors: [{ name: 'Kate Morrison', avatar: '/static/images/avatar/7.jpg' }],
    },
    {
        img: 'https://picsum.photos/800/450?random=4',
        tag: 'Company',
        title: "Our company's journey: milestones and achievements",
        description: "Take a look at our company's journey and the milestones we've achieved along the way.",
        authors: [{ name: 'Cindy Baker', avatar: '/static/images/avatar/3.jpg' }],
    },
    {
        img: 'https://picsum.photos/800/450?random=45',
        tag: 'Engineering',
        title: 'Pioneering sustainable engineering solutions',
        description: 'Learn about our commitment to sustainability and the innovative engineering',
        authors: [
            { name: 'Agnes Walker', avatar: '/static/images/avatar/4.jpg' },
            { name: 'Trevor Henderson', avatar: '/static/images/avatar/5.jpg' },
        ],
    },
    {
        img: 'https://picsum.photos/800/450?random=6',
        tag: 'Product',
        title: 'Maximizing efficiency with our latest product updates',
        description: 'Our recent product updates are designed to help you maximize efficiency and achieve more.',
        authors: [{ name: 'Travis Howard', avatar: '/static/images/avatar/2.jpg' }],
    },
];

const SyledCard = styled(Card)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    padding: 0,
    height: '100%',
    backgroundColor: theme.palette.background.paper,
    '&:hover': {
        backgroundColor: 'transparent',
        cursor: 'pointer',
    },
    '&:focus-visible': {
        outline: '3px solid',
        outlineColor: 'hsla(210, 98%, 48%, 0.5)',
        outlineOffset: '2px',
    },
}));

const SyledCardContent = styled(CardContent)({
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
    padding: 16,
    flexGrow: 1,
    '&:last-child': {
        paddingBottom: 16,
    },
});

const StyledTypography = styled(Typography)({
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 2,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
});

function Author({ authors }: { authors: { name: string; avatar: string }[] }) {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'row',
                gap: 2,
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 1,
                    alignItems: 'center',
                }}
            >
                <AvatarGroup max={3}>
                    {authors.map((author, index) => (
                        <Avatar key={index} alt={author.name} src={author.avatar} sx={{ width: 24, height: 24 }} />
                    ))}
                </AvatarGroup>
                <Typography variant="caption">{authors.map((author) => author.name).join(', ')}</Typography>
            </Box>
            <Typography variant="caption">July 14, 2021</Typography>
        </Box>
    );
}

export function Search() {
    return (
        <FormControl sx={{ width: { xs: '100%', md: '25ch' } }} variant="outlined">
            <OutlinedInput
                size="small"
                id="search"
                placeholder="Search…"
                sx={{ flexGrow: 1 }}
                startAdornment={
                    <InputAdornment position="start" sx={{ color: 'text.primary' }}>
                        <SearchRoundedIcon fontSize="small" />
                    </InputAdornment>
                }
                inputProps={{
                    'aria-label': 'search',
                }}
            />
        </FormControl>
    );
}

const Dashboard: React.FC = (props: { disableCustomTheme?: boolean }) => {
    const [focusedCardIndex, setFocusedCardIndex] = React.useState<number | null>(null);

    const handleFocus = (index: number) => {
        setFocusedCardIndex(index);
    };

    const handleBlur = () => {
        setFocusedCardIndex(null);
    };

    return (
        <Container maxWidth="lg" component="main" sx={{ display: 'flex', flexDirection: 'column', my: 16, gap: 4 }}>
            <AppTheme {...props}>
                <CssBaseline enableColorScheme />
                <MainContainer>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 4,
                        }}
                    >
                        <Box
                            sx={{
                                display: { xs: 'flex', sm: 'none' },
                                flexDirection: 'row',
                                gap: 1,
                                width: { xs: '100%', md: 'fit-content' },
                                overflow: 'auto',
                            }}
                        >
                            <Search />
                            <IconButton size="small" aria-label="RSS feed">
                                <RssFeedRoundedIcon />
                            </IconButton>
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: {
                                    xs: 'column-reverse',
                                    md: 'row',
                                },
                                width: '100%',
                                justifyContent: 'space-between',
                                alignItems: { xs: 'start', md: 'center' },
                                gap: 4,
                                overflow: 'auto',
                            }}
                        >
                            {/*<Box*/}
                            {/*    sx={{*/}
                            {/*        display: 'inline-flex',*/}
                            {/*        flexDirection: 'row',*/}
                            {/*        gap: 3,*/}
                            {/*        overflow: 'auto',*/}
                            {/*    }}*/}
                            {/*>*/}
                            {/*    <Chip onClick={handleClick} size="medium" label="All categories" />*/}
                            {/*    <Chip*/}
                            {/*        onClick={handleClick}*/}
                            {/*        size="medium"*/}
                            {/*        label="Company"*/}
                            {/*        sx={{*/}
                            {/*            backgroundColor: 'transparent',*/}
                            {/*            border: 'none',*/}
                            {/*        }}*/}
                            {/*    />*/}
                            {/*    <Chip*/}
                            {/*        onClick={handleClick}*/}
                            {/*        size="medium"*/}
                            {/*        label="Product"*/}
                            {/*        sx={{*/}
                            {/*            backgroundColor: 'transparent',*/}
                            {/*            border: 'none',*/}
                            {/*        }}*/}
                            {/*    />*/}
                            {/*    <Chip*/}
                            {/*        onClick={handleClick}*/}
                            {/*        size="medium"*/}
                            {/*        label="Design"*/}
                            {/*        sx={{*/}
                            {/*            backgroundColor: 'transparent',*/}
                            {/*            border: 'none',*/}
                            {/*        }}*/}
                            {/*    />*/}
                            {/*    <Chip*/}
                            {/*        onClick={handleClick}*/}
                            {/*        size="medium"*/}
                            {/*        label="Engineering"*/}
                            {/*        sx={{*/}
                            {/*            backgroundColor: 'transparent',*/}
                            {/*            border: 'none',*/}
                            {/*        }}*/}
                            {/*    />*/}
                            {/*</Box>*/}
                            {/*<Box*/}
                            {/*    sx={{*/}
                            {/*        display: { xs: 'none', sm: 'flex' },*/}
                            {/*        flexDirection: 'row',*/}
                            {/*        gap: 1,*/}
                            {/*        width: { xs: '100%', md: 'fit-content' },*/}
                            {/*        overflow: 'auto',*/}
                            {/*    }}*/}
                            {/*>*/}
                            {/*    <Search />*/}
                            {/*    <IconButton size="small" aria-label="RSS feed">*/}
                            {/*        <RssFeedRoundedIcon />*/}
                            {/*    </IconButton>*/}
                            {/*</Box>*/}
                        </Box>
                        <Grid container spacing={2} columns={12}>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <SyledCard
                                    variant="outlined"
                                    onFocus={() => handleFocus(0)}
                                    onBlur={handleBlur}
                                    tabIndex={0}
                                    className={focusedCardIndex === 0 ? 'Mui-focused' : ''}
                                >
                                    <CardMedia
                                        component="img"
                                        alt="green iguana"
                                        image={cardData[0].img}
                                        sx={{
                                            aspectRatio: '16 / 9',
                                            borderBottom: '1px solid',
                                            borderColor: 'divider',
                                        }}
                                    />
                                    <SyledCardContent>
                                        <Typography gutterBottom variant="caption" component="div">
                                            {cardData[0].tag}
                                        </Typography>
                                        <Typography gutterBottom variant="h6" component="div">
                                            {cardData[0].title}
                                        </Typography>
                                        <StyledTypography variant="body2" color="text.secondary" gutterBottom>
                                            {cardData[0].description}
                                        </StyledTypography>
                                    </SyledCardContent>
                                    <Author authors={cardData[0].authors} />
                                </SyledCard>
                            </Grid>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <SyledCard
                                    variant="outlined"
                                    onFocus={() => handleFocus(1)}
                                    onBlur={handleBlur}
                                    tabIndex={0}
                                    className={focusedCardIndex === 1 ? 'Mui-focused' : ''}
                                >
                                    <CardMedia
                                        component="img"
                                        alt="green iguana"
                                        image={cardData[1].img}
                                        aspect-ratio="16 / 9"
                                        sx={{
                                            borderBottom: '1px solid',
                                            borderColor: 'divider',
                                        }}
                                    />
                                    <SyledCardContent>
                                        <Typography gutterBottom variant="caption" component="div">
                                            {cardData[1].tag}
                                        </Typography>
                                        <Typography gutterBottom variant="h6" component="div">
                                            {cardData[1].title}
                                        </Typography>
                                        <StyledTypography variant="body2" color="text.secondary" gutterBottom>
                                            {cardData[1].description}
                                        </StyledTypography>
                                    </SyledCardContent>
                                    <Author authors={cardData[1].authors} />
                                </SyledCard>
                            </Grid>
                            <Grid size={{ xs: 12, md: 4 }}>
                                <SyledCard
                                    variant="outlined"
                                    onFocus={() => handleFocus(2)}
                                    onBlur={handleBlur}
                                    tabIndex={0}
                                    className={focusedCardIndex === 2 ? 'Mui-focused' : ''}
                                    sx={{ height: '100%' }}
                                >
                                    <CardMedia
                                        component="img"
                                        alt="green iguana"
                                        image={cardData[2].img}
                                        sx={{
                                            height: { sm: 'auto', md: '50%' },
                                            aspectRatio: {
                                                sm: '16 / 9',
                                                md: '',
                                            },
                                        }}
                                    />
                                    <SyledCardContent>
                                        <Typography gutterBottom variant="caption" component="div">
                                            {cardData[2].tag}
                                        </Typography>
                                        <Typography gutterBottom variant="h6" component="div">
                                            {cardData[2].title}
                                        </Typography>
                                        <StyledTypography variant="body2" color="text.secondary" gutterBottom>
                                            {cardData[2].description}
                                        </StyledTypography>
                                    </SyledCardContent>
                                    <Author authors={cardData[2].authors} />
                                </SyledCard>
                            </Grid>
                            <Grid size={{ xs: 12, md: 4 }}>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: 2,
                                        height: '100%',
                                    }}
                                >
                                    <SyledCard
                                        variant="outlined"
                                        onFocus={() => handleFocus(3)}
                                        onBlur={handleBlur}
                                        tabIndex={0}
                                        className={focusedCardIndex === 3 ? 'Mui-focused' : ''}
                                        sx={{ height: '100%' }}
                                    >
                                        <SyledCardContent
                                            sx={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                justifyContent: 'space-between',
                                                height: '100%',
                                            }}
                                        >
                                            <div>
                                                <Typography gutterBottom variant="caption" component="div">
                                                    {cardData[3].tag}
                                                </Typography>
                                                <Typography gutterBottom variant="h6" component="div">
                                                    {cardData[3].title}
                                                </Typography>
                                                <StyledTypography variant="body2" color="text.secondary" gutterBottom>
                                                    {cardData[3].description}
                                                </StyledTypography>
                                            </div>
                                        </SyledCardContent>
                                        <Author authors={cardData[3].authors} />
                                    </SyledCard>
                                    <SyledCard
                                        variant="outlined"
                                        onFocus={() => handleFocus(4)}
                                        onBlur={handleBlur}
                                        tabIndex={0}
                                        className={focusedCardIndex === 4 ? 'Mui-focused' : ''}
                                        sx={{ height: '100%' }}
                                    >
                                        <SyledCardContent
                                            sx={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                justifyContent: 'space-between',
                                                height: '100%',
                                            }}
                                        >
                                            <div>
                                                <Typography gutterBottom variant="caption" component="div">
                                                    {cardData[4].tag}
                                                </Typography>
                                                <Typography gutterBottom variant="h6" component="div">
                                                    {cardData[4].title}
                                                </Typography>
                                                <StyledTypography variant="body2" color="text.secondary" gutterBottom>
                                                    {cardData[4].description}
                                                </StyledTypography>
                                            </div>
                                        </SyledCardContent>
                                        <Author authors={cardData[4].authors} />
                                    </SyledCard>
                                </Box>
                            </Grid>
                            <Grid size={{ xs: 12, md: 4 }}>
                                <SyledCard
                                    variant="outlined"
                                    onFocus={() => handleFocus(5)}
                                    onBlur={handleBlur}
                                    tabIndex={0}
                                    className={focusedCardIndex === 5 ? 'Mui-focused' : ''}
                                    sx={{ height: '100%' }}
                                >
                                    <CardMedia
                                        component="img"
                                        alt="green iguana"
                                        image={cardData[5].img}
                                        sx={{
                                            height: { sm: 'auto', md: '50%' },
                                            aspectRatio: {
                                                sm: '16 / 9',
                                                md: '',
                                            },
                                        }}
                                    />
                                    <SyledCardContent>
                                        <Typography gutterBottom variant="caption" component="div">
                                            {cardData[5].tag}
                                        </Typography>
                                        <Typography gutterBottom variant="h6" component="div">
                                            {cardData[5].title}
                                        </Typography>
                                        <StyledTypography variant="body2" color="text.secondary" gutterBottom>
                                            {cardData[5].description}
                                        </StyledTypography>
                                    </SyledCardContent>
                                    <Author authors={cardData[5].authors} />
                                </SyledCard>
                            </Grid>
                        </Grid>
                    </Box>
                </MainContainer>
            </AppTheme>
        </Container>
    );
};
export default Dashboard;
