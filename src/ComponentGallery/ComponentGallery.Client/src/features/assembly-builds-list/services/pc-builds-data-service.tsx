import axios from "axios";
import { PcBuildDetails } from "../models/pc-build-details";

interface GetPcBuildsResponse {
  pcBuilds: PcBuildDetails[];
}

export function usePcBuildsDataService() {
  return {
    async getPcBuilds(pageIndex: number) {
      const response = await axios.get<GetPcBuildsResponse>(
        `/api/pcbuilds?pageIndex=${pageIndex}`
      );
      return response.data.pcBuilds;
    },
    async getPcBuildById(buildId: number) {
      const response = await axios.get<PcBuildDetails>(
        `/api/pcbuilds/${buildId}`
      );
      return response.data;
    },
  };
}
