import { FC } from 'react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { ParsedUrlQuery } from 'querystring';
import { BlogPost } from '../../types/BlogPost';
import { getBlogPost } from '../../api/data-service-api-client'
import ReactMarkdown from 'react-markdown';
import {Box, Typography} from '@mui/material';
import { RootContainer, PaperStyled, TitleTypography, MarkdownContainer } from '../../styles/BlogPostStyles';
import {toTitleCase} from "../../utils/utils";
import Layout from "../../components/Layout";
import {CodeProps, Components} from "react-markdown/lib/ast-to-react";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

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

const components: Components = {
    code({node, inline, className, children, ...props}: CodeProps) {
        const match = /language-(\w+)/.exec(className || '')

        return !inline && match ? (
            <SyntaxHighlighter
                language={match[1]}
                PreTag="div"
                {...props}
                style={oneDark}
            >
                {String(children).replace(/\n$/, '')}
            </SyntaxHighlighter>
        ) : (
            <code className={className} {...props}>
                {children}
            </code>
        )
    }
}

const BlogPostPage: FC<Props> = ({ blogPost }) => (
    <Layout>
        <RootContainer>
            <Head>
                <title>{toTitleCase(blogPost.title)}</title>
                <meta name="description" content={blogPost.description} />
                <meta name="keywords" content={blogPost.keywords.toString()} />
            </Head>
            <PaperStyled>
                <TitleTypography variant="h3">
                    {toTitleCase(blogPost.title)}
                </TitleTypography>
                <Box sx={{ my: 4 }}>
                    <MarkdownContainer>
                        <Typography variant="body1" component="div">
                            <ReactMarkdown components={components} children={blogPost.content} />
                        </Typography>
                    </MarkdownContainer>
                </Box>
            </PaperStyled>
        </RootContainer>
    </Layout>
);

export default BlogPostPage;


