const menuButton = document.querySelector('[data-menu-button]');
const mobileMenu = document.querySelector('[data-mobile-menu]');

menuButton?.addEventListener('click', () => {
  const isOpen = mobileMenu?.classList.toggle('hidden') === false;
  menuButton.setAttribute('aria-expanded', String(isOpen));
});

mobileMenu?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    mobileMenu.classList.add('hidden');
    menuButton?.setAttribute('aria-expanded', 'false');
  });
});

const leadForm = document.querySelector('[data-lead-form]');
const formStatus = document.querySelector('[data-form-status]');

leadForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(leadForm);
  const name = formData.get('name');
  const contact = formData.get('contact');
  const goal = formData.get('goal');
  const message = `Здравствуйте! Меня зовут ${name}. Хочу обсудить занятия по математике. Контакт для связи: ${contact}. Класс и цель: ${goal}.`;
  const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(message)}`;
  window.open(telegramUrl, '_blank', 'noopener,noreferrer');
  if (formStatus) {
    formStatus.textContent = 'Открыл Telegram с готовым сообщением — осталось выбрать получателя и отправить.';
    formStatus.classList.remove('hidden');
  }
});

document.querySelectorAll('[data-scroll-to-form]').forEach((button) => {
  button.addEventListener('click', () => document.querySelector('#lead-form')?.scrollIntoView({ behavior: 'smooth' }));
});
