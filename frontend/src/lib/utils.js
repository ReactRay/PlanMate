export function formatMessageTime(date) {
  return new Date(date).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })
}

export function checkArrays(user) {
  if (!user) return

  return (
    user.todo.length > 0 || user.progress.length > 0 || user.done.length > 0
  )
}
