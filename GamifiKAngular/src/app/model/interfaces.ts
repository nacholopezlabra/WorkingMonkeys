export interface user{
  id:number;
  nickname:string;
  mail:string;
  password:string;
  name:string;
  surname:string;
  center?:string|null;
  birthday:string;
  userType:number;
  image:string;
}

export interface ranking{
  id_ranking:number;
  name:string;
  id_teacher: number;
  code: string;
}

export interface task {
  id_task: number;
  name: string;
  id_ranking: number;
}
export interface scores {
  id_student:number;
  scores:score[];
}

export interface score{
  id_task:number;
  score:number;
}
