import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../pokemon';
import { Router } from '@angular/router';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-list-pokemon',
  templateUrl: './list-pokemon.component.html',
  styles: ``
})
export class ListPokemonComponent {
  pokemonList: Pokemon[];


  constructor(
    private router: Router,
    private pokemonService : PokemonService
  ) {}

  ngOnInit() {
    this.pokemonService.getPokemonList().subscribe(pokemonList => this.pokemonList = pokemonList )
  }

  GoToPokemon(pokemon: Pokemon) {
    this.router.navigate(["/pokemon", pokemon.id])
  }
}
