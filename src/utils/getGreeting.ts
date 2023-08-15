export const getGreeting = (name: string): string => {
  const currentHour = new Date().getHours()

  if (currentHour >= 5 && currentHour < 12) {
    return `🌞 Good morning, ${name}! ☕️`
  } else if (currentHour >= 12 && currentHour < 18) {
    return `☀️ Good afternoon, ${name}! 🍃`
  } else {
    return `🌙 Good evening, ${name}! 🌟`
  }
}
