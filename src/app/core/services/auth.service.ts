import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private afa: AngularFireAuth // afa significa Angular Fire Auth
  ) { }

  createUser(email: string, password:string) {
    return this.afa.createUserWithEmailAndPassword(email, password); // Retorna una promesa
  }

  login(email: string, password: string) {
    return this.afa.signInWithEmailAndPassword(email, password);
  }

  logOut() {
    return this.afa.signOut();
  }

  hasUser() {
    /*this.afa.authState
    .subscribe( user => {
      console.log(user == null );
    });*/

    return this.afa.authState; // Mejor retorno un observable y lo manejo en admin.guards.ts
  }
}
