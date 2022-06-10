export interface Quiz{
  id: string,
  questions: [
    {
      answer:number,
      answers: [],
      question:string
    }
  ],
  title: string,
  xp: number,
  status: string | false;
}
