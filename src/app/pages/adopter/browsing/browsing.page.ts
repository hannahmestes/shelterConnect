import { Component, OnInit } from '@angular/core';
import { Animal } from '../../../models/animal';
import { AnimalService } from '../../../services/animal.service';
import { UserService } from '../../../services/user.service';
import { FilterService } from 'src/app/services/filter.service';

@Component({
  selector: 'app-browsing',
  templateUrl: './browsing.page.html',
  styleUrls: ['./browsing.page.scss'],
})
export class BrowsingPage implements OnInit {

  currentAnimal: Animal;
  browsingCounter: number = 0;
  animals: Animal[];

  /**
   * This is currently NOT a good impl for animal browsing, just for demo purposes this should work
   */


  constructor(private animalService: AnimalService, private userService: UserService, private filterService: FilterService) {
   }

  ngOnInit() {
    this.animalService.animals$.subscribe(res => {
      this.animals = this.filterService.filterAnimals(res);
      this.currentAnimal = res[0];
    });
  }

  nextAnimal(){
    this.browsingCounter++;
    this.currentAnimal = this.animals[this.browsingCounter%this.animals.length];
  }

  prevAnimal(){
    this.browsingCounter--;
    this.currentAnimal = this.animals[this.browsingCounter%this.animals.length];
  }

  likeAnimal(){
    console.log(this.currentAnimal)
    this.userService.likeAnimal(this.currentAnimal.id);
  }

}
