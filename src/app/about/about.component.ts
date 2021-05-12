import { Component, OnInit, Inject } from '@angular/core';
import { flyInOut, expand } from "../animations/app.animation";

import { Leader } from '../shared/leader';
import { LeaderService } from '../services/leader.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  // tslint:disable-next-line:use-host-property-decorator
  host: {
  '[@flyInOut]': 'true',
  'style': 'display: block;'
  },
  animations: [
      flyInOut(),
      expand()
  ]
})
export class AboutComponent implements OnInit {
  leaders: Leader[];
  leaderErrMsg: string;

  constructor(
    private leaderService: LeaderService,
    @Inject('BaseURL') private BaseURL: string
  ) { }

  ngOnInit() {
    this.leaderService.getLeaders()
    .subscribe((leader) => this.leaders = leader,
      errmsg => this.leaderErrMsg = <any>errmsg);
  }

}
