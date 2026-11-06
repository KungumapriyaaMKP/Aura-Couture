import React from 'react';
import { VideoScrubberCanvas } from './VideoScrubberCanvas';

export const BoutiqueCanvas: React.FC = () => {
  return (
    <div className="fixed inset-0 w-full h-full bg-[#fffafc] z-0 pointer-events-none">
      <VideoScrubberCanvas />
    </div>
  );
};
