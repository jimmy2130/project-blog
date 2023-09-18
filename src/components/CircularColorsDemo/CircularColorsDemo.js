'use client';
import React from 'react';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { Play, Pause, RotateCcw } from 'react-feather';

import Card from '@/components/Card';
import VisuallyHidden from '@/components/VisuallyHidden';

import styles from './CircularColorsDemo.module.css';

const COLORS = [
	{ label: 'red', value: 'hsl(348deg 100% 60%)' },
	{ label: 'yellow', value: 'hsl(50deg 100% 55%)' },
	{ label: 'blue', value: 'hsl(235deg 100% 65%)' },
];

function CircularColorsDemo() {
	const [timeElapsed, setTimeElapsed] = React.useState(0);
	const [status, setStatus] = React.useState('idle');
	const id = React.useId();

	function toggle() {
		if (status === 'idle') {
			setStatus('playing');
			setTimeElapsed(timeElapsed + 1);
		} else {
			setStatus('idle');
		}
	}

	function reset() {
		setStatus('idle');
		setTimeElapsed(0);
	}

	React.useEffect(() => {
		if (status !== 'playing') {
			return;
		}
		function tick() {
			setTimeElapsed(t => t + 1);
		}
		const intervalId = window.setInterval(tick, 1000);
		return () => {
			window.clearInterval(intervalId);
		};
	}, [status]);

	const selectedColor = COLORS[timeElapsed % COLORS.length];

	return (
		<Card as="section" className={styles.wrapper}>
			<ul className={styles.colorsWrapper}>
				{COLORS.map((color, index) => {
					const isSelected = color.value === selectedColor.value;

					return (
						<li className={styles.color} key={index}>
							{isSelected && (
								<motion.div
									className={styles.selectedColorOutline}
									layoutId={`${id}-selected-color-outline`}
								/>
							)}
							<div
								className={clsx(
									styles.colorBox,
									isSelected && styles.selectedColorBox,
								)}
								style={{
									backgroundColor: color.value,
								}}
							>
								<VisuallyHidden>{color.label}</VisuallyHidden>
							</div>
						</li>
					);
				})}
			</ul>

			<div className={styles.timeWrapper}>
				<dl className={styles.timeDisplay}>
					<dt>Time Elapsed</dt>
					<dd>{timeElapsed}</dd>
				</dl>
				<div className={styles.actions}>
					<button onClick={toggle}>
						{status === 'playing' ? <Pause /> : <Play />}
						<VisuallyHidden>{status ? 'Play' : 'Pause'}</VisuallyHidden>
					</button>
					<button onClick={reset}>
						<RotateCcw />
						<VisuallyHidden>Reset</VisuallyHidden>
					</button>
				</div>
			</div>
		</Card>
	);
}

export default CircularColorsDemo;
