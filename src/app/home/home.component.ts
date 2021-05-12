import { Component, OnInit, Inject } from '@angular/core';
import { flyInOut, expand } from "../animations/app.animation";

import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';

import { Promotion } from '../shared/promotion';
import { PromotionService } from '../services/promotion.service';

import { Leader } from "../shared/leader";
import { LeaderService } from "../services/leader.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
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
export class HomeComponent implements OnInit {
  dish: Dish;
  dishErrMsg: string;
  promotionErrMsg: string;
  leaderErrMsg: string;
  promotion: Promotion;
  leader: Leader;

  constructor(
    private dishServices: DishService,
    private promotionService: PromotionService,
    private leaderService: LeaderService,
    @Inject('BaseURL') private BaseURL: string) {}

  ngOnInit() {
    this.dishServices.getFeaturedDish()
      .subscribe((dish) => this.dish = dish,
        errmsg => this.dishErrMsg = <any>errmsg);

    this.promotionService.getFeaturedPromotion()
      .subscribe((promotion) => this.promotion = promotion,
        errmsg => this.promotionErrMsg = <any>errmsg);

      this.leaderService.getFeaturedLeader()
      .subscribe((leader) => this.leader = leader,
        errmsg => this.leaderErrMsg = <any>errmsg);
  }
}
