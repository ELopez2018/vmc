import { environment } from "src/environments/environment"

export const Servers = {
 URL: environment.server,
  home: "/"
}
export const Apis = {
  USERS: '/users',
  ASSIGNMENT: '/assignment',
  MEETINGS: '/assignment',
  CONFIGS: '/configs',
  CONGREGATIONS: '/congregations',
  AUTH: '/auth',
  PROGRAM: '/program',
  WEEKLYPROGRAM: '/weeklyProgram',
  ASSIGNMENT_TYPES: '/assignment-types',
  USER_ASSIGNMENT_TYPES: '/user-assignment-types',
  MEETING_PARTS: '/meeting-parts',
}
