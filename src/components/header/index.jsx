import useUiStore from '../../zustand-store/uiStore'

function Header() {
  const toggleSidebar = useUiStore((state) => state.toggleSidebar)

  return (
    <button type="button" onClick={toggleSidebar}>
      ☰
    </button>
  )
}

export default Header
