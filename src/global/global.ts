export interface Student {
  id?: string;
  name?: string;
  idNo?: string;
  phoneNo?: string;
  category?: string;
  email?: string;
  regNo?: string;
  course?: string;
  faculty?: string;
  residence?: string;
  createdAt?: Date;
}

export interface Staff {
  id?: string;
  idNo?: string;
  name?: string;
  category?: string;
  email?: string;
  faculty?: string;
  phoneNo?: string;
  createdAt?: Date;
}

export interface Suggestion {
  title?: string;
  createdAt?: string;
  category?: string; // Category of the type of person posting a suggestion whether staff or student
  complaint?: string;
  complainant?: string;
  addressedTo?: string;
  addressed?: Boolean;
}

export interface GeneralWorker {
  id?: string;
  name?: string;
  jobtitle?: string;
  category?: string;
  idNo?: string;
  email?: string;
  phoneNo?: string;
  createdAt?: Date;
}
