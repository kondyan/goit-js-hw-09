import { Notify } from "notiflix/build/notiflix-notify-aio";
// import "dist/notiflix-3.2.7.min.css";
const refs = {
  dataForm: document.querySelector(".form"),
};

refs.dataForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(refs.dataForm);
  const { delay, step, amount } = Object.fromEntries(data.entries());
  // delay = parseInt(delay);
  // step = parseInt(step);
  // amount = parseInt(amount);
  for (let i = 1; i <= +amount; i++) {
    createPromise(i, +delay + step * (i - 1))
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
});

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        // Fulfill
        resolve({ position, delay });
      } else {
        // Reject
        reject({ position, delay });
      }
    }, delay);
  });
}
