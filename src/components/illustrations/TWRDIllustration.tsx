import Image from "next/image";

export default function TWRDIllustration({ className }: { className?: string }) {
  return (
    <div className={`relative overflow-hidden rounded-xl ${className ?? ""}`}>
      <Image
        src="/images/illustrations/tw-rnd.png"
        alt="Taiwan R&D Center — IoT & PCB Engineering"
        width={1600}
        height={900}
        className="w-full h-auto object-cover"
        priority={false}
      />
    </div>
  );
}
