import { Component, OnInit } from '@angular/core';
import { User } from '../model/User';
import { UserService } from '../services/user.service';

export enum Planet {
  MARS = 1,
  JUPITER,
  URANUS
}

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.css']
})
export class VoteComponent implements OnInit {

  userData: User;
  myStorage: Storage = window.sessionStorage;

  showVotes: boolean = false;
  userVote: number = 0;
  votes: Array<number> = [];

  constructor(private userService: UserService) {
    this.userData = User.fromStorage(this.myStorage)!;
  }

  ngOnInit(): void {
    if(this.userData){
      this.showVotes = true;
      this.userVote = this.userData.getVote()!;
    }

    // Se cargan los votos de cada planeta
    this.userService.getAllVotes(this.userData.getToken()!).subscribe({
      next: (data) => {
        this.votes[Planet.MARS]=0;
        this.votes[Planet.JUPITER]=0;
        this.votes[Planet.URANUS]=0;
        data.forEach((planetVote: number)=>{
          this.sumVote(planetVote);
        })
      },
      error: (error) => {
        console.log(error)
        return false;
      }});
  }

  /**
   * Enviar votación usuario
   * @param planet planeta votado
   */
  vote(planet: number): void {
    if(this.userData) {
      this.userService.vote(this.userData.getUsername(), planet, this.userData.getToken()!).subscribe({
        next: () => {
          // Se actualizan contadores de votos
          if (this.userVote !== null) {
            this.votes[this.userVote]--;
          }
          this.votes[planet]++;
          // Se setea nuevo voto
          this.userVote = planet;
          this.userData.setVote(planet);
          this.myStorage.setItem('user',JSON.stringify(this.userData));
        },
        error: (error) => {
          console.log(error)
        }});
    }
  }

  /**
   * Suma un voto a los totales
   * @param planetVote voto de planeta
   */
  sumVote(planetVote: number) {
    switch(planetVote) {
      case Planet.MARS:
        if(this.votes[Planet.MARS]) {
          this.votes[Planet.MARS] += 1;
        } else {
          this.votes[Planet.MARS] = 1;
        }
        break;
      case Planet.JUPITER:
        if(this.votes[Planet.JUPITER]) {
          this.votes[Planet.JUPITER] += 1;
        } else {
          this.votes[Planet.JUPITER] = 1;
        }
        break;
      case Planet.URANUS:
        if(this.votes[Planet.URANUS]) {
          this.votes[Planet.URANUS] += 1;
        } else {
          this.votes[Planet.URANUS] = 1;
        }
        break;
    }
  }  

  // Acceso a enum Planet desde html
  public get Planet(): typeof Planet {
    return Planet; 
  }
}

