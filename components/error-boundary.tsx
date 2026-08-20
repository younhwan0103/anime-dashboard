"use client";

import { Component, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  fallback: ReactNode;
};

type State = {
  hasError: boolean;
};

/**
 * 에러 경계는 클래스 컴포넌트로만 만들 수 있다.
 * getDerivedStateFromError / componentDidCatch에 대응하는 훅이 없다.
 * React에서 클래스가 여전히 필요한 거의 유일한 자리다.
 */
export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.error("[ErrorBoundary]", error);
  }

  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}
