import { motion, useReducedMotion } from "framer-motion";

type Star = {
  id: string;
  left: string;
  top: string;
  size: number;
  opacity: number;
  duration: number;
  delay: number;
};

function createStars(
  count: number,
  minSize: number,
  maxSize: number,
  minOpacity: number,
  maxOpacity: number,
  seedX: number,
  seedY: number,
): Star[] {
  return Array.from({ length: count }, (_, i) => {
    const sizeRatio = ((i * 17) % 100) / 100;
    const opacityRatio = ((i * 29) % 100) / 100;
    const durationRatio = ((i * 13) % 100) / 100;
    const delayRatio = ((i * 19) % 100) / 100;

    return {
      id: `${seedX}-${seedY}-${i}`,
      left: `${(i * seedX + 11) % 100}%`,
      top: `${(i * seedY + 7) % 100}%`,
      size: minSize + sizeRatio * (maxSize - minSize),
      opacity: minOpacity + opacityRatio * (maxOpacity - minOpacity),
      duration: 2.8 + durationRatio * 3.8,
      delay: delayRatio * 4,
    };
  });
}

const starLayers = [
  createStars(55, 1, 2.2, 0.18, 0.55, 37, 61),
  createStars(35, 1.4, 3.2, 0.25, 0.75, 53, 41),
  createStars(18, 2, 4.2, 0.35, 0.95, 71, 47),
];

export default function StarsBackground({
  reducedMotion,
}: {
  reducedMotion: boolean;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-[-1]"
    >
      <div
        aria-hidden="true"
        className="
      pointer-events-none absolute
      inset-0 -z-10
      opacity-[0.055]
      [background-image:linear-gradient(rgba(255,255,255,0.18)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.18)_1px,transparent_1px)]
      [background-size:90px_90px]
    "
      />
      {starLayers.map((layer, layerIndex) => (
        <div key={layerIndex} className="absolute inset-0">
          {layer.map((star) => (
            <motion.span
              key={star.id}
              className="absolute rounded-full bg-white"
              style={{
                left: star.left,
                top: star.top,
                width: star.size,
                height: star.size,
                opacity: star.opacity,
                boxShadow:
                  layerIndex === 2
                    ? "0 0 10px rgba(255,255,255,0.35)"
                    : "0 0 6px rgba(255,255,255,0.2)",
              }}
              animate={
                reducedMotion
                  ? undefined
                  : {
                      opacity: [
                        star.opacity * 0.65,
                        star.opacity,
                        star.opacity * 0.75,
                      ],
                      scale: [1, 1.15, 1],
                    }
              }
              transition={{
                duration: star.duration,
                delay: star.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
