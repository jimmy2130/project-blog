import React from 'react';
import { getBlogPostList } from '@/helpers/file-helpers';
import BlogSummaryCard from '@/components/BlogSummaryCard';

import styles from './homepage.module.css';

async function Home() {
	const blogPostList = await getBlogPostList();

	return (
		<div className={styles.wrapper}>
			<h1 className={styles.mainHeading}>Latest Content:</h1>

			{/* TODO: Iterate over the data read from the file system! */}
			{blogPostList.map(({ slug, ...delegated }) => (
				<BlogSummaryCard key={slug} slug={slug} {...delegated} />
			))}
		</div>
	);
}

export default Home;
