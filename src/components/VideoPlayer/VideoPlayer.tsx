import React from 'react';
import styles from './VideoPlayer.module.css';
import PlayerControls from '../PlayerControls/PlayerControls.tsx';
import Timeline from '../Timeline/Timeline.tsx';

type Props = {}

const VideoPlayer: React.FC<Props> = () => {
	const [video, setVideo] = React.useState<File | null>(null);

	// create a ref to the video element
	const videoRef = React.useRef<HTMLVideoElement>(null);

	// only recalculate the videoUrl when the video changes
	const videoUrl = React.useMemo(() => video ? URL.createObjectURL(video) : undefined, [video]);

	/**
	 * Handle changes in the file input, set the new file object in the component state.
	 * @param e - The change event to derive the change from
	 */
	const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file)
			setVideo(file);
	};

	return (<div className={styles.videoPlayer}>
		<input type={'file'} accept={'video/*'} onChange={onFileChange}/>
		<div className={styles.videoWrapper}>
			<video
				key={videoUrl}
				loop
				ref={videoRef}
				src={videoUrl}
			/>
			{!videoUrl && <div className={styles.placeholderScreen}>Select a video to play</div>}
		</div>
		<PlayerControls key={videoUrl} videoRef={videoRef}/>
		{videoUrl && <Timeline video={video} videoRef={videoRef}/>}
	</div>);
};


export default VideoPlayer;