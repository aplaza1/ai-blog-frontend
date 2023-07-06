import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { getBlogPost } from '../api/data-service-api-client';
import { BlogPost as BlogPostType } from '../types/BlogPost';
import {Typography, Container, Box, styled} from '@mui/material';
import { CircularProgress } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import gfm from 'remark-gfm';

interface RouteParams {
    title: string;
}

const BlogPost: React.FC<RouteComponentProps<RouteParams>> = ({ match }) => {
    const [blogPost, setBlogPost] = useState<BlogPostType | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchBlogPost = async () => {
            const post = await getBlogPost(match.params.title);
            setBlogPost(post);
            setIsLoading(false);
        };
        fetchBlogPost();
    }, [match.params.title]);

    const toTitleCase = (text: string) => {
        return text
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ') + '?';
    };

    const StyledMarkdown = styled(ReactMarkdown)`
      line-height: 1.6;
      font-size: 18px;
      color: #333;
    `;

    return (
        <Container maxWidth="md">
            {isLoading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
                    <CircularProgress />
                </Box>
            ) : (
                <Box sx={{ marginTop: '2rem', marginBottom: '2rem' }}>
                    <Typography variant="h2" component="h1" gutterBottom>
                        {toTitleCase(blogPost?.title || '')}
                    </Typography>
                    <StyledMarkdown
                        children={blogPost?.content || ''}
                        components={{
                            code({ node, inline, className, children, ...props }) {
                                const match = /language-(\w+)/.exec(className || '');
                                return !inline && match ? (
                                    <SyntaxHighlighter
                                        wrapLongLines={true}
                                        style={vscDarkPlus as any}
                                        language={match[1]}
                                        PreTag="div"
                                        children={String(children).replace(/\n$/, '')}
                                        {...props}
                                    />
                                ) : (
                                    <code className={className} {...props}>
                                        {children}
                                    </code>
                                );
                            },
                        }}
                        remarkPlugins={[gfm]}
                    />
                </Box>
            )}
        </Container>
    );
};

export default BlogPost;
