export enum Role {
  User = 'USER',
  Director = 'DIRECTOR',
  Coordination = 'COORDINATOR',
  Communication = 'COMMUNICATOR',
  Technicalarea = 'TECHNICIAN',
  Cafeteria = 'BARTENDER',
}

export interface UsersResponse {
  id: number
  username: string
  email: string
  firstName: string
  middleName?: string | null
  lastName: string
  image?: string | null
  emailVerified?: boolean
  birthDate?: null | string
  registrationDate?: Date
  lastSeen?: Date
  role: string
  banned: boolean
  online?: boolean

  // oneSignalId?: null
}
