export interface CourseName {
  id: number;
  name: string;
}

export interface ISchool {
  id: number;
  name: string;
  fullname: string;
  courses: CourseName[];
}

export interface ICourse {
  id: number;
  name: string;
  discussions : IDiscussionCourse[];
}

export interface IDiscussionCourse {
  id: number;
  title: string;
}

export interface UserDiscussion {
  id: number;
  createdAt : string;
  title: string;
  question: string;
  rating: number;
  replies: number
}

export interface IUser {
  id : string,
  userName: string,
  roles : string[],
  token : string,
  isAuthenticated : boolean,
  profileImage: string,
  isActive : boolean,
  discussions: UserDiscussion[],
}




export interface IDiscussion {
  id: number;
  title: string;
  question: string;
  createdDate: Date;
  courseName: string;
  discussionReplies: number,
  rating: number;
  user: string
  userId: string;
  name: string;
  userName: string;
  profileImage: string;
  replies: IReply[];
}

export interface IReply {
  reply : string,
  id: number,
  userId: string,
  userName : string,
  profileImage: string,
}
