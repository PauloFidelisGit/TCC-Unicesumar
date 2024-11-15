import { ErrorBoundary } from "@/components/error-boundary";
import { DefaultSpinnerFallback } from "@/components/spinner";
import { cn } from "@/lib/utils";
import { Suspense } from "react";

// const pageContainerVariants = cva("", {
//   variants: {
//     width: {
//       container: "",
//     },
//   },
//   defaultVariants: {
//     width: "container",
//   },
// });

// interface PageContainerProps
//   extends VariantProps<typeof pageContainerVariants> {
//   children: React.ReactNode;
//   className?: string;
// }
interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
}
export function DashboardPageContainer({ children }: PageContainerProps) {
  return (
    <div>
      <ErrorBoundary>
        <Suspense fallback={<DefaultSpinnerFallback />}>{children}</Suspense>
      </ErrorBoundary>
    </div>
  );
}

interface PageTitleProps {
  children: React.ReactNode;
  className?: string;
}
export function DashBoardPageTitle({ children, className }: PageTitleProps) {
  return <h3 className={cn("text-xl", className)}>{children}</h3>;
}

export function DashboardPageSubtitle({
  children,
}: {
  children: React.ReactNode;
}) {
  return <p className="text-sm text-zinc-500">{children}</p>;
}
