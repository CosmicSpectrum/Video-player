# Simple Video Player Project

A simple video player built to demonstrate frontend development skills. This README includes an overview of the
approach, component structure, and instructions to run the project locally.

---

## Approach

To focus on core functionality and speed, I opted for local video file loading rather than external APIs. The design
emphasizes modularity—each component is self-contained, and state is managed in a centralized manner where needed to
keep components in sync.

One noted limitation is the prop drilling of `videoRef`, which ideally should be lifted into context. Due to time
constraints, I chose not to refactor to a shared context store.

---

## Components

### `VideoPlayer`

- Main component responsible for video playback
- Accepts local video uploads
- Uses `URL.createObjectURL()` to create a blob URL for playback
- Controls the rendering of the video element and passes down the video ref

### `PlayerControls`

- Contains play/pause button, volume control, and duration display
- Uses `videoRef` to control playback state and interact with video element

### `VolumeController`

- Manages volume adjustments for the video element
- Toggles a vertical range slider on icon click
- Uses `useMemo` to determine icon state and `videoRef` to apply changes

### `VideoDuration`

- Displays formatted current playback time and total duration
- Uses `formatTime` utility to render in `hh:mm:ss` or `mm:ss`

### `Timeline`

- Displays progress bar and current playhead
- Allows user to seek by clicking the timeline
- Renders thumbnails using `useExtractThumbnails`
- Applies `useCropPlayback` to constrain playback to a cropped segment

### `VideoCrop`

- Renders a crop overlay with draggable handles
- Allows setting cropStart and cropEnd via interaction
- Positioned absolutely to align with timeline & thumbnail visuals
- Accepts props for duration and triggers parent callback on crop change

---

## Utility Functions

### `formatTime`

- Converts a number of seconds into `hh:mm:ss` or `mm:ss` format
- Pads values as needed using `toString().padStart()`

---

## Hooks

### `useExtractThumbnails(file, count)`

- Creates a hidden video element and canvas
- Seeks the video to N evenly spaced timestamps
- Draws each frame to canvas and collects data URLs
- Returns `{ time, url }[]` representing preview thumbnails

### `useCropPlayback(videoRef, cropStart, cropEnd)`

- Hooks into `timeupdate` and `play` events
- Forces the video to loop between `cropStart` and `cropEnd`
- 
---

## Technologies Used

- React
- TypeScript
- Vite
- CSS Modules

---

## How to Run This Project Locally

1. **Clone the repository:**

```bash
git clone git@github.com:CosmicSpectrum/Video-player.git
cd ./Video-player
```

2. **Install dependencies:**

```bash
npm install
```

3. **Start the dev server:**

```bash
npm run dev
```

4. **Open in browser:**

Go to [http://localhost:5173](http://localhost:5173) or the port specified in your Vite config.

---

## Notes

- All logic is written in modular, reusable React components
- Due to time, video context was not centralized (see `videoRef` drilling)
