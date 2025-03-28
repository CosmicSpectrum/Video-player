import React from 'react';
import styles from './VideoCrop.module.css';

type Props = {
	duration: number,
	cropStart: number,
	cropEnd: number,
	updateCropState: (start: number, end: number) => void
}

const VideoCrop: React.FC<Props> = ({duration, cropEnd, cropStart, updateCropState}) => {
	const overlayRef = React.useRef<HTMLDivElement>(null);
	const [dragging, setDragging] = React.useState<'start' | 'end' | null>(null);

	const handleMouseMove = (e: MouseEvent) => {
		if (!overlayRef.current || !dragging || duration === 0) return;

		const rect = overlayRef.current.parentElement!.getBoundingClientRect();
		const ratio = (e.clientX - rect.left) / rect.width;
		const time = Math.max(0, Math.min(duration, ratio * duration));

		if (dragging === 'start' && time < cropEnd) {
			updateCropState(time, cropEnd);
		} else if (dragging === 'end' && time > cropStart) {
			updateCropState(cropStart, time);
		}
	};

	const handleMouseUp = () => {
		setDragging(null);
	};

	const mouseDownHandler = (e: React.MouseEvent, handleKey: 'start' | 'end') => {
		e.stopPropagation();
		setDragging(handleKey);
	};

	React.useEffect(() => {
		if (dragging) {
			document.addEventListener('mousemove', handleMouseMove);
			document.addEventListener('mouseup', handleMouseUp);
		}

		return () => {
			document.removeEventListener('mousemove', handleMouseMove);
			document.removeEventListener('mouseup', handleMouseUp);
		};
	}, [dragging, cropStart, cropEnd, duration]);

	const left = (cropStart / duration) * 100;
	const width = ((cropEnd - cropStart) / duration) * 100;

	return (
		<div
			ref={overlayRef}
			className={styles.cropOverlay}
			style={{left: `${left}%`, width: `${width}%`}}
		>
			<div className={styles.cropHandle + ' ' + styles.start} onMouseDown={(e) => mouseDownHandler(e, 'start')}/>
			<div className={styles.cropHandle + ' ' + styles.end} onMouseDown={(e) => mouseDownHandler(e, 'end')}/>
		</div>
	);
};

export default VideoCrop;