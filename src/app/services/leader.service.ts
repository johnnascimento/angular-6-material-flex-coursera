import { Injectable } from '@angular/core';

import { Leader } from '../shared/leader';
import { LEADERS } from '../shared/leaders';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  getLeaders(): Leader[] {
    return LEADERS;
  }

  getLeader(id: string): Leader {
    let selectedDish = LEADERS.filter((leader) => {
      if(leader.id === id) {
        return leader;
      }
    })[0];

    return selectedDish;
  }

  getFeaturedLeader() {
    return LEADERS.filter((leader) => leader.featured)[0];
  }

  constructor() { }
}
