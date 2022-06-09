const Notification = (props) => {
  const { message } = props

  if (!message) {
    return null
  }

  const style = {
    border: 'solid 0.3em',
    borderColor: 'red',
    padding: 5,
    marginTop: 10
  }

  return (
    <div style={style}>{message}</div>
  )
}

export default Notification