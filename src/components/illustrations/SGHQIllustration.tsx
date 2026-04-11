import Image from "next/image";

export default function SGHQIllustration({ className }: { className?: string }) {
  return (
    <div className={`relative overflow-hidden rounded-xl ${className ?? ""}`}>
      <Image
        src="/images/illustrations/sg-hq.png"
        alt="Singapore HQ — Meta Clearing Station"
        width={1600}
        height={900}
        className="w-full h-auto object-cover"
        priority={false}
      />
    </div>
  );
}
