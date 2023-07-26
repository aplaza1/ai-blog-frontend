import { FC } from 'react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { ParsedUrlQuery } from 'querystring';
import { BlogPost } from '../../types/BlogPost';
import { getBlogPost } from '../../api/data-service-api-client'
import ReactMarkdown from 'react-markdown';
import { Box} from '@mui/material';
import { RootContainer, PaperStyled, TitleTypography, MarkdownContainer } from '../../styles/BlogPostStyles';
import {toTitleCase} from "../../utils/utils";

interface Props {
    blogPost: BlogPost;
}

interface Params extends ParsedUrlQuery {
    title: string;
}

export const getServerSideProps: GetServerSideProps<Props, Params> = async (context) => {
    const blogPost = await getBlogPost(context.params!.title);
    return { props: { blogPost } };
};

const BlogPostPage: FC<Props> = ({ blogPost }) => (
    <RootContainer>
        <Head>
            <title>{toTitleCase(blogPost.title)}</title>
            <meta name="description" content={blogPost.description} />
            <meta name="keywords" content={blogPost.keywords.toString()} />
        </Head>
        <PaperStyled>
            <TitleTypography variant="h3" align="center">
                {toTitleCase(blogPost.title)}
            </TitleTypography>
            <Box sx={{ my: 4 }}>
                <MarkdownContainer>
                    <ReactMarkdown children={blogPost.content} />
                </MarkdownContainer>
            </Box>
        </PaperStyled>
    </RootContainer>
);

export default BlogPostPage;


