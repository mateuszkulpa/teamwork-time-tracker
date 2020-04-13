import request, { METHODS } from "./request";

export function allRunningTimers() {
  return request({
    url: `/projects/api/v3/me/timers.json`,
    method: METHODS.GET,
    params: {
      include: "projects,tasks,tasks.tasklists,tasks.parentTasks",
      pageSize: 1000
    }
  });
}

export function pause(timerId) {
  return request({
    url: `/me/timers/${timerId}/pause.json`,
    method: METHODS.PUT
  });
}

export function resume(timerId) {
  return request({
    url: `/me/timers/${timerId}/resume.json`,
    method: METHODS.PUT
  });
}

export function update(timerId) {
  return request({
    url: `me/timers/${timerId}.json`,
    method: METHODS.PUT
  });
}
