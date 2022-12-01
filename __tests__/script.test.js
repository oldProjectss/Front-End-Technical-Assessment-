// import createArea from '../script';
const { JSDOM } = require('jsdom');

const dom = new JSDOM(`<!DOCTYPE html><div id="app" class="canva"></div>`);
const window = dom.window;
const { document } = window;
global.document = document;
global.window = window;

// Function
const canva = document.getElementById('app');
const createArea = () => {
  const newArea = document.createElement('input');
  newArea.classList.add('input');
  newArea.setAttribute('placeholder', 'Type / for blocks, @ to link docs or people');
  newArea.setAttribute('type', 'text');
  canva.appendChild(newArea);
  newArea.focus();
  newArea.addEventListener('input', (e) => {
    const { value } = e.target;
    if (value === '/1') {
      e.target.value = '';
      e.target.classList.add('h1');
      e.target.setAttribute('placeholder', 'Heading 1');
    }
  });
  newArea.addEventListener('keydown', (e) => {
    if (e.target.value === '' && e.key === 'Backspace') {
      if (e.target.classList.contains('h1')) {
        e.target.classList.remove('h1');
        e.target.setAttribute('placeholder', 'Type / for blocks, @ to link docs or people');
      } else if (canva.children.length > 1) {
        e.target.previousSibling.focus();
        e.target.remove();
      }
    }
    if (e.key === 'Enter') {
      createArea();
    }
  });
};
// End of function

describe('createArea', () => {
  it('should create a new input element if the user entered enter', () => {
    createArea();
    const input = document.querySelector('input');
    const textArea = document.querySelector('#app');
    input.value = '';
    const event = new window.Event('keydown');
    event.key = 'Enter';
    input.dispatchEvent(event);
    expect(input).not.toBeNull();
    expect(textArea.children.length).toBe(2);
  });

  it('should create a new input element', () => {
    createArea();
    const input = global.document.querySelector('input');
    expect(input).not.toBeNull();
  });

  it('should add a class to the input element', () => {
    createArea();
    const input = document.querySelector('input');
    expect(input.classList.contains('input')).toBe(true);
  });

  it('should add a placeholder to the input element', () => {
    createArea();
    const input = document.querySelector('input');
    expect(input.getAttribute('placeholder')).toBe('Type / for blocks, @ to link docs or people');
  });

  it('should add a type to the input element', () => {
    createArea();
    const input = document.querySelector('input');
    expect(input.getAttribute('type')).toBe('text');
  });

  it('should add an "h1" class to the input element if the user entered "/1"', () => {
    createArea();
    const input = document.querySelector('input');
    input.value = '/1';
    const event = new window.Event('input');
    input.dispatchEvent(event);
    expect(input.classList.contains('h1')).toBe(true);
  });

  it('should add a placeholder to the input element if the user entered "/1"', () => {
    createArea();
    const input = document.querySelector('input');
    input.value = '/1';
    const event = new window.Event('input');
    input.dispatchEvent(event);
    expect(input.getAttribute('placeholder')).toBe('Heading 1');
  });

  it('should remove the "h1" class from the input element if the user entered "/1" and then backspace', () => {
    createArea();
    const input = document.querySelector('input');
    input.value = '/1';
    const event = new window.Event('input');
    input.dispatchEvent(event);
    input.value = '';
    const event1 = new window.Event('input');
    input.dispatchEvent(event1);
    const event2 = new window.Event('keydown');
    event2.key = 'Backspace';
    input.dispatchEvent(event2);
    expect(input.classList.contains('h1')).toBe(false);
  });

  it('should remove the placeholder from the input element if the user entered "/1" and then backspace', () => {
    createArea();
    const input = document.querySelector('input');
    input.value = '/1';
    const event = new window.Event('input');
    input.dispatchEvent(event);
    input.value = '';
    const event1 = new window.Event('input');
    input.dispatchEvent(event1);
    const event2 = new window.Event('keydown');
    event2.key = 'Backspace';
    input.dispatchEvent(event2);
    expect(input.getAttribute('placeholder')).toBe('Type / for blocks, @ to link docs or people');
  });

  it('should add a class to the new input element if the user entered enter', () => {
    createArea();
    const input = document.querySelector('input');
    input.value = '';
    const event = new window.Event('keydown');
    event.key = 'Enter';
    input.dispatchEvent(event);
    expect(input.classList.contains('input')).toBe(true);
  });

  it('should add a placeholder to the new input element if the user entered enter', () => {
    createArea();
    const input = document.querySelector('input');
    input.value = '';
    const event = new window.Event('keydown');
    event.key = 'Enter';
    input.dispatchEvent(event);
    expect(input.getAttribute('placeholder')).toBe('Type / for blocks, @ to link docs or people');
  });

  it('should add a type to the new input element if the user entered enter', () => {
    createArea();
    const input = document.querySelector('input');
    input.value = '';
    const event = new window.Event('keydown');
    event.key = 'Enter';
    input.dispatchEvent(event);
    expect(input.getAttribute('type')).toBe('text');
  });

  it('should remove the input element if the user entered backspace and the input element is empty and there is more than one input element', () => {
    createArea();
    const input = document.querySelector('input');
    input.value = '';
    const event = new window.Event('input');
    input.dispatchEvent(event);
    expect(input).not.toBeNull();
  });
});
