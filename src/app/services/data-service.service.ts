import { GralNews } from "./../interfaces/interfaces";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { EventEmitter, Injectable, OnInit } from "@angular/core";
import { environment } from "src/environments/environment";
import { BehaviorSubject } from "rxjs";

const key = environment.apiKey; //accediendose al api key

const url = environment.apiUrl; //accediendo al url general  del main url, o sea la parte del url
//que no varia

const wildcard = "*";
const headers = new HttpHeaders({
  "X-Api-Key": key,
  
  // "Access-Control-Allow-Origin": wildcard,
}); //diseñandose una variable que recoja los parametros apasar en el header, en este caso el api key
//previamente registrado en los enviroments y asignado a la variable key.

// "http://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=6aed8746d74e4b6dad87dbb0dc1bb472";

@Injectable({
  providedIn: "root",
})
export class DataServiceService implements OnInit {
  // public changeCountry: EventEmitter<string> = new EventEmitter();
  // public formerCountry: EventEmitter<string> = new EventEmitter();

  // emitterValue: number;

  pageCounterScrollInfinte = 0;
  pageCounterAllNewshome = 0;
  constructor(private http: HttpClient) {}

  ngOnInit(): void {}
  private executeQuery<T>(query: string) {
    query = `${url}${query}`;

    console.log(query);

    return this.http.get<T>(query, { headers });
  }
  //estableciendose una fucnion de tipo de fucncion que gestIONARIA de manera general el llamado
  //de Url a traves del metodo get,vease que la misma devuelve un elemento generico de tipo T, estro
  //significa que culaesquirea el tipo que la misma reciba seria lo que la misma erogaria.
  //como parametro se le pasa un variablle llamada query que seria un string , para entonvces
  //igualar dicho query a la concatenacion del url genaral , mas el query en si pasado por parametro
  //echo este proceso entonces la fucnion retornaria el request http devolviendo el generico y pasandosle como
  //paametros el query ya previamente conformado , asic como los headers inicializados previamente
  //con el respectivo apiKey en su contenido

  async getAllNews(country: string) {
    this.pageCounterAllNewshome++;

    return this.executeQuery<GralNews>(
      `top-headlines?country=${country}&page=${this.pageCounterAllNewshome}`
    );
  } //esta primera funcion seria la encargada de traer todas las noticias del tab 1, vease que al traer
  //las noticias dependiendo del tipo de articulo y cantidad dicho data puede contener varios elementos
  //que necesiten ser paginandos segun la documentacion de ApiNews.or, de ahi que se hace necesario
  //iniciar un contado que se triggerizze cada vezx que esta fucnio se llame modificando el apartado
  //de page en el url para este request.
  //Dicho esto entonces se llama la funcion modeo executequery la cual retornaria un tipo generico de tipo
  //GralNews previemnete inicilaizado en las interfaces, y entonces como parametro se le pasaria
  //la parte del url que conforma est apartado segun lo requerido.o sea el parametro country, y el
  //parametro  que triggeriza la pagina cada vez que la fucnion se llame this.pageCounterAllNewshome

  getAllNewsCategory(category: string, country: string) {
    this.pageCounterScrollInfinte++;
    return this.executeQuery<GralNews>(
      `top-headlines?country=${country}&category=${category}&page=${this.pageCounterScrollInfinte}`
    );
  }
  //Al igual que en la fucnion anterior este seria el mismo proceso , aunque en este caso , se pasarian
  //dos parametros dada las especificiadades de este endpoint al cual se hace el request, en este
  //caso el country y la category, ademas de la paginancion cada vez que se haga el request de la informacion

  // changingCountry(value) {
  //   this.changeCountry.emit(value);
  // }
  // currentCountrySelected(value) {
  //   this.formerCountry.emit(value);
  // }

  counterTriggererAllNews() {
    return (this.pageCounterAllNewshome = 0);
  } //Esta fucnion es la accion venida desde el componente  page tab 1 para que cada vez que se cambie
  //el pais el contador se reinicialize a cero.Esto evitaria el error en paginancion cuando se cambie a otro
  //request

  counterTriggererCategoryNews() {
    return (this.pageCounterScrollInfinte = 0);
  } //Esta fucnion es la accion venida desde el componente  page tab 1 para que cada vez que se cambie
  //el pais el contador se reinicialize a cero.Esto evitaria el error en paginancion cuando se cambie a otro
  //request
}
