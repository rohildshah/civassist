export default function({ store, route, redirect }) {
  const user = store.state.users.user
  const blockedRoute = /\/admin\/*/g

  console.log(user)

  if ((!user.email || !user.uid) && route.path.match(blockedRoute)) {
    redirect("/")
  }
}
