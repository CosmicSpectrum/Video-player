import React from 'react';
import styles from './VideoDuration.module.css';
import formatTime from '../../utils/formatTime.ts';

type Props = {
	videoRef: React.RefObject<HTMLVideoElement | null>
}

const VideoDuration: React.FC<Props> = ({videoRef}) => {
	const [currentTime, setCurrentTime] = React.useState<number>(0);
	const [duration, setDuration] = React.useState<number>(0);

	React.useEffect(() => {
		let video = videoRef.current;
		if (!video) return;

		const updateTime = () => setCurrentTime(video.currentTime);
		const updateDuration = () => setDuration(video.duration);

		video.addEventListener('timeupdate', updateTime);

		// Run immediately if metadata already loaded
		if (video.readyState >= 1) {
			updateTime();
			updateDuration();
		}

		return () => {
			video.removeEventListener('timeupdate', updateTime);
		};
	}, [videoRef.current]);

	return <div className={styles.videoDuration}>
		{formatTime(currentTime)} / {formatTime(duration)}
	</div>;
};

export default VideoDuration;