import { AxiosInstance } from 'axios';

export interface ApiData {
  getPostData(): Promise<PostData>;
}

export class Posting implements ApiData {
  axios: AxiosInstance;
  constructor(axios: AxiosInstance) {
    this.axios = axios;
  }

  async getPostData(): Promise<PostData> {
    const posts = await this.axios.get<PostData>(
      'https://jsonplaceholder.typicode.com/posts'
    );

    return posts.data;
  }
}

export interface PostData {
  userId: number;
  id: number;
  title: string;
  body: string;
}
