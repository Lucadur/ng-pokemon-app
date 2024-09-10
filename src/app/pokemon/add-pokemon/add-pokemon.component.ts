import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../pokemon';

@Component({
  selector: 'app-add-pokemon',
  template: `
    <h1 class="center">Ajouter un pokémon</h1>
    <app-pokemon-form [pokemon]="pokemon"></app-pokemon-form>
  `
})
export class AddPokemonComponent implements OnInit {
  pokemon: Pokemon;

  ngOnInit() {
    this.pokemon= new Pokemon();
  }
}
