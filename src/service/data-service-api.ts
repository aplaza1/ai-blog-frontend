import axios, {AxiosRequestConfig, AxiosResponse} from "axios";

const baseUrl = "http://localhost:8080";

interface BlogPost {
    title: string;
    content: string;
}

export const getBlogPost = async (title: string) : Promise<BlogPost> => {
    try {
        const options: AxiosRequestConfig = {
            method: 'GET',
            url: `${baseUrl}/blog-posts`,
            params: {
                title: title,
            },
            headers: {
                'Content-Type': 'application/json',
            }
        };
        const response: AxiosResponse<BlogPost> = await axios(options);
        return response.data;
    } catch (error) {
        throw new Error(`Error fetching data: ${error}`);
    }
};