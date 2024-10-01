export default function (html: string) {
  return [
    html,
    '<script src="https://cdn.socket.io/4.7.5/socket.io.min.js"></script>',
    '<script>',
    `io().on('disconnect', () => location.reload();)`,
    '</script>',
  ].join('')
}
