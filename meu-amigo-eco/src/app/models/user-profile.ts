import { activity } from './activity';

interface quizDone{
  quiz_id:string,
  status: string
}
interface classDone{
  class_id:string,
  status: boolean
}

export interface ProfileUser {
  uid?: string;
  email?: string;
  displayName?: string;
  activities?: activity[]  | [];
  photoURL?: string;
  firstName?:string;
  lastName?: string;
  exp:number;
  emailVerified?: boolean;
  quizzesDone?:quizDone[];
  classesDone?:classDone[];
}
