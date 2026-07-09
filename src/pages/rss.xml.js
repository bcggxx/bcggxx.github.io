import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const posts = await getCollection('posts', ({ data }) =>
    import.meta.env.PROD ? !data.draft : true
  );
  posts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());

  return rss({
    title: 'bcggxx',
    description: '技术博客，记录点滴',
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.description,
      link: `/posts/${post.id.replace(/\.md$/, '')}/`,
    })),
  });
}
