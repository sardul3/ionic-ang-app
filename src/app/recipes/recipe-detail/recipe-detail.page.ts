import { RecipesService } from './../recipes.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.page.html',
  styleUrls: ['./recipe-detail.page.scss'],
})
export class RecipeDetailPage implements OnInit {
  selectedRecipe: Recipe;

  constructor(private activatedRoute: ActivatedRoute,
              private recipeService: RecipesService,
              private router: Router) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if (!paramMap.has('recipeId')) {
        // re-direct
        return;
      }
      const recipeId = paramMap.get('recipeId');
      this.selectedRecipe = this.recipeService.getRecipe(recipeId);
    });
  }

  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.selectedRecipe.id);
    this.router.navigate(['/recipes']);

  }

}
