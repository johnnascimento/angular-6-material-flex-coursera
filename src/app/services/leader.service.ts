import { Injectable } from '@angular/core';

import { Leader } from '../shared/leader';
import { LEADERS } from '../shared/leaders';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  getLeaders(): Promise<Leader[]> {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(LEADERS);
      });
    });
  }

  getLeader(id: string): Promise<Leader> {
    let selectedDish = new Promise(resolve => {
      setTimeout(() => {
        resolve(LEADERS.filter((leader) => { if (leader.id === id) { return leader; } })[0]);
      })
    })

    return selectedDish;
  }

  getFeaturedLeader(): Promise<Leader> {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(LEADERS.filter((leader) => leader.featured)[0]);
      })
    })
  }

  constructor() { }
}
