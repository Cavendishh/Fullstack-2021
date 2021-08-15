import './Notification.css'

const Notification = ({ notification: { message, status } }) => {
  if (message === null) return null

  return <div className={status}>{message}</div>
}

export default Notification
