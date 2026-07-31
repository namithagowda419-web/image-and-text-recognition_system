import React, { useRef, useEffect } from 'react';

export default function BoundingBoxCanvas({ imageUrl, detectedObjects = [] }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!imageUrl || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = imageUrl;

    img.onload = () => {
      // Scale canvas to parent display width
      const containerWidth = containerRef.current ? containerRef.current.clientWidth : 600;
      const scale = containerWidth / img.width;
      
      canvas.width = containerWidth;
      canvas.height = img.height * scale;

      // Draw background image
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      // Draw pastel luxury bounding boxes
      const colors = [
        { stroke: '#8C62B5', fill: 'rgba(191, 162, 219, 0.25)', tagBg: '#BFA2DB', text: '#1F2937' },
        { stroke: '#6366F1', fill: 'rgba(199, 210, 254, 0.25)', tagBg: '#C7D2FE', text: '#1F2937' },
        { stroke: '#10B981', fill: 'rgba(167, 243, 208, 0.25)', tagBg: '#A7F3D0', text: '#064E3B' },
        { stroke: '#F59E0B', fill: 'rgba(253, 230, 138, 0.25)', tagBg: '#FDE68A', text: '#78350F' }
      ];

      detectedObjects.forEach((obj, idx) => {
        if (!obj.bbox || obj.bbox.length < 4) return;

        const color = colors[idx % colors.length];
        const [x, y, w, h] = obj.bbox;

        // Apply scale factors
        const rectX = x * scale;
        const rectY = y * scale;
        const rectW = w * scale;
        const rectH = h * scale;

        // Draw bounding box
        ctx.strokeStyle = color.stroke;
        ctx.lineWidth = 3;
        ctx.strokeRect(rectX, rectY, rectW, rectH);

        // Fill background glow inside box
        ctx.fillStyle = color.fill;
        ctx.fillRect(rectX, rectY, rectW, rectH);

        // Draw Label Pill Tag
        const labelText = `${obj.label} ${(obj.confidence * 100).toFixed(0)}%`;
        ctx.font = 'bold 12px Inter, sans-serif';
        const textWidth = ctx.measureText(labelText).width;
        const padding = 8;
        const tagHeight = 22;

        ctx.fillStyle = color.tagBg;
        ctx.beginPath();
        ctx.roundRect(rectX, rectY > 25 ? rectY - 25 : rectY + 4, textWidth + padding * 2, tagHeight, 6);
        ctx.fill();

        ctx.fillStyle = color.text;
        ctx.fillText(labelText, rectX + padding, rectY > 25 ? rectY - 10 : rectY + 19);
      });
    };
  }, [imageUrl, detectedObjects]);

  return (
    <div ref={containerRef} className="w-full overflow-hidden rounded-2xl border border-[#E8DFF5] shadow-card-luxury bg-white">
      <canvas ref={canvasRef} className="w-full h-auto block" />
    </div>
  );
}
