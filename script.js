// Select the container of the input elements
const canva = document.getElementById('app');

// This function creates the input elements
const createArea = () => {
  // Create the input element
  const newArea = document.createElement('input');
  // Add a class to the input to style it and make it easier to select
  newArea.classList.add('input');
  // Add the type of input (text) and the placeholder
  newArea.setAttribute('placeholder', 'Type / for blocks, @ to link docs or people');
  newArea.setAttribute('type', 'text');
  // Append the input to the container
  canva.appendChild(newArea);
  // Make sure the next input is in focus and ready to be typed in
  newArea.focus();

  // Add an event listener to the input for listening for the '/h1/ command
  // to make sure the text is converted to an h1 style
  newArea.addEventListener('input', (e) => {
    const { value } = e.target;
    if (value === '/1') {
      e.target.value = '';
      e.target.classList.add('h1');
      e.target.setAttribute('placeholder', 'Heading 1');
    }
  });

  // Add an event listner to the input for listening to the 'Enter' key to create a new input
  // or the 'Backspace' key to delete the current input
  newArea.addEventListener('keydown', (e) => {
    // If there is no text in the input and the user presses the 'Backspace' key, delete the input
    if (e.target.value === ''
       && e.key === 'Backspace') {
      //  Make sure to delet the 'h1' class when the 'Backspace' key is pressed
      //  if no text is present
      // and remove the input if the area if it's empty and styling is removed
      if (e.target.classList.contains('h1')) {
        e.target.classList.remove('h1');
        e.target.setAttribute('placeholder', 'Type / for blocks, @ to link docs or people');
      } else if (canva.children.length > 1) {
        e.target.previousSibling.focus();
        e.target.remove();
      }
    }
    // If the user presses the 'Enter' key, create a new input
    if (e.key === 'Enter') {
      createArea();
    }
  });
};

// Runing the function to create the first time so the first input area is created
createArea();
