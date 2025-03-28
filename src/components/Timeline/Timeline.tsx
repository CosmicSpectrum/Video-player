import React from 'react';
import styles from './Timeline.module.css';
import {useExtractThumbnails} from '../../hooks/useExtractThumbnails.ts';

type Props = {
	videoRef: React.RefObject<HTMLVideoElement | null>;
	video: File | null
}

const Timeline: React.FC<Props> = ({videoRef, video}) => {
	const [duration, setDuration] = React.useState(0);
	const [progress, setProgress] = React.useState(0);
	const thumbnails = useExtractThumbnails(video, 5);
	const containerRef = React.useRef<HTMLDivElement>(null);

	React.useEffect(() => {
		const video = videoRef.current;
		if (!video) return;

		const update = () => setProgress(video.currentTime);
		const setMeta = () => setDuration(video.duration);

		video.addEventListener('timeupdate', update);
		video.addEventListener('loadedmetadata', setMeta);

		// Run immediately if metadata already loaded
		if (video.readyState >= 1) {
			update();
			setMeta();
		}

		return () => {
			video.removeEventListener('timeupdate', update);
			video.removeEventListener('loadedmetadata', setMeta);
		};
	}, [videoRef.current]);

	const handleClick = (e: React.MouseEvent) => {

		// fail fast if no video is set in the player
		if (!videoRef.current || !containerRef.current)
			return;

		const rect = containerRef.current.getBoundingClientRect();
		const clickX = e.clientX - rect.left;
		const ratio = clickX / rect.width;
		const newTime = ratio * duration;
		videoRef.current.currentTime = newTime;
		setProgress(newTime);
	};

	// Update the playhead cursor position on the timeline
	const progressPercent = (progress / duration) * 100 || 0;

	return (
		<div
			ref={containerRef}
			className={styles.timeline}
			onClick={handleClick}
		>
			<div className={styles.timelineWrapper}>
				<div className={styles.timelineProgress} style={{width: `${progressPercent}%`}}/>
				<div className={styles.timelinePlayhead} style={{left: `${progressPercent}%`}}/>
			</div>
			<div className={styles.thumbnailContainer}>
				{thumbnails.map((thumb) => (
					<img key={thumb.time} src={thumb.url} alt={`Thumbnail at ${thumb.time}s`}/>))}
			</div>
		</div>
	);
};

export default Timeline;