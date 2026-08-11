import { ImageIcon } from 'lucide-react';

export interface ScreenshotSlot {
  /** Drop the real screenshot path here later. Leave empty to show the placeholder. */
  src?: string;
  alt: string;
  label: string;
}

interface ScreenshotPlaceholderProps extends ScreenshotSlot {
  onImageClick?: (src: string, alt: string) => void;
}

const ScreenshotPlaceholder = ({ src, alt, label, onImageClick }: ScreenshotPlaceholderProps) => {
  return (
    <figure className="flex flex-col">
      {src ? (
        <button
          type="button"
          onClick={() => onImageClick?.(src, alt)}
          className="rounded-xl overflow-hidden border border-white/10 shadow-xl bg-black/40 transition-transform hover:scale-[1.02]"
        >
          <img src={src} alt={alt} loading="lazy" className="w-full h-auto object-cover" />
        </button>
      ) : (
        <div
          role="img"
          aria-label={alt}
          className="rounded-xl border border-dashed border-tech-blue/40 bg-black/30 aspect-[4/3] flex flex-col items-center justify-center text-center px-4 gap-2"
        >
          <ImageIcon className="h-7 w-7 text-tech-blue/70" aria-hidden="true" />
          <span className="text-xs font-medium text-gray-200">{label}</span>
          <span className="text-[11px] text-gray-500">Screenshot slot</span>
        </div>
      )}
      {src && <figcaption className="text-xs text-gray-400 italic mt-2 px-1">{label}</figcaption>}
    </figure>
  );
};

export default ScreenshotPlaceholder;
