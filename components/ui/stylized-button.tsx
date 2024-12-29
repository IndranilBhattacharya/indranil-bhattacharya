import { cn } from "@/lib/utils";

export default function StylizedButton({
  children,
  revealChildren,
  className,
  onClick,
}: Readonly<{
  children: React.ReactNode;
  revealChildren: React.ReactNode;
  className?: string;
  onClick: () => void;
}>) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-fit relative inline-flex items-center justify-start px-6 py-3 overflow-hidden transition-all bg-primary/80 rounded-xl group/btn border-0 outline-0",
        className
      )}
    >
      <span className="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-primary rounded group-hover/btn:-mr-4 group-hover/btn:-mt-4">
        <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-background"></span>
      </span>
      <span className="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full translate-y-full bg-primary/90 rounded-xl group-hover/btn:mb-12 group-hover/btn:translate-x-0"></span>
      <div className="relative text-center text-white overflow-hidden">
        <span aria-hidden="true" className="invisible">
          {revealChildren}
        </span>
        <span className="absolute inset-0 block transition-transform duration-300 group-hover/btn:-translate-y-full">
          {children}
        </span>
        <span className="absolute inset-0 translate-y-full transition-transform duration-300 group-hover/btn:translate-y-0">
          {revealChildren}
        </span>
      </div>
    </button>
  );
}
