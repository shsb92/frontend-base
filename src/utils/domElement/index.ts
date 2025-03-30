export class DOMElement {
    static readonly events = [
      'abort', 'animationend', 'animationiteration', 'animationstart', 'blur',
      'canplay', 'canplaythrough', 'change', 'click', 'contextmenu', 'copy',
      'cut', 'dblclick', 'drag', 'dragend', 'dragenter', 'dragleave',
      'dragover', 'dragstart', 'drop', 'durationchange', 'emptied', 'ended',
      'error', 'focus', 'focusin', 'focusout', 'fullscreenchange', 'input',
      'invalid', 'keydown', 'keypress', 'keyup', 'load', 'loadeddata',
      'loadedmetadata', 'loadstart', 'mousedown', 'mouseenter', 'mouseleave',
      'mousemove', 'mouseover', 'mouseout', 'mouseup', 'offline', 'online',
      'open', 'paste', 'pause', 'play', 'playing', 'progress', 'ratechange',
      'reset', 'resize', 'scroll', 'search', 'seeked', 'seeking', 'select',
      'show', 'stalled', 'submit', 'suspend', 'timeupdate', 'toggle',
      'touchcancel', 'touchend', 'touchmove', 'touchstart', 'transitionend',
      'unload', 'volumechange', 'waiting', 'wheel'
    ] as const;

    static readonly attributes = [
      'id', 'class', 'title', 'lang', 'dir', 'hidden', 'tabindex',
      'accesskey', 'contenteditable', 'draggable', 'spellcheck', 'translate',
      'name', 'value', 'type', 'placeholder', 'required', 'disabled', 'readonly',
      'maxlength', 'minlength', 'pattern', 'autocomplete', 'autofocus', 'form',
      'multiple', 'size', 'step', 'min', 'max', 'src', 'alt', 'width', 'height',
      'poster', 'controls', 'autoplay', 'loop', 'muted', 'preload', 'playsinline',
      'href', 'target', 'rel', 'download', 'hreflang', 'media', 'colspan',
      'rowspan', 'headers', 'scope', 'abbr', 'start', 'reversed', 'charset',
      'content', 'http-equiv', 'async', 'defer', 'crossorigin', 'scoped',
      'srcdoc', 'sandbox', 'frameborder', 'scrolling'
    ] as const;

    private dom: HTMLElement;

    constructor(dom: HTMLElement) {
      this.dom = dom;
    }
  
    add(...elements: DOMElement[]) {
      for (const element of elements) {
        if (element instanceof DOMElement) {
          this.dom.appendChild(element.dom);
        } else {
          console.error('DOMElement:', element, 'is not an instance of DOMElement.');
        }
      }
      return this;
    }
  
    remove(...elements: DOMElement[]) {
      for (const element of elements) {
        if (element instanceof DOMElement) {
          const child = this.dom.children[this.getIndexOfChild(element)];
          if (child) {
            this.dom.removeChild(child);
          }
        } else {
          console.error('DOMElement:', element, 'is not an instance of DOMElement.');
        }
      }
      return this;
    }
  
    clear() {
      while (this.dom.children.length) {
        const lastChild = this.dom.lastChild;
        if (lastChild) {
          this.dom.removeChild(lastChild);
        }
      }
    }
  
    setId(id: string) {
      this.dom.id = id;
      return this;
    }
  
    getId() {
      return this.dom.id;
    }
  
    addClass(name: string) {
      this.dom.classList.add(name);
      return this;
    }
  
    removeClass(name: string) {
      this.dom.classList.remove(name);
      return this;
    }
  
    setStyle(style: string, value: string) {
      this.dom.style[style as any] = value;
      return this;
    }
  
    setTextContent(value: string) {
      this.dom.textContent = value;
      return this;
    }
  
    setInnerHTML(value: string) {
      this.dom.innerHTML = value;
      return this;
    }
  
    reset() {
      if (this.dom instanceof HTMLFormElement) {
        this.dom.reset();
      }
      return this;
    }
  
    getIndexOfChild(element: DOMElement) {
      return Array.prototype.indexOf.call(this.dom.children, element.dom);
    }
  }
  
// Add event handler methods to the prototype
DOMElement.events.forEach(event => {
  const methodName = 'on' + event.charAt(0).toUpperCase() + event.slice(1);
  
  (DOMElement.prototype as any)[methodName] = function(callback: (event: any) => void) {
    this.dom.addEventListener(event, callback.bind(this));
    return this;
  };
});

// Add attribute methods to the prototype
DOMElement.attributes.forEach(attr => {
  const methodName = 'set' + attr.charAt(0).toUpperCase() + attr.slice(1);
  const getMethodName = 'get' + attr.charAt(0).toUpperCase() + attr.slice(1);
  
  // Setter method
  (DOMElement.prototype as any)[methodName] = function(value: string | boolean | number) {
    this.dom.setAttribute(attr, String(value));
    return this;
  };

  // Getter method
  (DOMElement.prototype as any)[getMethodName] = function() {
    return this.dom.getAttribute(attr);
  };
});

// Add TypeScript type definitions
declare module './index' {
  interface DOMElement {
    onAbort(callback: (event: Event) => void): this;
    onAnimationEnd(callback: (event: AnimationEvent) => void): this;
    onAnimationIteration(callback: (event: AnimationEvent) => void): this;
    onAnimationStart(callback: (event: AnimationEvent) => void): this;
    onBlur(callback: (event: FocusEvent) => void): this;
    onCanPlay(callback: (event: Event) => void): this;
    onCanPlayThrough(callback: (event: Event) => void): this;
    onChange(callback: (event: Event) => void): this;
    onClick(callback: (event: MouseEvent) => void): this;
    onContextMenu(callback: (event: MouseEvent) => void): this;
    onCopy(callback: (event: ClipboardEvent) => void): this;
    onCut(callback: (event: ClipboardEvent) => void): this;
    onDblClick(callback: (event: MouseEvent) => void): this;
    onDrag(callback: (event: DragEvent) => void): this;
    onDragEnd(callback: (event: DragEvent) => void): this;
    onDragEnter(callback: (event: DragEvent) => void): this;
    onDragLeave(callback: (event: DragEvent) => void): this;
    onDragOver(callback: (event: DragEvent) => void): this;
    onDragStart(callback: (event: DragEvent) => void): this;
    onDrop(callback: (event: DragEvent) => void): this;
    onDurationChange(callback: (event: Event) => void): this;
    onEmptied(callback: (event: Event) => void): this;
    onEnded(callback: (event: Event) => void): this;
    onError(callback: (event: Event) => void): this;
    onFocus(callback: (event: FocusEvent) => void): this;
    onFocusIn(callback: (event: FocusEvent) => void): this;
    onFocusOut(callback: (event: FocusEvent) => void): this;
    onFullscreenChange(callback: (event: Event) => void): this;
    onInput(callback: (event: Event) => void): this;
    onInvalid(callback: (event: Event) => void): this;
    onKeyDown(callback: (event: KeyboardEvent) => void): this;
    onKeyPress(callback: (event: KeyboardEvent) => void): this;
    onKeyUp(callback: (event: KeyboardEvent) => void): this;
    onLoad(callback: (event: Event) => void): this;
    onLoadedData(callback: (event: Event) => void): this;
    onLoadedMetadata(callback: (event: Event) => void): this;
    onLoadStart(callback: (event: Event) => void): this;
    onMouseDown(callback: (event: MouseEvent) => void): this;
    onMouseEnter(callback: (event: MouseEvent) => void): this;
    onMouseLeave(callback: (event: MouseEvent) => void): this;
    onMouseMove(callback: (event: MouseEvent) => void): this;
    onMouseOver(callback: (event: MouseEvent) => void): this;
    onMouseOut(callback: (event: MouseEvent) => void): this;
    onMouseUp(callback: (event: MouseEvent) => void): this;
    onOffline(callback: (event: Event) => void): this;
    onOnline(callback: (event: Event) => void): this;
    onOpen(callback: (event: Event) => void): this;
    onPaste(callback: (event: ClipboardEvent) => void): this;
    onPause(callback: (event: Event) => void): this;
    onPlay(callback: (event: Event) => void): this;
    onPlaying(callback: (event: Event) => void): this;
    onProgress(callback: (event: ProgressEvent) => void): this;
    onRateChange(callback: (event: Event) => void): this;
    onReset(callback: (event: Event) => void): this;
    onResize(callback: (event: UIEvent) => void): this;
    onScroll(callback: (event: Event) => void): this;
    onSearch(callback: (event: Event) => void): this;
    onSeeked(callback: (event: Event) => void): this;
    onSeeking(callback: (event: Event) => void): this;
    onSelect(callback: (event: Event) => void): this;
    onShow(callback: (event: Event) => void): this;
    onStalled(callback: (event: Event) => void): this;
    onSubmit(callback: (event: Event) => void): this;
    onSuspend(callback: (event: Event) => void): this;
    onTimeUpdate(callback: (event: Event) => void): this;
    onToggle(callback: (event: Event) => void): this;
    onTouchCancel(callback: (event: TouchEvent) => void): this;
    onTouchEnd(callback: (event: TouchEvent) => void): this;
    onTouchMove(callback: (event: TouchEvent) => void): this;
    onTouchStart(callback: (event: TouchEvent) => void): this;
    onTransitionEnd(callback: (event: TransitionEvent) => void): this;
    onUnload(callback: (event: Event) => void): this;
    onVolumeChange(callback: (event: Event) => void): this;
    onWaiting(callback: (event: Event) => void): this;
    onWheel(callback: (event: WheelEvent) => void): this;

    // Attribute setters
    setId(value: string): this;
    setClass(value: string): this;
    setTitle(value: string): this;
    setLang(value: string): this;
    setDir(value: string): this;
    setHidden(value: boolean): this;
    setTabindex(value: number): this;
    setAccesskey(value: string): this;
    setContenteditable(value: boolean): this;
    setDraggable(value: boolean): this;
    setSpellcheck(value: boolean): this;
    setTranslate(value: boolean): this;
    setName(value: string): this;
    setValue(value: string): this;
    setType(value: string): this;
    setPlaceholder(value: string): this;
    setRequired(value: boolean): this;
    setDisabled(value: boolean): this;
    setReadonly(value: boolean): this;
    setMaxlength(value: number): this;
    setMinlength(value: number): this;
    setPattern(value: string): this;
    setAutocomplete(value: string): this;
    setAutofocus(value: boolean): this;
    setForm(value: string): this;
    setMultiple(value: boolean): this;
    setSize(value: number): this;
    setStep(value: number): this;
    setMin(value: number): this;
    setMax(value: number): this;
    setSrc(value: string): this;
    setAlt(value: string): this;
    setWidth(value: number): this;
    setHeight(value: number): this;
    setPoster(value: string): this;
    setControls(value: boolean): this;
    setAutoplay(value: boolean): this;
    setLoop(value: boolean): this;
    setMuted(value: boolean): this;
    setPreload(value: string): this;
    setPlaysinline(value: boolean): this;
    setHref(value: string): this;
    setTarget(value: string): this;
    setRel(value: string): this;
    setDownload(value: string): this;
    setHreflang(value: string): this;
    setMedia(value: string): this;
    setColspan(value: number): this;
    setRowspan(value: number): this;
    setHeaders(value: string): this;
    setScope(value: string): this;
    setAbbr(value: string): this;
    setStart(value: number): this;
    setReversed(value: boolean): this;
    setCharset(value: string): this;
    setContent(value: string): this;
    setHttpEquiv(value: string): this;
    setAsync(value: boolean): this;
    setDefer(value: boolean): this;
    setCrossorigin(value: string): this;
    setScoped(value: boolean): this;
    setSrcdoc(value: string): this;
    setSandbox(value: string): this;
    setFrameborder(value: number): this;
    setScrolling(value: string): this;

    // Attribute getters
    getId(): string | null;
    getClass(): string | null;
    getStyle(): string | null;
    getTitle(): string | null;
    getLang(): string | null;
    getDir(): string | null;
    getHidden(): string | null;
    getTabindex(): string | null;
    getAccesskey(): string | null;
    getContenteditable(): string | null;
    getDraggable(): string | null;
    getSpellcheck(): string | null;
    getTranslate(): string | null;
    getName(): string | null;
    getValue(): string | null;
    getType(): string | null;
    getPlaceholder(): string | null;
    getRequired(): string | null;
    getDisabled(): string | null;
    getReadonly(): string | null;
    getMaxlength(): string | null;
    getMinlength(): string | null;
    getPattern(): string | null;
    getAutocomplete(): string | null;
    getAutofocus(): string | null;
    getForm(): string | null;
    getMultiple(): string | null;
    getSize(): string | null;
    getStep(): string | null;
    getMin(): string | null;
    getMax(): string | null;
    getSrc(): string | null;
    getAlt(): string | null;
    getWidth(): string | null;
    getHeight(): string | null;
    getPoster(): string | null;
    getControls(): string | null;
    getAutoplay(): string | null;
    getLoop(): string | null;
    getMuted(): string | null;
    getPreload(): string | null;
    getPlaysinline(): string | null;
    getHref(): string | null;
    getTarget(): string | null;
    getRel(): string | null;
    getDownload(): string | null;
    getHreflang(): string | null;
    getMedia(): string | null;
    getColspan(): string | null;
    getRowspan(): string | null;
    getHeaders(): string | null;
    getScope(): string | null;
    getAbbr(): string | null;
    getStart(): string | null;
    getReversed(): string | null;
    getCharset(): string | null;
    getContent(): string | null;
    getHttpEquiv(): string | null;
    getAsync(): string | null;
    getDefer(): string | null;
    getCrossorigin(): string | null;
    getScoped(): string | null;
    getSrcdoc(): string | null;
    getSandbox(): string | null;
    getFrameborder(): string | null;
    getScrolling(): string | null;
  }
}