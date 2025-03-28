/**
 * Formats a given number of seconds into a time string (HH:MM:SS or MM:SS).
 *
 * @param {number} seconds - The number of seconds to format.
 * @returns {string} The formatted time string.
 */
const formatTime = (seconds: number): string => {
	const hrs = Math.floor(seconds / 3600);
	const mins = Math.floor((seconds % 3600) / 60);
	const secs = Math.floor(seconds % 60);

	const padded = (n: number) => n.toString().padStart(2, '0');

	if (hrs > 0) return `${hrs}:${padded(mins)}:${padded(secs)}`;
	return `${mins}:${padded(secs)}`;
};

export default formatTime;