import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from './../../../core/models/product.model';

@Pipe({
  name: 'cartProductsFilter'
})
export class CartProductsFilterPipe implements PipeTransform {

  transform(value: Product[]): any[] {
    
    /*let data = [1,2,6,1,2,5,9,'33','33'];
    let result = data.filter((item,index)=>{
      return data.indexOf(item) === index;
    })
    console.log(result); //[1,2,6,5,9,'33'] */

    let counter = 0;
    let resultCounted: any[] = []; // Array de Productos sin repeticiones y con sus contadores a retornar
  
    let resultUnrepeted = value.filter((item,index)=>{  // Array de productos del carrito sin repeticion
      return value.indexOf(item) === index; // Filtro solo la primera aparicion de los elementos asi obtengo el carrito sin repeticiones
    });

    for(let i=0; i<resultUnrepeted.length; i++) { // Por cada elemento no repetido cuento cuantas veces se repite en el array viejo de repeticiones
      const resultUnrepetedId = resultUnrepeted[i].id     // comparo por IDs

      let resultCounter = value.filter( (item) => {  // Creo un arreglo para guardar todas las repeticiones de un mismo producto para despues contarlas
        return item.id === resultUnrepetedId;        // Con la arrow funcion "filter" Filtro las repeticiones de c/uno de los elementos del array viejo con respecto a los que ya estaban filtradas en el array nuevo sin repeticiones para contar sus repeticiones
      }); 

      counter = resultCounter.length;  // Cuento c/una de las repeticiones de los elementos en el array de productos viejo  que ya esta en el array nuevo sin repeticiones

      resultCounted.push({ // Agrego un nuevo objeto al nuevo array con los productos del carrito sin repeticion y con su catidad de veces que se repetian en el array viejo.
        ...resultUnrepeted[i],
        count: counter
        }
      );

    }
    // console.log(resultCounted);
    return resultCounted;
  }

}
