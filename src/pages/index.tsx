import React, { useEffect, useState } from 'react';
import { CircularProgress, Container, Typography } from '@mui/material';
import { getBlogPosts } from '../api/data-service-api-client';
import { BlogPost } from '../types/BlogPost';

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
        <Container maxWidth="md">
            {blogPosts.length === 0 ? (
                <Typography variant="h4" component="h2" align="center">
                    No blog posts found.
                </Typography>
            ) : (
                <>
                    {blogPosts.map((post) => (
                        <div key={post.title} style={{ marginBottom: '2rem' }}>
                            <Typography variant="h4" component="h2" gutterBottom>
                                {post.title}
                            </Typography>
                        </div>
                    ))}
                </>
            )}
        </Container>
    );
};

export default BlogPostList;
