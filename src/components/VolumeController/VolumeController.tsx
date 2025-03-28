import React from 'react';
import styles from './VolumeController.module.css';
import muteIcon from '../../assets/volume-xmark-svgrepo-com.svg';
import minVolumeIcon from '../../assets/volume-min-svgrepo-com.svg';
import maxVolumeIcon from '../../assets/volume-max-svgrepo-com.svg';

type Props = {
	videoRef: React.RefObject<HTMLVideoElement | null>
}

const VolumeController: React.FC<Props> = ({videoRef}) => {
	const [volume, setVolume] = React.useState<number>(0.5);
	const [showSlider, setShowSlider] = React.useState<boolean>(false);
	const volumeRef = React.useRef<HTMLDivElement>(null);

	// Calculate the correct icon to render according to the volume level
	const volumeIcon = React.useMemo(() => {
		if (volume === 0) return muteIcon;
		if (volume < 0.5) return minVolumeIcon;
		return maxVolumeIcon;
	}, [volume]);

	// On mount add event that listens on click away to close the volume slider
	React.useEffect(() => {
		document.addEventListener('click', handleClickAway);
		return () => document.removeEventListener('click', handleClickAway);
	}, []);

	const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		// update the volume state and the video volume
		const newVolume = parseFloat(e.target.value);
		setVolume(newVolume);
		if (videoRef.current) {
			videoRef.current.volume = newVolume;
		}
	};

	const handleShowSlider = () => {
		if (!videoRef.current) return;

		setShowSlider(!showSlider);
	};

	const handleClickAway = (e: MouseEvent) => {
		if (volumeRef.current?.contains(e.target as Node)) return;
		setShowSlider(false);
	};

	return (
		<div ref={volumeRef} className={styles.volume} onClick={handleShowSlider}>
			<img src={volumeIcon} alt={'volume-icon'}/>

			{
				showSlider && <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={handleVolumeChange}
                    onClick={e => e.stopPropagation()}
                />
			}
		</div>
	);
};

export default VolumeController;