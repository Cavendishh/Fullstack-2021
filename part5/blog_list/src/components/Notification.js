import PropTypes from 'prop-types'

const Notification = ({ notification }) => {
  if (!notification) return null

  const { type, message } = notification

  return <div className={type}>{message}</div>
}

Notification.propTypes = {
  notification: PropTypes.object,
}

export default Notification
