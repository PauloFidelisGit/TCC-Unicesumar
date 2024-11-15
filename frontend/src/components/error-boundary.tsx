import { CustomErrorAbstract } from "@/domain/errors";
import { Component, ErrorInfo, ReactNode } from "react";
import { DefaultErrorComponent } from "./default-error-component";

interface Props {
  children?: ReactNode;
  errorComponent?: (props: {
    error: CustomErrorAbstract | null;
  }) => JSX.Element;
}

interface State {
  hasError: boolean;
  error: CustomErrorAbstract | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(_: CustomErrorAbstract): State {
    return { hasError: true, error: _ };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    const { errorComponent: ErrorComponent } = this.props;
    if (this.state.hasError) {
      if (ErrorComponent) return <ErrorComponent error={this.state.error} />;

      return <DefaultErrorComponent error={this.state.error} />;
    }

    return this.props.children;
  }
}
