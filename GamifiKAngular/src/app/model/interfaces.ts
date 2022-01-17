export interface user{
  id:number;
  nickname:string;
  mail:string;
  password?:string;
  name:string;
  surname:string;
  center?:string;
  birthday:Date;
  userType:number;
  image:string;
}

export interface ranking{
  id:number;
  name:string;
  memberCount:number;
  members:number[];
  teacher:number;
}
