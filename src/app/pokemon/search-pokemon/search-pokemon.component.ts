import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../pokemon';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, Observable, Subject, switchMap } from 'rxjs';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-search-pokemon',
  templateUrl: './search-pokemon.component.html',
  styles: ``
})
export class SearchPokemonComponent implements OnInit{
  // searchTerms représente un flux de données dans le temps
  searchTerms = new Subject<string>();
  // Subject permet de piloter le flux de données car Obs ne peut que recevoir via subscribe
  pokemons$: Observable<Pokemon[]>;

  constructor( 
    private router:Router,
  private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.pokemons$ = this.searchTerms.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      switchMap((term) => this.pokemonService.searchPokemonList(term))
    );
    
  }

  search(term:string) {
    this.searchTerms.next(term);
    // next est une methode de type push mais avec un flux de données
  }


  goToDetail(pokemon:Pokemon) {
    const link = ['/pokemon', pokemon.id];
    this.router.navigate(link);
  }
}
