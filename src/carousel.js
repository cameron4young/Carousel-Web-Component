var container;
var prev;
var next;
class Carousel extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.innerHTML=`
        <style>
            @import url("./css/carousel-css.css")
        </style>
        <div id="outer-container">
            <button id="prev"><</button>
            <div id=image-container>
                <slot></slot>
            </div>
            <button id="next">></button>
        </div>
        `
        container = this.shadowRoot.getElementById('image-container');
        prev = this.shadowRoot.getElementById('prev');
        next = this.shadowRoot.getElementById('next');
    }
    #scroll = screen.width * 2;

	get scroll() {
        return this.#scroll;
    }
	set scroll(v) {
         this.#scroll = v; this.setAttribute("scroll", v);
    }

	static get observedAttributes() { return ["scroll"] }

	attributeChangedCallback(name, oldValue, newValue) {
		if (name === "scroll") this.#scroll = newValue;
	}
    connectedCallback(){
        next.addEventListener("click", evt=>{
            container.scrollLeft += this.#scroll;
        })

        prev.addEventListener("click", evt=>{
            container.scrollLeft -= this.#scroll;
        })
    }
  }
  
customElements.define('custom-carousel', Carousel);

