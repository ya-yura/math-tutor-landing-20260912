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

const quiz = document.querySelector('[data-quiz]');

if (quiz) {
  const steps = [...quiz.querySelectorAll('[data-quiz-step]')];
  const nextButton = quiz.querySelector('[data-quiz-next]');
  const backButton = quiz.querySelector('[data-quiz-back]');
  const submitButton = quiz.querySelector('[data-quiz-submit]');
  const stepLabel = quiz.querySelector('[data-quiz-label]');
  const progress = quiz.querySelector('[data-quiz-progress]');
  const flow = quiz.querySelector('.quiz-flow');
  const success = quiz.querySelector('[data-quiz-success]');
  const answers = {};
  let currentStep = 0;

  const renderStep = () => {
    steps.forEach((step, index) => step.classList.toggle('hidden', index !== currentStep));
    const isLastStep = currentStep === steps.length - 1;
    const activeKey = steps[currentStep].querySelector('[data-option]')?.dataset.key;
    const hasAnswer = isLastStep || Boolean(answers[activeKey]);
    stepLabel.textContent = `Шаг ${currentStep + 1} из ${steps.length}`;
    progress.style.width = `${((currentStep + 1) / steps.length) * 100}%`;
    backButton.hidden = currentStep === 0;
    nextButton.classList.toggle('hidden', isLastStep);
    submitButton.classList.toggle('hidden', !isLastStep);
    nextButton.disabled = !hasAnswer;
  };

  quiz.addEventListener('click', (event) => {
    const option = event.target.closest('[data-option]');
    if (option) {
      const key = option.dataset.key;
      answers[key] = option.dataset.value;
      quiz.querySelectorAll(`[data-option][data-key="${key}"]`).forEach((item) => item.classList.remove('is-selected'));
      option.classList.add('is-selected');
      renderStep();
      return;
    }

    if (event.target.closest('[data-quiz-next]')) {
      currentStep = Math.min(currentStep + 1, steps.length - 1);
      renderStep();
    }

    if (event.target.closest('[data-quiz-back]')) {
      currentStep = Math.max(currentStep - 1, 0);
      renderStep();
    }
  });

  quiz.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!quiz.reportValidity()) return;

    const formData = new FormData(quiz);
    const name = formData.get('name');
    const contact = formData.get('contact');
    const message = [
      'Здравствуйте! Хочу подобрать занятия по математике.',
      `Класс: ${answers.class}.`,
      `Задача: ${answers.goal}.`,
      `Имя: ${name}.`,
      `Контакт: ${contact}.`
    ].join(' ');
    const telegramUrl = `https://t.me/PythonDVP?text=${encodeURIComponent(message)}`;
    navigator.clipboard?.writeText(message).catch(() => {});
    window.open(telegramUrl, '_blank', 'noopener,noreferrer');
    flow.classList.add('hidden');
    success.classList.remove('hidden');
  });

  renderStep();
}
