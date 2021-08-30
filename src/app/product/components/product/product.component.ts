// Decoradores que le dan contexto a los artefactos de Angular
import {
    Component,
    Input,
    Output,
    EventEmitter,
    SimpleChanges,
    OnInit,
    DoCheck,
    OnDestroy
} from '@angular/core';

import { Product } from '../../../core/models/product.model';

import { CartService } from './../../../core/services/cart.service';

import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html', // Que archivo html vamos a llamar oa cual va a estar enlazado
    styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, DoCheck, OnDestroy {

    /* product: Product = {
        id: '1',
        image: 'assets/images/camiseta.png',
        title: 'Camiseta',
        price: 80000,
        description: 'bla bla bla bla bla'
    }*/

    @Input() product!: Product; // va a recibir una propiedad automaticamnete desde otro componente en este caso desde app.component.html
    @Output() productClicked: EventEmitter<any> = new EventEmitter(); // Event emitter que puede producir cualquier valor (any)

    today = new Date();

    constructor(
        private cartService: CartService,
        private toastr: ToastrService
    ) {
        //console.log('1. constructor');
    }

    /* ngOnChanges(changes: SimpleChanges) {
        console.log('2. ngOnChanges')
        console.log(changes)
    }*/

    ngOnInit(): void {
        //console.log('3. ngInit');
    }

    ngDoCheck() {
        //console.log('4. ngDoCheck');
    }

    ngOnDestroy() {
        //console.log('5. ngOnDestroy');
    }

    addCart() {
        console.log('Añadir al carrito');
        this.cartService.addCart(this.product);
        // Output
        // this.productClicked.emit(this.product.id); // .emit es tipo number
        this.toastr.success('¡Agregado al carrito con exito!', 'Producto agregado', 
        {
            positionClass: 'toast-bottom-right',
            closeButton: true,
            newestOnTop: true,
        });
    }

}
