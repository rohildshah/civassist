export default function({ store, route, redirect }) {
  const user = store.state.users.user
  console.log(typeof user)
  const blockedRoute = /\/admin\/*/g

  if (!user && route.path.match(blockedRoute)) {
    redirect("/")
  }
}
