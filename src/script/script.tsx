export const openCamera = async (setImage: any) => {
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

      document.body.appendChild(video);
      video.style.position = "absolute";
      video.style.top = "50%";
      video.style.left = "50%";
      video.style.transform = "translate(-50%, -50%)";

      video.style.width = "400px";
      video.style.height = "auto";

      const captureButton = document.createElement("button");
      captureButton.innerText = "Capture";
      document.body.appendChild(captureButton);

      captureButton.style.position = "absolute";
      captureButton.style.top = "430px";
      captureButton.style.left = "50%";
      captureButton.style.transform = "translateX(-50%)";
      captureButton.style.padding = "10px 20px";
      captureButton.style.fontSize = "16px";
      captureButton.style.backgroundColor = "#015579";
      captureButton.style.color = "#fff";
      captureButton.style.border = "none";
      captureButton.style.cursor = "pointer";

      captureButton.addEventListener("click", () => {
        ctx.drawImage(video, 0, 0);
        const imageUrl = canvas.toDataURL("image/png");
        setImage(imageUrl);

        stream.getTracks().forEach((track) => track.stop());

        video.remove();
        captureButton.remove();
      });
    };
  } catch (err) {
    console.error("Camera access denied:", err);
  }
};
