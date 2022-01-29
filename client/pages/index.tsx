import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import styled from 'styled-components';

const Home: NextPage = () => {
	return (
		<div className={styles.container}>
			<Head>
				<title>Models dashboard</title>
			</Head>

			<StyledMain>
				<section>
					Happy
				</section>
			</StyledMain>
		</div>
	);
};

const StyledMain = styled.main`
	width: 50%;
	margin: 0 auto;

	section {
		padding: 0.3em 1em;
		line-height: 1.5em;

		a {
			color: var(--primary-color);
			font-weight: 700;
			text-decoration: underline;
		}
	}
`;

export default Home;
