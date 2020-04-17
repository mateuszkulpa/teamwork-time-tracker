import request, { METHODS } from "./request";

export function allTimeEntries() {
  return request({
    url: `/projects/api/v3/time.json`,
    method: METHODS.GET,
    params: {
      include: "projects,tasks,tasks.tasklists,tasks.parentTasks",
      pageSize: 1000,
      orderMode: "desc"
    }
  });
}
