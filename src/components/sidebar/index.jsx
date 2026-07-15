import useUiStore from '../../zustand-store/uiStore'

function Sidebar() {
  const sidebarOpen = useUiStore((state) => state.sidebarOpen)

  return (
    <>
      Sidebar
      <div>State: {sidebarOpen ? 'Open' : 'Closed'}</div>
    </>
  )
}

export default Sidebar
