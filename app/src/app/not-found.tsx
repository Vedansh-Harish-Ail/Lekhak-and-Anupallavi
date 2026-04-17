import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-surface p-6 text-center">
      <h2 className="font-headline text-4xl text-on-surface mb-4">Are you lost?</h2>
      <p className="font-body text-on-surface-variant mb-8 text-balance">
        We could not find the digital heirloom you are looking for. Please check the link.
      </p>
      <Link href="/">
        <button className="bg-primary text-on-primary py-3 px-8 font-label tracking-extreme text-xs font-light hover:bg-primary/90 transition-colors duration-500 rounded-full">
          RETURN TO HOME
        </button>
      </Link>
    </div>
  );
}
