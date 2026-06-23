import './styles/topbar.css'

const Topbar = ({ user }) => {
    return (
        <header className='topbar'>
            <div />
            <div className="topbar-user">
                {user.name}
            </div>
        </header>
    )
}

export default Topbar
