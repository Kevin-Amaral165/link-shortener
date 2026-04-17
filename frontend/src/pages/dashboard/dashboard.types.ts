export interface LinkItem {
  id: number;
  original_url: string;
  short_code: string;
  total_clicks?: number;
};

export interface LinkStats {
  total: number;
  last7Days: Record<string, number>;
};

export interface DashboardState {
  currentPage: number;
  error: string;
  isLoading: boolean;
  isModalOpen: boolean;
  links: LinkItem[];
  linkStats: Record<number, LinkStats>;
  newUrl: string;
  selectedLink: LinkItem | null;
  successMsg: string;
  totalItems: number;
};