export const siteConfig = {
  title: 'Tatarian Kitchen',
  description: 'Tatarian Kitchen Recepts',
  titleError: 'Page not found',
  navItems: [
    { href: '/', label: 'Recepts' },
    { href: '/ingredients', label: 'Ingredients' },
    { href: '/about', label: 'About' },
  ],
  pageContent: {
    '/': {
      title: 'Recepts',
      content: 'Recepts will be here...',
    },
    '/ingredients': {
      title: 'Ingredients',
      content: 'Recepts will be here...',
    },
    '/about': {
      title: 'About',
      content: `
        <p>Tatar cuisine is a vibrant and hearty fusion of flavorful meats, aromatic pastries, and delicate dairy products, reflecting the rich history and renowned hospitality of the Tatar people.</p>
        <br>
        <h2>Signature Dishes of Tatar Cuisine</h2>
        <br>
            <ul>
              <li> <strong>Echpochmak (Эчпочмак)</strong> - Savory triangular pies filled with minced meat, potatoes, and onions. A unique feature: a small amount of broth is added into the center before baking, making them incredibly juicy. </li>
              <li> <strong>Belesh (Бэлиш)</strong> - A large, celebratory pie filled with duck, beef, or chicken, mixed with potatoes and onions. A true centerpiece for any festive table. </li>
              <li> <strong>Chak-Chak (Чак-чак)</strong> - Sweet, honeyed dessert made from deep-fried dough balls. A traditional festive treat and a symbol of joy and celebration. </li>
              <li> <strong>Kystybyi (Кыстыбый)</strong> - Soft, thin unleavened breads folded over a filling of creamy mashed potatoes or millet porridge. A simple yet comforting dish. </li>
              <li> <strong>Shulpa (Шулпа)</strong> - A rich, nourishing broth-based soup with tender meat, potatoes, and homemade noodles. The ultimate comfort food. </li>
          </ul>
`,
    },
    '/recipes/new': {
      title: 'Create New Recipe',
      content: 'Recepts will be here...',
    },
  },
};
