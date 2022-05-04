import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaginationInstance } from 'ngx-pagination';

@Component({
  selector: 'app-pagination-ngx',
  templateUrl: './pagination-ngx.component.html',
  styleUrls: ['./pagination-ngx.component.css'],
})
export class PaginationNgxComponent implements OnInit {
  collection: any = [];
  // page: number = 1;
  currentPage: number = 1;
  perPage: number = 5;
  pageSecond: any;
  // maxSize = 2;
  loading: boolean = false;
  total: number = 50;
  // count: number = 0;
  sortItems: any[] = [
    'Primero al Ultimo',
    'Ultimo al primero',
    'Filtrar por popularidad',
    'Precio: Menor a Mayor',
    'Precio: Mayor a Menor',
  ];
  sortValues: any[] = ['first', 'latest', 'popularity', 'low', 'high'];
  sortModelValue: string = '';
  orderBy: string = '';
  minPrice: number = 0;
  maxPrice: number = 0;

  opTemp: any[] = [];

  public config: PaginationInstance = {
    id: 'advanced',
    // itemsPerPage: 4,
    // currentPage: 1
    // id: 'server',
    itemsPerPage: 3,
    currentPage: this.currentPage,
    totalItems: this.total,
  };

  constructor(private router: Router, private activedRoute: ActivatedRoute) {}

  async ngOnInit() {
    await this.getCollectionData();
    this.activedRoute.queryParams.subscribe((resp: any) => {
      this.currentPage = resp?.page || 1;
      this.orderBy = resp?.orderby || null;

      if (resp.search !== undefined) {
        // search =
        this.parseSearch(resp?.search);
        // console.log(search);
      } else if (this.orderBy !== null) {
        this.sortByItems(this.orderBy);
      }
    });
  }

  parseSearch(search: string) {
    let splitSearch = search.split(':');
    let keys: any[] = [];
    let valores: any[] = [];
    splitSearch.forEach((el, index) => {
      if (el.length == 1) {
        keys.push(el); // P, F, G
      } else {
        valores.push(el);
      }
    });
    console.log({ keys, valores });

    for (const i in keys) {
      const key = keys[i];
      switch (key) {
        case 'P':
          let value = JSON.parse(valores[i]);
          this.minPrice = value[0];
          this.maxPrice = value[1];
          this.filterPrices();
          break;

        default:
          break;
      }
    }
  }

  async getCollectionData() {
    // this.page = page;
    this.loading = true;
    await fetch(
      // `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${
      //   this.config.itemsPerPage
      // }`
      // `https://jsonplaceholder.typicode.com/posts`
      'https://fakestoreapi.com/products'
    )
      .then((response) => response.json())
      .then((json) => {
        this.collection = json;
        console.log(this.collection);
        // this.collection = this.collection.filter( e => e.price > 0)
        // this.config.currentPage = page;
        // this.collection = json;
        // this.total = 50;
        // setTimeout(() => {
        //   this.loading = false;
        // }, 1000);
      });
  }

  onPageChange(number: number) {
    console.log(number);
    this.config.currentPage = number;
  }

  onPageBoundsCorrection(number: number) {
    this.config.currentPage = number;
  }

  onTableDataChange(page: any) {
    // console.log(page);
    this.currentPage = page;

    let params: any = {};

    if (this.orderBy !== null) {
      params.orderby = this.orderBy;
    }

    params.page = this.currentPage;

    this.router.navigate(['/pagination-ngx'], { queryParams: params });
  }

  sortByItems(event: any) {
    let value: any;
    if (typeof event == 'string') {
      value = event;
    } else {
      value = event.target.value;
    }

    if (value == undefined || value == 'first') {
      this.collection = this.collection.sort((a: any, b: any) => a.id - b.id);
    }

    /*=============================================
			Ordenamos el arreglo de objetos lo mas antiguo a lo más actual
			=============================================*/
    if (value == 'latest') {
      this.collection = this.collection.sort((a: any, b: any) => b.id - a.id);
    }

    /*=============================================
			Ordenamos el arreglo de objetos lo mas visto
			=============================================*/
    if (value == 'popularity') {
      this.collection = this.collection.sort(
        (a: any, b: any) => a.rating.count - b.rating.count
      );
    }

    /*=============================================
			Ordenamos el arreglo de objetos de menor a mayor precio
			=============================================*/
    if (value == 'low') {
      this.collection = this.collection.sort(
        (a: any, b: any) => a.price - b.price
      );
    }

    /*=============================================
			Ordenamos el arreglo de objetos de mayor a menor precio
			=============================================*/
    if (value == 'high') {
      this.collection = this.collection.sort(
        (a: any, b: any) => b.price - a.price
      );
    }

    if (typeof event !== 'string') {
      this.currentPage = 1;
    }

    this.sortModelValue = value;

    // if (this.options.search !== undefined) {
    //   this.options.search =
    // }
    let options: any = {};
    options = { orderby: value, page: this.currentPage };

    this.router.navigate(['/pagination-ngx'], { queryParams: options });
  }

  filterPrices() {
    if (this.minPrice > 0 && this.maxPrice > 0) {
      let newValue = this.makeNewValue(this.minPrice, this.maxPrice);
      // let options: any = {};
      // let temps = []
      let temp = JSON.stringify(`{'P': [${newValue || ''}]}`);

      temp = temp.replace(/["]/g, '');

      temp = temp.replace(/[']/g, '"');

      if (this.opTemp.length == 0) {
        this.opTemp.push(temp);
      } else {
        this.opTemp.forEach((el: any, index: number) => {
          let [key] = Object.keys(JSON.parse(el));
          if (key.includes('P')) {
            this.opTemp.splice(index, 1, temp);
          } else {
            this.opTemp.push(temp);
          }
        });
      }

      console.log(this.opTemp);
      let options: any = {}

      for (const [keys, values] of Object.entries(this.opTemp)) {
        console.log({ keys, values });
        console.log(JSON.parse(values))
        let valores = JSON.parse( values )
        if (valores.hasOwnProperty('P')) {
          
        }
        // if (condition) {

        // }

        // for (const [ llaves, valores ] of Object.entries(values) ) {
        //   console.log({ llaves, valores });

        // }
      }
      return;
      // options.search = ;

      if (this.sortModelValue !== '') {
        options.orderby = this.sortModelValue;
      }

      // this.currentPage = 1;
      options.page = this.currentPage;

      this.collection = this.collection.filter((a: any) => {
        if (a.price >= this.minPrice && a.price <= this.maxPrice) {
          return a
        }
      });

      this.router.navigate(['/pagination-ngx'], {
        queryParams: {
          ...options
        }
      });

    }
  }

  makeNewValue(...values: any) {
    // console.log({ values });

    let textito: any = '';
    values.forEach((element: any, index: number, arr: any) => {
      textito += element + (arr.length - 1 !== index ? ',' : '');
    });

    console.log({ textito });
    return textito;
  }
}
