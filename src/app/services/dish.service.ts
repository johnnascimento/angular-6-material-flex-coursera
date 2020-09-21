import { Injectable } from '@angular/core';

import { Dish } from '../shared/dish';
import { DISHES } from '../shared/dishes';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  getDishes(): Dish[] {
    return DISHES;
  }

  getDish(id: string): Dish {
    let selectedDish = DISHES.filter((dish) => {
      if(dish.id === id) {
        return dish;
      }
    })[0];

    return selectedDish;
  }

  getFeaturedDish() {
    return DISHES.filter((dish) => dish.featured)[0];
  }

  constructor() { }
}
