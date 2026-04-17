// Libraries
import type { Link } from "@prisma/client/edge";

export interface CreateLinkInput {
  url: string;
}

export interface PaginationQuery {
  page?: number;
  limit?: number;
}

export interface LinkResponse {
  id: number;
  original_url: string;
  short_code: string;
  created_at: Date;
}

export interface LinkStatsResponse {
  total: number;
  last7Days: Record<string, number>;
}

export type ListLinksResult = {
  data: Link[];
  pagination: {
    total: number;
    page: number;
    totalPages: number;
  };
};