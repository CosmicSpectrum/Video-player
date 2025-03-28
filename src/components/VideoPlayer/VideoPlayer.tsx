import React from 'react';
import styles from './VideoPlayer.module.css';
import PlayerControls from '../PlayerControls/PlayerControls.tsx';

type Props = {}

const VideoPlayer: React.FC<Props> = () => {
	const [video, setVideo] = React.useState<File | undefined>();

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
		{videoUrl ? <video loop ref={videoRef} src={videoUrl}/> : <div className={styles.placeholderScreen}>Select a video to play</div>}
		<PlayerControls videoRef={videoRef}/>
	</div>);
};


export default VideoPlayer;