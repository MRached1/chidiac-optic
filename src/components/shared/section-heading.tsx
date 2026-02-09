import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
  align?: "left" | "center";
}

export function SectionHeading({
  title,
  subtitle,
  className,
  align = "center",
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-10",
        align === "center" && "text-center",
        className
      )}
    >
      {subtitle && (
        <p className="text-sm uppercase tracking-[0.2em] text-primary-400 mb-2 font-sans font-medium">
          {subtitle}
        </p>
      )}
      <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">
        {title}
      </h2>
    </div>
  );
}
