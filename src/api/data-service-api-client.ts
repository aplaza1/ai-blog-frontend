import axios from 'axios';
import { BlogPost } from '../types/BlogPost';

const BASE_URL = 'https://ai-blog-data-service-2902779ebc41.herokuapp.com';

export const getBlogPost = async (title: string): Promise<BlogPost> => {
    const { data } = await axios.get(`${BASE_URL}/blog-posts`, {
        params: {
            title
        }
    });

    return data;
};
