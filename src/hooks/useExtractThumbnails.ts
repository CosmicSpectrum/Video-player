import {useEffect, useState} from 'react';

export type Thumbnail = {
	time: number;
	url: string;
};

/**
 * Custom hook that will extract thumbnails from a video file.
 * The hook will receive a file and a count of thumbnails to extract.
 * The hook will iterate over a hidden video element and will seek to N intervals of the video duration
 * then will draw each frame to a canvas and will provide a base64 url of the frame.
 * @param file - The video file to iterate over
 * @param count - The amount of frames to extract
 */
export function useExtractThumbnails(
	file: File | null,
	count: number = 10
): Thumbnail[] {
	const [thumbnails, setThumbnails] = useState<Thumbnail[]>([]);

	useEffect(() => {
		if (!file || count <= 0) return;

		const video = document.createElement('video');
		video.src = URL.createObjectURL(file);
		video.crossOrigin = 'anonymous';
		video.muted = true;

		const canvas = document.createElement('canvas');
		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		const captureFrames = async () => {
			return new Promise<void>((resolve) => {
				video.addEventListener('loadedmetadata', async () => {
					const duration = video.duration;
					const interval = duration / count;
					const captures: Thumbnail[] = [];

					video.width = canvas.width = 160;
					video.height = canvas.height = 90;

					for (let i = 0; i < count; i++) {
						const time = i * interval;
						await seekTo(video, time);
						ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
						captures.push({time, url: canvas.toDataURL('image/jpeg')});
					}

					setThumbnails(captures);
					URL.revokeObjectURL(video.src);
					resolve();
				});
			});
		};

		captureFrames();
	}, [file, count]);

	return thumbnails;
}

/**
 * Helper function that will receive a time and seek the video to that time.
 * The function will set a new time to the video and wait for the seeked event to resolve.
 * @param video - The video element ref
 * @param time - The time to seek to
 */
function seekTo(video: HTMLVideoElement, time: number): Promise<void> {
	return new Promise((resolve) => {
		const handler = () => {
			video.removeEventListener('seeked', handler);
			resolve();
		};
		video.addEventListener('seeked', handler);
		video.currentTime = time;
	});
}
