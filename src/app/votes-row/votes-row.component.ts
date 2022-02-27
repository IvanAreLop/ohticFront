import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-votes-row',
  templateUrl: './votes-row.component.html',
  styleUrls: ['./votes-row.component.css']
})
export class VotesRowComponent implements OnInit {

  @Input() planet: number = 0;
  @Input() userVote: number = 0;
  @Input() votes: Array<number> = [];
  @Input() planetName: string = "";
  @Output() voteEvent: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  votePlanet() {
    this.voteEvent.emit(this.planet);
  }

}
