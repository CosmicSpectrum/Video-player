import { useEffect, useState } from 'react';

export type Thumbnail = {
	time: number;
	url: string;
};

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
						captures.push({ time, url: canvas.toDataURL('image/jpeg') });
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
