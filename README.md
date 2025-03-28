# Simple video player project
Simple video player project to demonstrate frontend dev skill, In this docs you'll find basic docs, approach and how to run instructions of how to run this project :-) 

## Approach:
I decided to allow video loading from local files at the moment to avoid complexity of loading it from
a random api. I will save the entire file object in the parent component state at the moment to allow
easier access from the other player components, this will allow me to build a nice reactive timeline with thumbnails
when it comes to the custom controls I feel a bit uncomfortable with drill the video ref all the way to the volume/duration
components. but I'll live with that for now.