const btn = document.getElementById('theme-toggle');

// Carrega o tema salvo no localStorage (lembra a preferência do usuário)
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
  document.documentElement.classList.add('light');
  btn.textContent = '☀️';
}

btn.addEventListener('click', () => {
  const isLight = document.documentElement.classList.toggle('light');

  // Troca o ícone conforme o tema
  btn.textContent = isLight ? '☀️' : '🌙';

  // Salva a preferência para a próxima visita
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
});

// Salva o perfil ativo ao clicar em um perfil
const profileLinks = document.querySelectorAll('.profiles a');
profileLinks.forEach(link => {
  link.addEventListener('click', () => {
    const profile = link.closest('.profile');
    if (!profile) return;

    const name = profile.querySelector('figcaption')?.textContent?.trim();
    const img = profile.querySelector('img');

    if (!name || !img) return;

    const originalImgSrc = img.getAttribute('src');
    let imgSrc = originalImgSrc || '';

    // Ajusta caminho para o arquivo catalogo/catalogo.html
    if (imgSrc.startsWith('/')) {
      imgSrc = '..' + imgSrc;
    } else if (imgSrc.startsWith('assets/')) {
      imgSrc = '../' + imgSrc;
    } else if (imgSrc.startsWith('./assets/')) {
      imgSrc = '../' + imgSrc.slice(2);
    }

    const activeProfile = {
      name,
      imgSrc,
      imgAlt: img.getAttribute('alt')
    };

    localStorage.setItem('activeProfile', JSON.stringify(activeProfile));
  });
});
