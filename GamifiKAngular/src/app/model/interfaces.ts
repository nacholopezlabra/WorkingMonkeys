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
