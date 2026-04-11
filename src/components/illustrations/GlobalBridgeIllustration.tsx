import Image from "next/image";

export default function GlobalBridgeIllustration({ className }: { className?: string }) {
  return (
    <div className={`relative overflow-hidden rounded-2xl ${className ?? ""}`}>
      <Image
        src="/images/illustrations/global-bridge.png"
        alt="Asia-Pacific Network Bridge — Singapore to Taiwan"
        width={1600}
        height={900}
        className="w-full h-auto object-cover"
        priority={false}
      />
    </div>
  );
}
