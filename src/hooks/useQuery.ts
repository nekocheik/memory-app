import { useLocation } from "react-router-dom";

export const useQuery = (): { Q: string } => {
  return new URLSearchParams(useLocation().search) as any;
};
