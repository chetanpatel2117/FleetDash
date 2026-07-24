import { Component } from "react";
import type { ErrorInfo, ReactNode } from "react";



interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  constructor (props: Props) {
    super(props);

    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError () {
    return {
      hasError: true,
    };
  }

  componentDidCatch (error: Error, errorInfo: ErrorInfo) {
    console.error(error);
    console.error(errorInfo);
  }

  render () {
    if (this.state.hasError) {
      return (
        <div className='flex min-h-screen items-center justify-center bg-slate-950 px-6'>
          <div className='max-w-lg rounded-xl border border-red-500/30 bg-slate-900 p-8 text-center shadow-xl'>
            <h1 className='text-3xl font-bold text-red-400'>Something went wrong</h1>

            <p className='mt-4 text-slate-300'>
              An unexpected error occurred while rendering this page.
            </p>

            <button
              onClick={() => window.location.reload()}
              className='mt-6 rounded-lg bg-blue-600 px-5 py-2 text-white transition hover:bg-blue-700'
            >
              Reload Application
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
