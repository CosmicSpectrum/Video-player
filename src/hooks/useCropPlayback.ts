import React, {useEffect} from 'react';

/**
 * Keeps video playback constrained between cropStart and cropEnd.
 * Automatically loops back to cropStart when cropEnd is passed.
 *
 * @param videoRef ref to the HTMLVideoElement
 * @param cropStart start time (in seconds)
 * @param cropEnd end time (in seconds)
 */
export function useCropPlayback(
	videoRef: React.RefObject<HTMLVideoElement | null>,
	cropStart: number,
	cropEnd: number,
) {
	useEffect(() => {
		const video = videoRef.current;
		if (!video) return;

		const handleTimeUpdate = () => {
			if (video.currentTime > cropEnd || video.currentTime < cropStart) {
				video.currentTime = cropStart;

				if (!video.paused)
					video.play();
			}
		};

		const handlePlay = () => {
			if (cropStart != null && video.currentTime < cropStart) {
				video.currentTime = cropStart;
			}
		};

		video.addEventListener('timeupdate', handleTimeUpdate);
		video.addEventListener('play', handlePlay);

		return () => {
			video.removeEventListener('timeupdate', handleTimeUpdate);
			video.removeEventListener('play', handlePlay);
		};
	}, [videoRef.current, cropStart, cropEnd]);
}
