export const openCamera = async (setImage:any) => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    const video = document.createElement("video");
    video.srcObject = stream;
    video.play();

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      console.error("Failed to get 2D context");
      return;
    }

    video.onloadedmetadata = () => {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      setTimeout(() => {
        ctx.drawImage(video, 0, 0);
        const imageUrl = canvas.toDataURL("image/png"); 
        setImage(imageUrl)
        stream.getTracks().forEach((track) => track.stop()); 
      }, 3000);
    };
  } catch (err) {
    console.error("Camera access denied:", err);
  }
};
