import request, { METHODS } from "./request";
import store from "@/store";

export function searchTasks(searchTerm) {
  return request({
    url: `/search.json`,
    method: METHODS.GET,
    params: {
      searchTerm,
      searchFor: "tasks",
      includeCompletedItems: store.state.options.includeCompletedItems,
      includeArchiveProjects: store.state.options.includeArchiveProjects
    }
  });
}
