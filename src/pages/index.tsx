import React, { useEffect, useState } from 'react';
import {Card, CardContent, CircularProgress, Container, Typography} from '@mui/material';
import { getBlogPosts } from '../api/data-service-api-client';
import { BlogPost } from '../types/BlogPost';
import Link from 'next/link';
import ReactMarkdown from "react-markdown";
import {toTitleCase} from "../utils/utils";
import Layout from "../components/Layout";

const BlogPostList: React.FC = () => {
    const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchBlogPosts = async () => {
            try {
                const posts = await getBlogPosts();
                setBlogPosts(posts);
                setIsLoading(false);
            } catch (error) {
                console.error('Error retrieving blog posts:', error);
            }
        };
        fetchBlogPosts();
    }, []);

    if (isLoading) {
        return (
            <Container sx={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
                <CircularProgress />
            </Container>
        );
    }

    return (
        <Layout>
            <Container maxWidth="md">
                {blogPosts.length === 0 ? (
                    <Typography variant="h4" component="h2" align="center">
                        No blog posts found.
                    </Typography>
                ) : (
                    <>
                        {blogPosts.map((post) => (
                            <Link
                                href={`/posts/${encodeURIComponent(post.title)}`}
                                key={post.title}
                                passHref
                                style={{textDecoration: 'none'}}>
                                <Card
                                    sx={{ marginBottom: '2rem', cursor: 'pointer'}}>
                                    <CardContent>
                                        <Typography variant="h5" component="h2" gutterBottom>
                                            {toTitleCase(post.title)}
                                        </Typography>
                                        <Typography variant="subtitle1" gutterBottom>
                                            <ReactMarkdown>{post.description}</ReactMarkdown>
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Link>
                        ))}
                    </>
                )}
            </Container>
        </Layout>
    );
};

export default BlogPostList;
