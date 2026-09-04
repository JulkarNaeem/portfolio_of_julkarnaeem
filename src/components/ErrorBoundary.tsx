import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error in component tree:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      return (
        <div className="min-h-[50vh] flex flex-col items-center justify-center p-8 text-center bg-slate-50 text-slate-800">
          <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mb-4 text-xl font-bold">
            !
          </div>
          <h2 className="text-xl font-bold mb-2 font-sans">Something went wrong</h2>
          <p className="text-sm text-slate-600 max-w-md mb-6 font-mono">
            We encountered an unexpected error loading this section.
          </p>
          <button
            onClick={() => {
              this.setState({ hasError: false });
              window.location.href = '/';
            }}
            className="px-5 py-2.5 bg-steel-blue text-white text-xs font-semibold rounded-lg hover:bg-charcoal transition-colors cursor-pointer"
          >
            Return to Homepage
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
