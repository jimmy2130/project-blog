'use client';
import React from 'react';
import { Sun, Moon } from 'react-feather';
import Cookie from 'js-cookie';

import {
	LIGHT_TOKENS,
	DARK_TOKENS,
	COLOR_THEME_COOKIE_NAME,
} from '@/constants';
import VisuallyHidden from '@/components/VisuallyHidden';

function DarkLightToggle({ initialTheme, ...delegated }) {
	const [theme, setTheme] = React.useState(initialTheme);

	function handleClick() {
		const nextTheme = theme === 'light' ? 'dark' : 'light';

		// Update the state variable.
		// This causes the Sun/Moon icon to flip.
		setTheme(nextTheme);

		// Write the cookie for future visits
		Cookie.set(COLOR_THEME_COOKIE_NAME, nextTheme, { expires: 1000 });

		// Apply the new colors to the root HTML tag.
		const TOKENS = nextTheme === 'light' ? LIGHT_TOKENS : DARK_TOKENS;

		const root = document.documentElement;

		root.setAttribute('data-color-theme', nextTheme);

		Object.entries(TOKENS).forEach(([key, value]) => {
			root.style.setProperty(key, value);
		});
	}

	return (
		<button onClick={handleClick} {...delegated}>
			{theme === 'light' ? <Sun size="1.5rem" /> : <Moon size="1.5rem" />}
			<VisuallyHidden>Toggle dark / light mode</VisuallyHidden>
		</button>
	);
}

export default DarkLightToggle;
