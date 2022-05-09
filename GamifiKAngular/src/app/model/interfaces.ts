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
  image:string;
}

export interface task {
  id_task: number;
  name: string;
  id_ranking: number;
}
export interface scores {
  id_student:number;
  scores:score[];
  totalScore:number;
  selectedScore:number;
}

export interface score{
  id_task:number;
  score:number;
}

export interface notis{
  id:number,
  rankingName:string,
  status:number //status can be 0, 1 , 2. 0 = pendent, 1 = accepted, 2 = denied
}
//"id":"3","id_teacher":"22","code":"27873814","status":"2","student_nickname":"pol","name":"pol","surname":"pol"
export interface request{
  id:number,
  id_teacher:number,
  code:string,
  status:number,
  studentNickname:string,
  studentName:string,
  studentSurname:string,
  rankingName:string
}

export interface pentabilities{
  id:number,
  explanation: string
}
