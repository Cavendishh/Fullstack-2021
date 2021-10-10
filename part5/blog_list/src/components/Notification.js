const Notification = ({ notification }) => {
  if (!notification) return null

  const { type, message } = notification

  return <div className={type}>{message}</div>
}

export default Notification
