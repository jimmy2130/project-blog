import React from 'react';
import { loadBlogPost } from '@/helpers/file-helpers';
import { MDXRemote } from 'next-mdx-remote/rsc';
import BlogHero from '@/components/BlogHero';
import styles from './postSlug.module.css';

async function BlogPost({ params }) {
	const {
		frontmatter: { title, publishedOn },
		content,
	} = await loadBlogPost(params.postSlug);
	return (
		<article className={styles.wrapper}>
			<BlogHero title={title} publishedOn={publishedOn} />
			<div className={styles.page}>
				<MDXRemote source={content} />
			</div>
		</article>
	);
}

export default BlogPost;
