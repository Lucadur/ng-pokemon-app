import { Component, Input, OnInit } from '@angular/core';
import { PokemonService } from '../pokemon.service';
import { Pokemon } from '../pokemon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pokemon-form',
  templateUrl: './pokemon-form.component.html',
  styleUrls: ["./pokemon-form.css"]
})
export class PokemonFormComponent implements OnInit {
  @Input() pokemon: Pokemon;
  types: string [];
  isAddForm: boolean;

  constructor(private pokemonService: PokemonService,
    private router: Router
  ){

  }

  ngOnInit(): void {
    this.types = this.pokemonService.getPokemonTypelist();
    this.isAddForm = this.router.url.includes('add');
  }

  hasType(type: string): boolean {
    return this.pokemon.types.includes(type);
  }

  selectType($event: Event, type: string) {
    const isChecked = ($event.target as HTMLInputElement).checked;

    if(isChecked) {
      this.pokemon.types.push(type);
    } else {
      const index = this.pokemon.types.indexOf(type);
      this.pokemon.types.splice(index, 1);
    }
  }

  onSubmit() {
    if(this.isAddForm) {
      this.pokemonService.addPokemon(this.pokemon)
      .subscribe((pokemon: Pokemon) => this.router.navigate(['/pokemon', pokemon.id]))
    } else {
    this.pokemonService.updatePokemon(this.pokemon).subscribe(() => 
          this.router.navigate(['/pokemon', this.pokemon.id]))
        }
  }

  isTypesValid(type: string):boolean {
    if (this.pokemon.types.length == 1 && this.hasType(type)) {
      return false;
    } else if (this.pokemon.types.length > 2 && !this.hasType(type)) {
      return false
    }
    return true;
  }
}
