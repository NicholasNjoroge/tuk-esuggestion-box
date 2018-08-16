import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import {GeneralWorker, Staff, Student, Suggestion} from '../../global/global';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';


declare const $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [AngularFirestore]
})
export class HomeComponent implements OnInit {
  loggedIn: Boolean = false;
  tab: any;
  postNow: Boolean = false;

  user = {
    name: '',
    category: '',
    email: '',
    phoneNo: '',
    idNo: '',
    password: ''
  };
  thisuser: any; // Owner of the account
  student: Student = {};
  suggestion: Suggestion = {};
  staff: Staff = {};
  generalWorker: GeneralWorker = {};

  private studentCollection: AngularFirestoreCollection<Student>;
  students: Observable<Student[]>;
  private staffCollection: AngularFirestoreCollection<Staff>;
  staffs: Observable<Staff[]>;
  private generalWorkersCollection: AngularFirestoreCollection<GeneralWorker>;
  generalWorkers: Observable<GeneralWorker[]>;
  private suggestionCollection: AngularFirestoreCollection<Suggestion>;
  suggestions: Suggestion[];

  category: any;

  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore, private router: Router,
  private flashMessage: FlashMessagesService) {
    //  Check for login status
    this.afAuth.authState.subscribe((res) => {
      if (res === null) {
        this.loggedIn = false;
      } else if (!res.isAnonymous) {
        this.thisuser = res.uid;
        this.loggedIn = true;
      //  Fetch the user category from the database
      } else {
        this.loggedIn = false;
      }
    });

    //  Initialize Collections
    this.studentCollection = this.afs.collection<Student>('Students');
    this.staffCollection = this.afs.collection<Staff>('Staff');
    this.generalWorkersCollection = this.afs.collection<GeneralWorker>('General Workers');
    this.suggestionCollection = this.afs.collection<Suggestion>('Suggestions');
  }

  ngOnInit() {
    this.tab = 'active';
    this.fetchSuggestions();
  }

  postSuggestion() {
    if (this.loggedIn) {
      //  Go ahead and post
      this.postNow = true;
    } else {
      //  show the sign up form
      this.postNow = false;
    }
  }


  async login(user) {
    const result = await this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
    if (result) {
      //  Check if profile is filled then proceed to post suggestion page
      //  Set the logged in flag to true


    } else {
      //  Show Flash message that user doesnt exist or that the password or email might be wrong
    }
  }

  async signUp(user) {
    const result = await this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
    if (user.category === 'Student') {
      this.student.id = this.thisuser;
      this.student.name = user.name;
      this.student.idNo = user.idNo;
      this.student.email = user.email;
      this.student.phoneNo = user.phoneNo;
      this.student.createdAt = new Date();
      //  Save to student database
      this.studentCollection.add(this.student).then(() => {
      }).catch(err => console.log(err));

    } else if (user.category === 'Teaching Staff') {
      this.staff.id = this.thisuser;
      this.staff.name = user.name;
      this.staff.idNo = user.idNo;
      this.staff.email = user.email;
      this.staff.phoneNo = user.phoneNo;
      this.staff.createdAt = new Date();
      //  Save to staff collection
      this.staffCollection.add(this.staff).then(() => {
      }).catch(err => console.log(err));

    } else {
      this.generalWorker.id = this.thisuser;
      this.generalWorker.name = user.name;
      this.generalWorker.idNo = user.idNo;
      this.generalWorker.email = user.email;
      this.generalWorker.phoneNo = user.phoneNo;
      //  Save to general worker database
      this.generalWorkersCollection.add(this.generalWorker).then(() => {
      }).catch(err => console.log(err));
    }

  }

  async submitSuggestion() {
    console.log(this.suggestion);
    if (this.suggestion.category === undefined || this.suggestion.complaint === undefined || this.suggestion.addressedTo === undefined
      || this.suggestion.title === undefined) {
      this.flashMessage.show('Please fill in the required field!', {
        cssClass: 'alert-danger',
        duration: 3000
      });
      return this.postNow = false;
    } else  {
      this.suggestion.createdAt = new Date().toDateString();
      this.suggestion.addressed = false;
      // Save to the database
      this.suggestionCollection.add(this.suggestion).then(() => {
      }).catch(err => console.log(err));
      this.postNow = false; // Closes the post suggestion card
      this.suggestion = {};
    }
  }

  async fetchSuggestions() {
    this.suggestionCollection.valueChanges().subscribe((data) => {
      this.suggestions = data;
    });
  }

  logout() {
    this.afAuth.auth.signOut().then(() => {
      this.postNow = false;
      this.flashMessage.show('Successfully logged out! Login to Post a suggestion', {
        cssClass: 'alert-success',
        duration: 4000
      });
    }).catch(err => console.log(err));
  }

  tab_swap(type) {
    this.tab = type;
  }

}
