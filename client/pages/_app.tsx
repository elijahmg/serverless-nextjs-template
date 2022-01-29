import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Tabs from '../components/tabs';

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<Tabs>
			<Component {...pageProps} />
		</Tabs>
	);
}

export default MyApp;
