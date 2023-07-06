import axios from 'axios';
import { BlogPost } from '../types/BlogPost';

const BASE_URL = 'http://localhost:8080';

export const getBlogPost = async (title: string): Promise<BlogPost> => {
    const { data } = await axios.get(`${BASE_URL}/blog-posts`, {
        params: {
            title
        }
    });

    return data;
};
