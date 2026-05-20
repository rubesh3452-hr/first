

```javascript
const cartButtons = document.querySelectorAll('.add-cart');

cartButtons.forEach((button) => {
  button.addEventListener('click', () => {
    button.innerText = 'Added ✓';

    setTimeout(() => {
      button.innerText = 'Add to Cart';
    }, 2000);
  });
});

const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
  sections.forEach((section) => {
    const sectionTop = section.getBoundingClientRect().top;

    if (sectionTop < window.innerHeight - 100) {
      section.classList.add('show');
    }
  });
});
```
