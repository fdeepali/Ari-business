import React, { useEffect, useRef } from "react";
import * as pdfjsLib from "pdfjs-dist";

pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

const PdfViewer = ({ file }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!file) return;

    const loadPdf = async () => {
      containerRef.current.innerHTML = "";
      try {
        const pdf = await pdfjsLib.getDocument({ url: file }).promise;

        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const scale = 1.2;
          const viewport = page.getViewport({ scale });
          const canvas = document.createElement("canvas");
          const context = canvas.getContext("2d");
          canvas.width = viewport.width;
          canvas.height = viewport.height;
          containerRef.current.appendChild(canvas);
          await page.render({ canvasContext: context, viewport }).promise;
        }
      } catch (err) {
        console.error("Error loading PDF:", err);
      }
    };

    loadPdf();
  }, [file]);

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        backgroundColor: "#f9fafb",
        padding: "10px",
      }}
    ></div>
  );
};

export default PdfViewer;
