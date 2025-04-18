export function formatMessageTime(date) {
  return new Date(date).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })
}

export function checkArrays(user) {
  if (!user) return false
  return (
    (Array.isArray(user.todo) && user.todo.length > 0) ||
    (Array.isArray(user.progress) && user.progress.length > 0) ||
    (Array.isArray(user.done) && user.done.length > 0)
  )
}
