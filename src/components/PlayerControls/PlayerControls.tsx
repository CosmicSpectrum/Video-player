import React from 'react';
import styles from './PlayerContols.module.css';
import playButton from '../../assets/play-button-svgrepo-com.svg';
import pauseButton from '../../assets/pause-button-svgrepo-com.svg';
import VolumeController from '../VolumeController/VolumeController.tsx';
import VideoDuration from '../VideoDuration/VideoDuration.tsx';

type Props = {
	videoRef: React.RefObject<HTMLVideoElement | null>
}

const PlayerControls: React.FC<Props> = ({videoRef}) => {
	const [playing, setPlaying] = React.useState(false);
	const playingIcon = React.useMemo(() => playing ? pauseButton : playButton, [playing]);

	/**
	 * Handle the click event on the play/pause button, play or pause the video accordingly.
	 * This change will derive the memo update that will dynamically update the play icon
	 */
	const handlePlayingClick = () => {
		const video = videoRef.current;
		if (!video?.src) return;
		playing ? video.pause() : video.play();
		setPlaying(!playing);
	};

	return (<div className={styles.controls}>
		<VolumeController videoRef={videoRef}/>
		<img src={playingIcon} alt={'player-status-icon'} onClick={handlePlayingClick}/>
		<VideoDuration videoRef={videoRef}/>
	</div>);
};

export default PlayerControls;