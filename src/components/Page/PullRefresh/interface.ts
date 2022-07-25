export interface RefreshHooks {
  startPullDownRefresh: () => void;
  stopPullDownRefresh: () => void;
}

export interface RefreshProps {
  color?: string;
  offset?: number;
  refresh?: RefreshHooks;
  onPullDownRefresh?: () => void;
}
