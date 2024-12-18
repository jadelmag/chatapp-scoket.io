export const animationToBottom = (element: HTMLDivElement) => {
  const targetScrollTop = element.scrollHeight;
  const startScrollTop = element.scrollTop;
  const distance = targetScrollTop - startScrollTop;
  const duration = 300;
  let startTime: number;

  const animateScroll = (timestamp: number) => {
    if (!startTime) startTime = timestamp;
    const timeElapsed = timestamp - startTime;
    const progress = Math.min(timeElapsed / duration, 1);

    element.scrollTop = startScrollTop + distance * progress;

    if (timeElapsed < duration) {
      requestAnimationFrame(animateScroll);
    } else {
      element.scrollTop = targetScrollTop;
    }
  };

  requestAnimationFrame(animateScroll);
};
