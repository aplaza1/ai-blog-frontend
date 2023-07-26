import { styled } from '@mui/system';
import { Box, Typography, Paper } from '@mui/material';

export const RootContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
});

export const PaperStyled = styled(Paper)({
    width: '80%',
    maxWidth: '800px',
    padding: '2rem',
});

export const TitleTypography = styled(Typography)(({ theme }) => ({
    marginBottom: theme.spacing(2),
}));

export const MarkdownContainer = styled(Box)({
    '& img': {
        maxWidth: '100%',
    },
    '& h1': {
        borderBottom: '1px solid lightgray',
        paddingBottom: '0.5rem',
    },
    '& p': {
        lineHeight: 1.6,
    },
});
