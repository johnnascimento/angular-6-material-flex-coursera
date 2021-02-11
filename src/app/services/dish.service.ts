import { Injectable } from '@angular/core';

import { Dish } from '../shared/dish';
import { DISHES } from '../shared/dishes';

@Injectable({
  providedIn: 'root'
})
export class DishService {
  constructor() { }

  getDishes(): Promise<Dish[]> {
    return new Promise(resolve => {
      // Simulating server latency
      setTimeout(() => {
        resolve(DISHES);
      }, 2000)
    });
  }

  getDish(id: string): Promise<Dish> {
    return new Promise(resolve => {
      let selectedDish = DISHES.filter((dish) => { if (dish.id === id) { return dish; } })[0];

      setTimeout(() => {
        resolve(selectedDish);
      }, 2000);
    });
  }

  getFeaturedDish(): Promise<Dish> {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(DISHES.filter((dish) => dish.featured)[0]);
      }, 2000)
    })
  }
}
