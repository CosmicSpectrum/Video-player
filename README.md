# Simple video player project

Simple video player project to demonstrate frontend dev skill, In this docs you'll find basic docs, approach and how to
run instructions of how to run this project :-)

## Approach

I decided to allow local video loading atm, to save time,
Generally, I went for as modular and contained as possible, I wanted to make sure that each component was as
self-contained as possible, and that the state was managed in a centralized manner to facilitate easy access and updates
across different components.
The only weak point of this design is the prop drilling of the video ref component that I personally don't like.
Just a note, I should've use context to keep all video metadata shared between all components, I won't refactor due to
time constraints.

### Volume Control

The `VolumeController` component is responsible for managing the volume of the video. It uses a `videoRef` to directly
manipulate the video element's volume property. The component also includes a slider that appears when the volume icon
is clicked, allowing the user to adjust the volume interactively.

### Video Player

The `VideoPlayer` component is the main component that handles video playback. It allows users to load a video file from
their local system and uses a `videoRef` to control the video element. The video URL is generated
using `URL.createObjectURL` to create a blob URL for the selected video file.

### Video Duration

The `VideoDuration` component displays the current playback time and the total duration of the video. It listens for
the `timeupdate` event on the video element to update the current time and uses a utility function to format the time
for display.

### Player Controls

The `PlayerControls` component includes various controls for the video player, such as play/pause, volume control, and
duration display. It receives the `videoRef` from the `VideoPlayer` component to interact with the video element
directly.

### Timeline

The `Timeline` component displays the current playback time and allows the user to seek to a specific time in the video.
It also utilizes the useExtractThumbnail hook to extract the thumbnail of the video at the current time to provide nicer
UX for the user.

### Utility Functions

The project includes utility functions, such as `formatTime`, to handle common tasks like formatting the time for
display in the `VideoDuration` component.

## Technologies Used

- TypeScript
- React
- Vite
- npm

## How to Run This Project Locally

To run this project locally, follow these steps:

1. **Clone the repository:**
   ```sh
   git clone git@github.com:CosmicSpectrum/Video-player.git
   cd ./Video-player
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Run the development server:**
   ```sh
   npm run dev
   ```

4. **Open the project in your browser:**
   Open your browser and navigate to `http://localhost:5173` (or the port specified in your Vite configuration).