import { Component, HostListener, OnInit } from '@angular/core';
import { User } from '../model/User';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  userData: User;
  myStorage: Storage = window.sessionStorage;

  scrollElements!: NodeListOf<Element>;

  title: string = 'frontend';
  bg: any;
  windowWidth: any;
  windowHeight: any;

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event): void  { 
    // Efectos de imágenes al moverse por la web
    this.handleScrollAnimation();
  }
  @HostListener('mousemove', ['$event'])
  onMousemove(event: MouseEvent): void  { 
    // Movimiento de fondo de la cabecera
    const mouseX = event.clientX / this.windowWidth * 0.3;
    this.bg.style.transform = `translate3d(-${mouseX}%, 0, 0)`;
  }
  constructor() {
    this.userData = User.fromStorage(this.myStorage)!;
  }

  ngOnInit(): void {
    this.scrollElements = document.querySelectorAll(".js-scroll");

    // Fondo de la cabecera
    this.bg = document.querySelector('.background-image');
    this.windowWidth = window.innerWidth / 5;
    this.windowHeight = window.innerHeight / 5 ;
  }

  /**
   * Genera movimiento suave hacia elementos de la página
   * @param elementName id del elemento
   */
  scrollToElement(elementName: string): void {
    const element = document.querySelector('#'+elementName)
    if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  /**
   *  Trata los efectos de "entrada" de las imágenes al hacer scroll
   */
  handleScrollAnimation = () => {
    this.scrollElements.forEach((element) => {
      if (this.elementInView(element)) {
        this.displayScrollElement(element);
      } else if (!this.elementInView(element)) {
        this.hideScrollElement(element)
      }
    })
  }

  /**
   * Devuelve si el elemento está o no en la pantalla
   * @param element 
   * @returns 
   */
  elementInView = (element: Element) => {
    const elementTop = element.getBoundingClientRect().top;
    return (
      elementTop <=
      (window.innerHeight || document.documentElement.clientHeight) / 1.25
    );
  };

  /**
   * Muestra elemento
   * @param element 
   */
  displayScrollElement = (element: Element) => {
    element.classList.add("scrolled");
  };

  /**
   * Oculta elemento
   * @param element 
   */
  hideScrollElement = (element: Element) => {
    element.classList.remove("scrolled");
  };

}
