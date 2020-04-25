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

export function create(payload) {
  return request({
    url: `/me/timers.json`,
    method: METHODS.POST,
    data: payload
  });
}
export function pause({ id }) {
  return request({
    url: `/me/timers/${id}/pause.json`,
    method: METHODS.PUT
  });
}

export function resume({ id }) {
  return request({
    url: `/me/timers/${id}/resume.json`,
    method: METHODS.PUT
  });
}

export function complete({ id }) {
  return request({
    url: `me/timers/${id}/complete.json`,
    method: METHODS.PUT
  });
}

export function update(payload) {
  return request({
    url: `me/timers/${payload.id}.json`,
    method: METHODS.PUT,
    data: { timer: payload }
  });
}

export function remove({ id }) {
  return request({
    url: `me/timers/${id}.json`,
    method: METHODS.DELETE
  });
}

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
